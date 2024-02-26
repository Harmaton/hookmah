import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { BookAIcon, CheckCheck, CheckCircle } from "lucide-react";
import { Prisma } from "@prisma/client";
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
import { CourseForm } from "./_components/course-name";
import { Progress } from "@/components/ui/progress";
import HeaderInPage from "./_components/header";
import Subheader from "./generate/_components/subheader";

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
      name: Prisma.SortOrder.asc as "desc",
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
        <HeaderInPage id={gap.id} first={"annual"} second={"gaps"} page={"1"} pagetwo={null} />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium flex">
              Configuración Annual Programming Document
            </h1>
            <span className="text-sm text-slate-700">
              Campos requeridos : {completionText}
            </span>
            {!isComplete && <Progress value={completedFields} />}  
          </div>
        </div>
        {isComplete && <Subheader id={gap.id} completedFields={completedFields} isComplete={true} isfirst={true} issecond={false} />}

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
