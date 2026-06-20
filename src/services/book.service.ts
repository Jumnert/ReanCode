// Book Service
import { prisma } from "@/config/prisma";
import { redis, CacheKeys, CacheTTL } from "@/config/redis";
import { uploadBook, uploadBookCover } from "@/config/cloudinary";
import { Prisma } from "@prisma/client";

export class BookService {
  // Get all books
  static async getAll(category?: string) {
    const cacheKey = CacheKeys.bookList(category);
    const cached = await redis.get(cacheKey);
    if (cached) return cached as any; // Type assertion since redis returns any or string/object

    const books = await prisma.book.findMany({
      where: {
        published: true,
        ...(category && { category }),
      },
      orderBy: { title: "asc" },
      include: {
        _count: {
          select: { downloads: true },
        },
      },
    });

    await redis.setex(cacheKey, CacheTTL.LONG, JSON.stringify(books));
    return books;
  }

  // Get single book
  static async getBySlug(slug: string) {
    const cacheKey = CacheKeys.book(slug);
    const cached = await redis.get(cacheKey);
    if (cached) return cached as any;

    const book = await prisma.book.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { downloads: true },
        },
      },
    });

    if (book) {
      await redis.setex(cacheKey, CacheTTL.LONG, JSON.stringify(book));
    }
    return book;
  }

  // Create book (admin)
  static async create(data: {
    title: string;
    slug: string;
    category: string;
    description: string;
    pages: number;
    pdfFile: Buffer | string;
    coverFile?: Buffer | string;
  }) {
    // Upload PDF to Cloudinary
    const pdfUpload = await uploadBook(data.pdfFile, data.slug);

    // Upload cover if provided
    let coverUrl;
    if (data.coverFile) {
      const coverUpload = await uploadBookCover(data.coverFile, data.slug);
      coverUrl = coverUpload.secure_url;
    }

    return prisma.book.create({
      data: {
        title: data.title,
        slug: data.slug,
        category: data.category,
        description: data.description,
        pdfUrl: pdfUpload.secure_url,
        coverUrl,
        fileSize: pdfUpload.bytes,
        pages: data.pages,
      },
    });
  }

  // Track download
  static async trackDownload(userId: string, bookId: string) {
    // Check if already downloaded
    const existing = await prisma.bookDownload.findUnique({
      where: {
        userId_bookId: { userId, bookId },
      },
    });

    if (existing) {
      return { alreadyDownloaded: true };
    }

    // Create download record
    await prisma.bookDownload.create({
      data: { userId, bookId },
    });

    // Increment download counter in Redis
    const downloadKey = CacheKeys.bookDownloads(bookId);
    await redis.incr(downloadKey);

    return { alreadyDownloaded: false };
  }

  // Get user's downloaded books
  static async getUserDownloads(userId: string) {
    return prisma.bookDownload.findMany({
      where: { userId },
      include: {
        book: true,
      },
      orderBy: { downloadedAt: "desc" },
    });
  }

  // Get book categories
  static async getCategories() {
    const cacheKey = CacheKeys.bookCategories();
    const cached = await redis.get(cacheKey);
    if (cached) return cached as any;

    const categories = await prisma.book.groupBy({
      by: ["category"],
      where: { published: true },
      _count: true,
    });

    await redis.setex(cacheKey, CacheTTL.LONG, JSON.stringify(categories));
    return categories;
  }

  // Search books
  static async search(query: string) {
    const cacheKey = CacheKeys.bookSearch(query);
    const cached = await redis.get(cacheKey);
    if (cached) return cached as any;

    const books = await prisma.book.findMany({
      where: {
        published: true,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 20,
    });

    await redis.setex(cacheKey, CacheTTL.SHORT, JSON.stringify(books));
    return books;
  }
}

export default BookService;
