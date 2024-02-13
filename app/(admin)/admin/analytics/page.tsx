import { getAnalytics } from "@/app/_actions/analytics";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const page = async () => {
  const { total_users, total_gaps_created, total_teachers, total_sessions, total_experiences } =
    await getAnalytics();

  return (
    <div className="p-4 m-2 space-y-4 space-x-4 lg:flex lg:flex-col lg:space-x-0 lg:space-y-4 ">
      {/* Three cards in the first row */}
      <div className="flex flex-col lg:flex-row lg:flex-grow lg:space-x-4">
        <Card className="flex-grow">
          <CardHeader className="font-bold text-3xl ">Total de usuarias</CardHeader>
          <CardContent className="text-2xl m-auto">{total_users}</CardContent>
        </Card>
        <Card className="flex-grow">
          <CardHeader className="font-bold text-3xl ">Profesores totales</CardHeader>
          <CardContent className="text-2xl m-auto">{total_teachers}</CardContent>
        </Card>
        <Card className="flex-grow">
          <CardHeader className="font-bold text-3xl ">Programación Curricular Anual Total Creada</CardHeader>
          <CardContent className="text-2xl m-auto">{total_gaps_created}</CardContent>
        </Card>
      </div>

      <div className="flex flex-col space-y-4 m-auto lg:flex-row lg:flex-grow space-x-4">
        <Card className="lg:flex-grow">
          <CardHeader className="font-bold text-3xl ">Sesiones totales</CardHeader>
          <CardContent className="text-2xl m-auto">{total_sessions}</CardContent>
        </Card>
        <Card className="lg:flex-grow">
          <CardHeader className="font-bold text-3xl ">Experiencias Totales</CardHeader>
          <CardContent className="text-2xl m-auto">{total_experiences}</CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
