import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { TimerIcon, File, Clock10Icon,LayoutDashboard, ListChecks, CheckSquareIcon, CircleDollarSign, CalendarCheck, BookAIcon } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { YearForm } from "./_components/year";
import { ProffForm } from "./_components/prof-name";
import { InstitutionForm } from "./_components/institution-name";
import { ImageForm } from "./_components/logo-img";
import { CityForm } from "./_components/city";
import { DistrictForm } from "./_components/district";
import { RegForm } from "./_components/regulatory-basis";
import { ProfileForm } from "./_components/graduate-profile";
import { DepartmentForm } from "./_components/department";
import { AcademyForm } from "./_components/academy";
import { AgeForm } from "./_components/age";
import { EducationLevelForm } from "./_components/education-level";
import { Actions } from "./_components/actions";



const GapIdPage = async ({
  params
}: {
  params: { gapid: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const gap = await db.gAP.findUnique({
    where: {
      id: params.gapid,
     userid: userId
    },
   });

  const departments = await db.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await db.course.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const levels = await db.educationLevel.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const academies = await db.academy.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const averageages = await db.averageAge.findMany({
    orderBy: {
      name: "asc",
    },
  })

  if (!gap) {
    return redirect("/");
  }

  // const requiredFields = [
  //   course.title,
  //   course.description,
  //   course.imageUrl,
  //   course.price,
  //   course.departmentsId,
  //   course.chapters.some(chapter => chapter.isPublished),
  // ];

  // const totalFields = requiredFields.length;
  // const completedFields = requiredFields.filter(Boolean).length;

  // const completionText = `(${completedFields}/${totalFields})`;

  // const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {/* {!course.isPublished && (
        <Banner
          label="Este curso es inédito. No será visible para los estudiantes."
        />
      )} */}
     
      <div className="p-6 border">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium flex">
            Configuración Annual Programming Document
            <BookAIcon className="h-4 w-4 flex ml-3" />
            </h1>
            <span className="text-sm text-slate-700">
            {/* Completa todos los campos {completionText} */}
            </span>
          </div>
          <Actions disabled={false} gapid={gap.id} isPublished={gap.isPublished} /> 
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border rounded-md ">
           <ProffForm initialData={gap} gapid={gap.id} />
          <InstitutionForm initialData={gap} gapid={gap.id} />
          <YearForm initialData={gap} gapid={gap.id} />
          <CityForm initialData={gap} gapid={gap.id} />
          <DistrictForm initialData={gap} gapid={gap.id} />
          <div className="border">
          <EducationLevelForm initialData={gap} gapid={gap.id} options={levels.map((departments) => ({
                label: departments.name,
                value: departments.id,
              }))} />

          <AgeForm initialData={gap} gapid={gap.id} options={averageages.map((departments) => ({
                label: departments.name,
                value: departments.id,
              }))} />
       </div>
          </div>

          <div className="space-y-6">
            <div className="border rounded-md">
              <ImageForm initialData={gap} gapid={gap.id} />
              <RegForm initialData={gap} gapid={gap.id} />
              <ProfileForm initialData={gap} gapid={gap.id} />
              <div className="border">
              <DepartmentForm initialData={gap} gapid={gap.id} options={departments.map((departments) => ({
                label: departments.name,
                value: departments.id,
              }))} />
              <AcademyForm initialData={gap} gapid={gap.id} options={academies.map((departments) => ({
                label: departments.name,
                value: departments.id,
              }))} />
              
             
              </div>
              {/* Generate AI Content form */}
              {/* Sign Form */}
              {/* download Form */}

            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default GapIdPage;