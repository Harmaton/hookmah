import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { TimeForm } from "./_components/time";
import { MotivationForm } from "./_components/motivation";
import { CognitiveForm } from "./_components/cogntive";
import { KiadvForm } from "./_components/kiadv";
import { LearnningForm } from "./_components/learning-p";
import { Progress } from "@/components/ui/progress";
import { CheckCheck } from "lucide-react";
import { Actions } from "./_components/action";

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
        SECUENCIA DIDÁCTICA{" "} INICO
        </h1>
      </div>
  <div className="p-4 m-auto flex">

  <span className="text-sm text-slate-700">
            Campos requeridos : {completionText}
            </span>
            {!isComplete && <Progress value={completedFields} />}

      {isComplete &&
       <div className="items-center justify-end m-auto flex">
       <Actions disabled={false} sessionid={session.id}  /> 
        <div className="h-10 w-10 rounded-full bg-green-500 flex">
        <CheckCheck className="text-white ml-2 mx-auto my-auto" />
      </div>
       </div>
       }
  </div>
      

<div className="p-4 border rounded-md m-2 ">
        
        <TimeForm initialData={session} sessionid={session.id} options={minutos.map((minuto) => ({
                    label: minuto.name,
                    value: minuto.id,
            }))} /> 
      </div>

      <div className="p-4 border rounded-md m-2 ">
       
          <MotivationForm initialData={session} sessionid={session.id} course={course.name} age={age.name} />
        </div>

        <div className="p-4 border rounded-md m-2 ">
       
            <KiadvForm initialData={session} sessionid={session.id} course={course.name} age={age.name} />
        </div>

        <div className="p-4 border rounded-md m-2 ">
        
        <CognitiveForm initialData={session} sessionid={session.id} course={course.name} age={age.name} />
        </div>

        <div className="p-4 border rounded-md m-2 ">
        
            <LearnningForm initialData={session} sessionid={session.id} course={course.name} age={age.name} />
        </div>

  </div>;
}

export default Page