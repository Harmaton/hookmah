import Link from "next/link"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const GapPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const currentTime = new Date().toLocaleString('es-ES'); 

    const gaps = await db.gAP.findMany({
        where: {
            userid: userId,
        },
    });


    if (gaps.length > 0) {
        const gap = gaps[0];

        return (
            <div className="p-6 justify-center">
                <h1 className="text-3xl m-2 p-4 font-bold ">Su plan de estudios de programación anual de 2024</h1>
                <Link href={`/annual/gaps/${gap.id}`}>
                    <Card className="border-black shadow " data-aos="fade-up">
                        <CardHeader className="font-bold capitalize text-3xl ">
                            {gap.title}
                        </CardHeader>
                        <CardContent className="flex flex-col">
                            <p className="p-2">  {gap.year} </p>
                            <p className="p-2 text-gray-300">{gap.createdAt.toDateString()}</p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-end justify-center">
                            <Link href={`/annual/gaps/${gap.id}`}>
                                <Button className="bg-black">
                                    Editar
                                </Button>
                            </Link>  
                        </CardFooter>
                    </Card>
                </Link>
            </div>
        );
    } else {
        return (
            <div className="p-6 justify-center">
                 <h1 className="text-3xl m-2 p-2 font-bold ">Bienvenido, comienza a crear tus documentos aquí</h1>
                <Link href='/annual/create'>
                    <Card className="rounded-ml ">
                        <CardHeader className="font-bold ">
                            Crea tu programación anual ahora
                        </CardHeader>
                        <CardContent className="font-bold">
                            ¡Empiece hoy!
                            <Image 
                        src='/empty-red.svg'
                        alt='undraw create image'
                        width={150}
                        height={150}
                        className='m-auto'
                            />
                        </CardContent>
                        <CardFooter>
                            {currentTime}
                        </CardFooter>
                    </Card>
                </Link>
            </div>
        );
    }
}

export default GapPage;
