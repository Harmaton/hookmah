import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { BookAIcon, CheckCheck, CheckCircle } from "lucide-react";

import { db } from "@/lib/db";

import { YearForm } from "./_components/year";
import { ProffForm } from "./_components/prof-name";
import { InstitutionForm } from "./_components/institution-name";
import { ImageForm } from "./_components/logo-img";
import { CityForm } from "./_components/city";
import { DistrictForm } from "./_components/district";
import { DepartmentForm } from "./_components/department";
import { AcademyForm } from "./_components/academy";
import { AgeForm } from "./_components/age";
import { EducationLevelForm } from "./_components/education-level";
import { Actions } from "./_components/actions";
import { CourseForm } from "./_components/course-name";
import { Progress } from "@/components/ui/progress";
import { BackActions } from "./_components/back-action";

const GapIdPage = async ({ params }: { params: { gapid: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const gap = await db.gAP.findUnique({
    where: {
      id: params.gapid,
    },
  });

  const departments = await db.department.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const levels = await db.educationLevel.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const academies = await db.academy.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await db.course.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const averageages = await db.averageAge.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!gap) {
    return redirect("/");
  }

  const requiredFields = [
    gap.departmentId,
    gap.proffesorName,
    gap.institutionName,
    gap.city,
    gap.academyid,
    gap.district,
    gap.educationid,
    gap.companyLogo,
    gap.ageid,
    gap.courseid,
  ];

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean);

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
              Configuración Annual Programming Document
              
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
              <Actions disabled={false} gapid={gap.id} />
            </>
          )}
          </div>
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border rounded-md ">
            <ProffForm initialData={gap} gapid={gap.id} />
            <InstitutionForm initialData={gap} gapid={gap.id} />
            <CityForm initialData={gap} gapid={gap.id} />
            <DistrictForm initialData={gap} gapid={gap.id} />
            <div className="border">
              <EducationLevelForm
                initialData={gap}
                gapid={gap.id}
                options={levels.map((departments) => ({
                  label: departments.name,
                  value: departments.id,
                }))}
              />

              <AgeForm
                initialData={gap}
                gapid={gap.id}
                options={averageages.map((departments) => ({
                  label: departments.name,
                  value: departments.id,
                }))}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="border rounded-md">
              <ImageForm initialData={gap} gapid={gap.id} />
              {/* <RegForm initialData={gap} gapid={gap.id} />
              <ProfileForm initialData={gap} gapid={gap.id} /> */}
              <div className="border">
                <DepartmentForm
                  initialData={gap}
                  gapid={gap.id}
                  options={departments.map((departments) => ({
                    label: departments.name,
                    value: departments.id,
                  }))}
                />
                <AcademyForm
                  initialData={gap}
                  gapid={gap.id}
                  options={academies.map((departments) => ({
                    label: departments.name,
                    value: departments.id,
                  }))}
                />

                <CourseForm
                  initialData={gap}
                  gapid={gap.id}
                  options={courses.map((courses) => ({
                    label: courses.name,
                    value: courses.id,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GapIdPage;
