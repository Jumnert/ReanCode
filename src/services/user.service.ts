import { prisma } from "@/config/prisma";
import { uploadAvatar, uploadBanner } from "@/config/cloudinary";

export interface UpdateUserProfileData {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
}

export interface UpdateUserPreferencesData {
  theme?: string;
  language?: string;
  notifications?: boolean;
  emailNotifications?: boolean;
}

export class UserService {
  /**
   * Get user by ID
   */
  static async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(
    userId: string,
    data: UpdateUserProfileData,
    avatarFile?: File | string,
    bannerFile?: File | string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updateData: UpdateUserProfileData = { ...data };

    // Upload avatar if provided
    if (avatarFile) {
      const avatarResponse = await uploadAvatar(avatarFile as any, userId);
      updateData.avatarUrl = avatarResponse.secure_url;
    }

    // Upload banner if provided
    if (bannerFile) {
      const bannerResponse = await uploadBanner(bannerFile as any, userId);
      updateData.bannerUrl = bannerResponse.secure_url;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        preferences: true,
      },
    });

    return updatedUser;
  }

  /**
   * Get user preferences
   */
  static async getUserPreferences(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.preferences) {
      // Create default preferences if they don't exist
      const preferences = await prisma.userPreference.create({
        data: {
          userId,
          theme: "system",
          emailNotifications: true,
        },
      });
      return preferences;
    }

    return user.preferences;
  }

  /**
   * Update user preferences
   */
  static async updateUserPreferences(
    userId: string,
    data: UpdateUserPreferencesData
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if preferences exist
    const existingPreferences = await prisma.userPreference.findUnique({
      where: { userId },
    });

    let preferences;
    if (existingPreferences) {
      // Update existing preferences
      preferences = await prisma.userPreference.update({
        where: { userId },
        data,
      });
    } else {
      // Create new preferences
      preferences = await prisma.userPreference.create({
        data: {
          userId,
          theme: data.theme || "system",
          emailNotifications: data.emailNotifications ?? true,
        },
      });
    }

    return preferences;
  }

  /**
   * Delete user
   */
  static async deleteUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete user (cascading deletes should handle related records)
    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true, message: "User deleted successfully" };
  }

  /**
   * Check if user is admin
   */
  static async isAdmin(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.role === "ADMIN";
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        preferences: true,
      },
    });

    return user;
  }

  /**
   * Get multiple users by IDs
   */
  static async getUsersByIds(userIds: string[]) {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });

    return users;
  }

  /**
   * Search users by name or email
   */
  static async searchUsers(query: string, limit: number = 10) {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        bio: true,
      },
    });

    return users;
  }
}
