import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const checkAdmin = async () => {
    const { userId } = await auth();
    // If no user ID, return false
    if (!userId) {
      return false;
    }
    // Retrieve user data including admin status
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        isadmin: true,
      },
    });
  
    // If user is an isadmin, return true
    return user?.isadmin === true;
  };