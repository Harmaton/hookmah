import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { CheckCheck } from "lucide-react";
import { Actions } from "./_components/actions";


 const Page = async ({
  params,
}: {
  params: { sessionid: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const session = await db.session.findUnique({
    where: { id: params.sessionid, userid: userId },
  });

  if(!session || !session.courseid || !session.experienceid){
    redirect("/")
  }

  const minutos = await db.sessionTime.findMany({orderBy: {name: 'desc'}})

  const requiredfields = [
    session.learningpurpose,
    session.knowinadvance,
    session.cognitiveconflict,
    session.motivation,
  ];

  const allFields = requiredfields.length;
  const completedFields = requiredfields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredfields.every(Boolean);

  const course = await db.sessionCourse.findUnique({where: {id: session.courseid}})

  const ageexp = await db.experience.findUnique({where: {id: session.experienceid}, select: {ageid: true}})

  if(!course || !ageexp?.ageid){
    redirect('/sessions')
  }

  const age = await db.averageAge_experience.findUnique({where: {id: ageexp.ageid}})

  if(!age?.name){
   redirect('/sessions')
  }

  return <div className="P-4">

<div className="p-4 ">
        <h1 className="font-bold text-center text-4xl">
        SECUENCIA DIDÁCTICA{" "} PROCESO
        </h1>
      </div>
  <div className="p-4 m-auto">

  <span className="text-sm text-slate-700">
            Campos requeridos : {completionText}
            </span>
            {!isComplete && <Progress value={completedFields} />}

      {isComplete &&
       <div className="items-center justify-center m-auto">
       <Actions disabled={false} sessionid={session.id}  /> 
        <div className="h-10 w-10 rounded-full bg-green-500 flex">
        <CheckCheck className="text-white mx-auto my-auto" />
      </div>
       </div>
       }
  </div>
      


      <div className="p-4 border rounded-md m-2 ">
       
          
        </div>

        <div className="p-4 border rounded-md m-2 ">
       
           
        </div>

        <div className="p-4 border rounded-md m-2 ">
        
      
        </div>


  </div>;
}

export default Page