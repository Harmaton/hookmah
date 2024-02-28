import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CheckCheck, CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { ExperienceForm } from "./_components/experience-options";
import { CourseForm } from "./_components/course-name";
import { AcademicLevelForm } from "./_components/academy";
import { Actions } from "./_components/actions";
import { ProfnameForm } from "./_components/prof-name";
import { DateForm } from "./_components/date";
import { YearForm } from "./_components/year";
import { InstitutionForm } from "./_components/inst";
import { ImageForm } from "./_components/logo";
import { EducationForm } from "./_components/education";
import HeaderInPage from "@/app/(dashboard)/experience/experiences/[experienceid]/_components/header";
import SubheaderSES from "./_components/subheader";



const SessionIDPage = async ({ params }: { params: { sessionid: string } }) => {
const { userId } = auth();

if (!userId) {
  return redirect("/");
}

const session = await db.session.findUnique({
    where: {
        id: params.sessionid
    }
})

if (!session) {
    return redirect("/");
  }


  const userexperienceoptions = await db.experience.findMany({
    where:{
      userid: userId
    }
  })

  const courses = await db.sessionCourse.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const educations = await db.educationLevel_Session.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const academics = await db.academicLevel_Session.findMany({
    orderBy: {
      name: "asc",
    },
  })



const requiredFields = [
    session.logo,
    session.prof_name,
    session.institution_name,
    session.date,
    session.year,
    session.educationid,
    session.year,
    session.courseid,
    session.academicid
]

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean)

return (
    <>
    <div className="p-6 border">
      <HeaderInPage id={session.id} first={"sessions"} second={"session"} page={"1"} pagetwo={null} />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium flex">
              
            Configure esta sesión a continuación
            </h1>
            <span className="text-sm text-slate-700">
            Campos requeridos : {completionText}
            </span>
            {!isComplete && <Progress value={completedFields} />}
            {!isComplete && (
              <span className="text-sm text-red-300">
             Complete todos los campos para acceder a Hookmah A.I.
              </span>
            )}
            
          </div>
         
        </div>
        {isComplete && <SubheaderSES id={session.id} completedFields={completedFields} isComplete={isComplete} isfirst={true} issecond={false} /> }
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border rounded-md ">
         
              <ExperienceForm initialData={session}
                  sessionid={session.id}
                  options={userexperienceoptions.map((exp) => ({
                    label: exp.title,
                    value: exp.id,
                  }))} />

              <CourseForm
                  initialData={session}
                  sessionid={session.id}
                  options={courses.map((courses) => ({
                    label: courses.name,
                    value: courses.id,
                  }))}
                />

                <AcademicLevelForm  initialData={session}
                  sessionid={session.id}
                  options={academics.map((courses) => ({
                    label: courses.name,
                    value: courses.id,
                  }))} />

                <EducationForm initialData={session}
                  sessionid={session.id}
                  options={educations.map((courses) => ({
                    label: courses.name,
                    value: courses.id,
                  }))} />

                  <InstitutionForm  initialData={session}
                  sessionid={session.id} />

            </div>
         

          <div className="space-y-6">
            <div className="border rounded-md">

              <ImageForm initialData={session}
                  sessionid={session.id} />

            <ProfnameForm initialData={session}
                  sessionid={session.id} />

                  <DateForm initialData={session}
                  sessionid={session.id} />

                  <YearForm initialData={session}
                  sessionid={session.id} />

             
              <div className="border">
            
              
               
              </div>
            </div>
          </div>
          </div>
        </div>
      {/* </div> */}
    </>
)
}

export default SessionIDPage