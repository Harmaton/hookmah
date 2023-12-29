import { SignIn } from "@clerk/nextjs";
import React from "react";
 
export default function Page() {
  return <div className="flex h-screen items-center justify-center">
  <SignIn appearance={{variables: {colorPrimary: "#800080"}}} />
  </div>
  
}