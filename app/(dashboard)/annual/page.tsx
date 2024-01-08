
import Link from "next/link"
import { DataTable } from "./_components/data-table"
import { columns } from "./_components/columns"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"


const GapPage = async () => {

    const { userId } = auth();

    if (!userId) {
      return redirect("/");
    }
  
    const gaps = await db.gAP.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return(
        <div className="p-6 justify-center">
         <Link href='/annual/create'>
         <h1 className="text-center justify-center font-italic underline ">
         Your General Annual Programmings (2024)
         </h1>
         </Link>
         <DataTable columns={columns} data={gaps} />
        </div>
    )
}

export default GapPage