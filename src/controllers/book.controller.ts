// Book Controller
import { BookService } from "@/services/book.service";

/**
 * Controller response type
 */
type ControllerResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Book Controller
 * Handles book-related operations
 */
export class BookController {
  /**
   * Get all books (optionally filtered by category)
   */
  static async getAllBooks(category?: string): Promise<ControllerResponse> {
    try {
      const books = await BookService.getAll(category);
      return {
        success: true,
        data: books,
      };
    } catch (error) {
      console.error("Error in getAllBooks:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch books",
      };
    }
  }

  /**
   * Get a single book by slug
   */
  static async getBookBySlug(slug: string): Promise<ControllerResponse> {
    try {
      const book = await BookService.getBySlug(slug);

      if (!book) {
        return {
          success: false,
          error: "Book not found",
        };
      }

      return {
        success: true,
        data: book,
      };
    } catch (error) {
      console.error("Error in getBookBySlug:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch book",
      };
    }
  }

  /**
   * Track book download for a user
   */
  static async downloadBook(
    userId: string,
    bookId: string
  ): Promise<ControllerResponse> {
    try {
      if (!userId || !bookId) {
        return {
          success: false,
          error: "userId and bookId are required",
        };
      }

      // Track the download
      const downloadResult = await BookService.trackDownload(userId, bookId);

      // Get the book details to return the PDF URL
      const book = await BookService.getBySlug(bookId);

      if (!book) {
        return {
          success: false,
          error: "Book not found",
        };
      }

      return {
        success: true,
        data: {
          pdfUrl: book.pdfUrl,
          alreadyDownloaded: downloadResult.alreadyDownloaded,
          book: {
            id: book.id,
            title: book.title,
            slug: book.slug,
            category: book.category,
          },
        },
      };
    } catch (error) {
      console.error("Error in downloadBook:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to download book",
      };
    }
  }

  /**
   * Get user's downloaded books
   */
  static async getUserDownloads(
    userId: string
  ): Promise<ControllerResponse> {
    try {
      if (!userId) {
        return {
          success: false,
          error: "userId is required",
        };
      }

      const downloads = await BookService.getUserDownloads(userId);

      return {
        success: true,
        data: downloads,
      };
    } catch (error) {
      console.error("Error in getUserDownloads:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch user downloads",
      };
    }
  }

  /**
   * Get all book categories
   */
  static async getCategories(): Promise<ControllerResponse> {
    try {
      const categories = await BookService.getCategories();
      return {
        success: true,
        data: categories,
      };
    } catch (error) {
      console.error("Error in getCategories:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch categories",
      };
    }
  }

  /**
   * Search books by query
   */
  static async searchBooks(query: string): Promise<ControllerResponse> {
    try {
      if (!query || query.trim().length === 0) {
        return {
          success: false,
          error: "Search query is required",
        };
      }

      const books = await BookService.search(query);

      return {
        success: true,
        data: books,
      };
    } catch (error) {
      console.error("Error in searchBooks:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to search books",
      };
    }
  }
}

export default BookController;
