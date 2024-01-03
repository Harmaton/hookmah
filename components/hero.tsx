"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { Fingerprint, TrendingUp } from "lucide-react";
import React, { FC } from "react";

const Hero: FC = () => {
  return (
    <section className="container relative mt-4 p-3  bg-gradient-to-r from-red-200 via-transparent to-green-200">
      <div className="max-w-2xl mx-auto space-y-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight relative">
          
        Revolucione su <span className="text-red-400 m-2">experiencia docente</span> con <span className="text-red-400 m-2">construcción de clases impulsada por IA</span>, optimizando cada lección con innovación y eficiencia
        </h1>
        <p className="text-lg ">
        Bienvenido a una plataforma exclusiva para educadores de educación básica. Superamos desafíos al usar IA para agilizar la creación de clases, ofreciendo material actualizado sin depender de libros obsoletos.
        </p>
        <Card className="flex flex-col items-center justify-center w-full p-6  rounded-lg shadow-lg">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-xl font-semibold">Ready to get started?</h3>
            <p className="text-sm text-gray-500">
              Click the button below to go to your dashboard.
            </p>
            <Link href="/annual">
              <Button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-green-500">
                Get Started for Free
                <TrendingUp className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/admin/analytics">
              <Button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-green-500">
                Admin Dashboard
                <Fingerprint className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
