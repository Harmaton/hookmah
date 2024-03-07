import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ProfnameForm } from "./_components/prof-name";
import { CourseNameForm } from "./_components/course-name";
import { DateForm } from "./_components/date";
import { AverageAgeForm } from "./_components/average-age";
import { EducationLevelForm } from "./_components/education_level";
import { AcademicLevelForm } from "./_components/academic-level";
import HeaderInPage from "./_components/header";
import SubheaderEXP from "./_components/subheader";
import { InstForm } from "./_components/institution";
import { TrimesterForm } from "./_components/trimester";


const ExprienceIDPage = async ({
  params
}: {
  params: { experienceid: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const experience = await db.experience.findUnique({
    where: {
      id: params.experienceid,
    },
  });

  if (!experience) {
    return redirect("/");
  }

  const requiredFields = [
    experience.academicid,
    experience.educationid,
    experience.prof_name,
    experience.ageid,
    experience.date,
    experience.courseid,
    experience.inst_Name,
    experience.trimester
  ];

  const allFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${allFields})`;

  const isComplete = requiredFields.every(Boolean);

  const courses = await db.course_experience.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const ages = await db.newagesExperience.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const educationlevels = await db.educationLevel__experience.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const academiclevels = await db.academicLevel_experience.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className="p-6 border">
        <HeaderInPage
          id={experience.id}
          first={"experience"}
          second={"experiences"}
          page={"1"}
          pagetwo={null}
        />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium flex">
              Configuración de experiencias de aprendizaje.
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
        {isComplete && (
          <SubheaderEXP
            id={experience.id}
            completedFields={completedFields}
            isComplete={true}
            isfirst={true}
            issecond={false}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border rounded-md ">
            <ProfnameForm
              initialData={experience}
              experienceid={experience.id}
            />
            <InstForm initialData={experience} experienceid={experience.id} />

            <CourseNameForm
              initialData={experience}
              experienceid={experience.id}
              options={courses.map((courses) => ({
                label: courses.name,
                value: courses.id,
              }))}
            />

            <div className="border">
              <DateForm initialData={experience} experienceid={experience.id} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="border rounded-md">

              <TrimesterForm initialData={experience} experienceid={experience.id} />

              <AverageAgeForm
                initialData={experience}
                experienceid={experience.id}
                options={ages.map((courses) => ({
                  label: courses.name,
                  value: courses.id,
                }))}
              />
              <AcademicLevelForm
                initialData={experience}
                experienceid={experience.id}
                options={academiclevels.map((courses) => ({
                  label: courses.name,
                  value: courses.id,
                }))}
              />

              <EducationLevelForm
                initialData={experience}
                educationid={experience.id}
                options={educationlevels.map((courses) => ({
                  label: courses.name,
                  value: courses.id,
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExprienceIDPage;
