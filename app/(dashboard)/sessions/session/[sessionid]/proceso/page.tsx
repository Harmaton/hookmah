import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { CheckCheck } from "lucide-react";
import { Actions } from "./_components/actions";
import { TheoryForm } from "./_components/theoretic";
import { PracticalForm } from "./_components/practical";
import { ComplimentaryForm } from "./_components/complimentary";
import { EvaluationForm } from "./_components/evaluation";
import { SessionWordAction } from "./_components/word-session";
import HeaderInPage from "@/app/(dashboard)/experience/experiences/[experienceid]/_components/header";


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

  if(!session || !session.courseid || !session.experienceid || !session.educationid){
    redirect("/")
  }

  const coursename = await db.sessionCourse.findUnique({
    where: {id: session.courseid},
    select: { name: true },
  })


  const expLevel = await db.educationLevel_Session.findUnique({
    where: {id: session.educationid},
    select: { name: true },
  })


  const requiredfields = [
    session.practicalcontent,
    session.theoreticalcontent,
    session.complimentaryactivities,
    session.assesment,
  ];

  const allFields = requiredfields.length;
  const completedFields = requiredfields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredfields.every(Boolean);

  const course = await db.sessionCourse.findUnique({where: {id: session.courseid}})

  const ageexp = await db.experience.findUnique({where: {id: session.experienceid}, select: {ageid: true}})

  if(!course || !ageexp?.ageid || !session.timeid || !session.academicid){
    redirect('/sessions')
  }

  const age = await db.averageAge_experience.findUnique({where: {id: ageexp.ageid}, select: {name: true}})

  const time = await db.sessionTime.findUnique({
    where: {id: session.timeid},
    select: {name: true}
  })

  const acad = await db.academicLevel_Session.findUnique({where: {id: session.academicid}, select: {name: true}})

  if(!age?.name){
   redirect('/sessions')
  }

  return <div className="P-4 m-2">
 <HeaderInPage id={session.id} first={"sessions"} second={"session"} page={"3"} pagetwo={null} />
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
       <SessionWordAction disabled={false} expData={session} academyLevel={acad} averageAge={age} course={coursename} educationLevel={expLevel} time={time} />
       </div>
       }
  </div>
      <div className="p-4 border rounded-md m-2 ">
       <TheoryForm initialData={session} sessionid={session.id} course={course.name} age={age.name} />
        </div>

        <div className="p-4 border rounded-md m-2 ">

       <PracticalForm initialData={session} sessionid={session.id} course={course.name} age={age.name} />
           
        </div>

        <div className="p-4 border rounded-md m-2 ">
        <ComplimentaryForm initialData={session} sessionid={session.id} course={course.name} age={age.name} />
      
        </div>

        <div className="p-4 border rounded-md m-2 ">
            <EvaluationForm initialData={session} sessionid={session.id} course={course.name} age={age.name} />
        </div>
  </div>;
}

export default Page