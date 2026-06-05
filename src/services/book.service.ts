// Book Service
import { prisma } from "@/config/prisma";
import { redis, CacheKeys } from "@/config/redis";
import { uploadBook, uploadBookCover } from "@/config/cloudinary";
import { Prisma } from "@prisma/client";

export class BookService {
  // Get all books
  static async getAll(category?: string) {
    return prisma.book.findMany({
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
  }

  // Get single book
  static async getBySlug(slug: string) {
    return prisma.book.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { downloads: true },
        },
      },
    });
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
    return prisma.book.groupBy({
      by: ["category"],
      where: { published: true },
      _count: true,
    });
  }

  // Search books
  static async search(query: string) {
    return prisma.book.findMany({
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
  }
}

export default BookService;
