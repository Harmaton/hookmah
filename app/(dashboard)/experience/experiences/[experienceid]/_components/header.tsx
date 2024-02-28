import React from "react";
import { BackActions } from "@/app/(dashboard)/annual/gaps/[gapid]/_components/generate-back-action";
import { CheckCircle } from "lucide-react";
import { WordBackActions } from "@/app/(dashboard)/annual/gaps/[gapid]/_components/word-back-actions";

type HeaderProps = {
  id: string;
  first: string;
  second: string;
  page: string;
  pagetwo: string | null;
};

export default function HeaderInPage({ id, page, first, second,  pagetwo }: HeaderProps) {
  return (
    <div className="flex justify-between items-center p-2 mb-4">
      <div className="flex items-center justify-end">
        
       { !pagetwo && <BackActions disabled={false} id={id} first={first} second={second} />}

       {pagetwo && <WordBackActions disabled={false} id={id} first={first} second={second} />}

      </div>
      <div className="flex items-center">
        <CheckCircle className="h-4 w-4 text-red-500 mr-2" />
        <h1 className="text-2xl text-red-500"> Paso {page}/3</h1>
      </div>
    </div>
  );
}
