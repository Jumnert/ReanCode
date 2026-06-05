// Cloudinary Configuration
import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Upload helpers
export const CloudinaryFolders = {
  AVATARS: "avatars",
  BANNERS: "banners",
  BOOKS: "books",
  BOOK_COVERS: "books/covers",
  SNIPPETS: "snippets",
};

export const uploadAvatar = async (file: Buffer | string, userId: string) => {
  return cloudinary.uploader.upload(file as string, {
    folder: CloudinaryFolders.AVATARS,
    public_id: userId,
    transformation: [
      { width: 400, height: 400, crop: "fill", gravity: "face" },
    ],
    overwrite: true,
  });
};

export const uploadBanner = async (file: Buffer | string, userId: string) => {
  return cloudinary.uploader.upload(file as string, {
    folder: CloudinaryFolders.BANNERS,
    public_id: userId,
    transformation: [
      { width: 1200, height: 300, crop: "fill" },
    ],
    overwrite: true,
  });
};

export const uploadBookCover = async (file: Buffer | string, bookSlug: string) => {
  return cloudinary.uploader.upload(file as string, {
    folder: CloudinaryFolders.BOOK_COVERS,
    public_id: bookSlug,
    transformation: [
      { width: 400, height: 600, crop: "fill" },
    ],
  });
};

export const uploadBook = async (file: Buffer | string, bookSlug: string) => {
  return cloudinary.uploader.upload(file as string, {
    folder: CloudinaryFolders.BOOKS,
    public_id: bookSlug,
    resource_type: "raw", // For PDFs
  });
};

export const deleteAsset = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};
