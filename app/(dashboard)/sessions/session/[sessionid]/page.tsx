import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CheckCheck, CheckCircle } from "lucide-react";
import { redirect } from "next/navigation";



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


const requiredFields = [
    session.company_logo,
    session.prof_name,
    session.institution_name,
    session.date,
    session.year,
    session.education_Level,
    session.ability,
    session.assesment
]

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean)

return (
    <>
    <div className="p-6 border">
      <div className='flex space-x-5 items-center p-2 border mb-2'>
      <CheckCircle className="h-4 w-4 text-red-500" />
      <h1 className="text-2xl text-red-500"> Paso 1/3 </h1>
      </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium flex">
              
            Configuración de experiencias de aprendizaje.
            </h1>
            <span className="text-sm text-slate-700">
            Campos requeridos : {completionText}
            </span>
            {!isComplete && <Progress value={completedFields} />}
            {isComplete && (
              <div className="h-10 w-10 rounded-full bg-green-500 flex">
                <CheckCheck className="text-white mx-auto my-auto" />
              </div>
            )}
            {!isComplete && (
              <span className="text-sm text-red-300">
             Complete todos los campos para acceder a Hookmah A.I.
              </span>
            )}
             {isComplete && (
            <>
              {/* <Actions disabled={false} experienceid={experience.id}  /> */}
            </>
          )}
          </div>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border rounded-md ">
           {/* <ProfnameForm initialData={experience} experienceid={experience.id} />
            <CourseNameForm initialData={experience} experienceid={experience.id} options={courses.map((courses) => ({
                    label: courses.name,
                    value: courses.id,
                  }))}   />

            <div className="border">
             <DateForm initialData={experience} experienceid={experience.id} />
             <AverageAgeForm initialData={experience} experienceid={experience.id} options={ages.map((courses) => ({
                    label: courses.name,
                    value: courses.id,
                  }))}   />

<AcademicLevelForm initialData={experience} experienceid={experience.id} options={academiclevels.map((courses) => ({
                    label: courses.name,
                    value: courses.id,
                  }))}  />   

<EducationLevelForm initialData={experience} educationid={experience.id} options={educationlevels.map((courses) => ({
                    label: courses.name,
                    value: courses.id,
                  }))}  /> */}
            </div>
          </div>

          <div className="space-y-6">
            <div className="border rounded-md">
{/*              
                  <PSEcharacteristicsForm initialData={experience} experienceid={experience.id} />
                  <PiccharacteristicsForm initialData={experience} experienceid={experience.id} />
                  <PnpcharacteristicsForm initialData={experience} experienceid={experience.id} /> */}
             
              <div className="border">

                 
              
               
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
)
}

export default SessionIDPage