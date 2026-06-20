"use server";

import { signOut } from "@/config/auth";
import { revalidatePath } from "next/cache";

export const logoutAction = async () => {
  revalidatePath("/", "layout");
  await signOut({ redirectTo: "/" });
};
