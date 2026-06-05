// API Response Helpers
import { NextResponse } from "next/server";

export class ApiResponse {
  /**
   * Success response
   */
  static success<T>(data: T, status = 200) {
    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status }
    );
  }

  /**
   * Error response
   */
  static error(message: string, status = 500, details?: any) {
    return NextResponse.json(
      {
        success: false,
        error: message,
        ...(details && { details }),
      },
      { status }
    );
  }

  /**
   * Validation error (400)
   */
  static validationError(message: string, errors?: any) {
    return this.error(message, 400, errors);
  }

  /**
   * Unauthorized (401)
   */
  static unauthorized(message = "Unauthorized") {
    return this.error(message, 401);
  }

  /**
   * Forbidden (403)
   */
  static forbidden(message = "Forbidden") {
    return this.error(message, 403);
  }

  /**
   * Not found (404)
   */
  static notFound(message = "Resource not found") {
    return this.error(message, 404);
  }

  /**
   * Internal server error (500)
   */
  static serverError(message = "Internal server error") {
    return this.error(message, 500);
  }

  /**
   * Created (201)
   */
  static created<T>(data: T) {
    return this.success(data, 201);
  }

  /**
   * No content (204)
   */
  static noContent() {
    return new NextResponse(null, { status: 204 });
  }
}

export default ApiResponse;
