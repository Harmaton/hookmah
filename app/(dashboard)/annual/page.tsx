
import Link from "next/link"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"

const GapPage = async () => {

    const { userId } = auth();

    if (!userId) {
      return redirect("/");
    }

    const currentTime = new Date().toLocaleString(); 
  
    const gap = await db.gAP.findUnique({
      where: {
        userid: userId,
      },
    });

    if(gap !== null)
    {
    return(
        <div className="p-6 justify-center">
         <h1 className="text-3xl m-2 p-4 fomt-bold ">Su plan de estudios de programación anual de 2024</h1>
         <Card className="border-red-500 hover:bg-red-50 shadow">
          <CardHeader className="font-bold capitalize text-3xl ">
            {gap.title}
          </CardHeader>
          <CardContent className="flex flex-col">
            <p className="p-2">  {gap.year} </p>
            <p className="p-2 text-gray-300">{gap.createdAt.toDateString()}</p>
          </CardContent>
         
           
         
          <CardFooter className="flex flex-col items-end justify-center">
            <Link href={`/annual/gaps/${gap.id}`}>
            <Button>
              Editar
            </Button>
            </Link>  
          </CardFooter>
         </Card>
        </div>
    )}

    return(
      <div className="p-6 justify-center">
         <h1 className="text-3xl m-2 p-4 fomt-bold">Empezar</h1>
        <Link href='/annual/create'>
         <Card className="rounded-ml ">
          <CardHeader className="font-bold ">
          Crea tu programación anual ahora
          </CardHeader>
          <CardContent className="font-bold">
          ¡Empiece hoy!
          </CardContent>
          <CardFooter>
           {currentTime}
          </CardFooter>
         </Card>
         </Link>
      </div>
    )

}

export default GapPage