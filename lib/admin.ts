
// 🛡️ Check if the user is an admin
export const isAdmin = (userId?: string | null) => {
    return userId === process.env.NEXT_PUBLIC_ADMIN_ID;
  };

