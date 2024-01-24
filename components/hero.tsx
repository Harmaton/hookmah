"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { Fingerprint, TrendingUp } from "lucide-react";
import React, { FC } from "react";
import Spotlight from "./ui/SpotLight";

const Hero: FC = () => {
  return (
    <section className="container relative mt-4 p-3   animate-gradient w-full dark:bg-black bg-white  flex items-center justify-center">
      <Spotlight />
      <div className="max-w-4xl mx-auto space-y-6 text-center ">
      <h1 className="text-3xl sm:text-5xl font-fancy font-extrabold m-3">
  Abrace el futuro de la educación con{" "}
  <span className="text-red-400 m-2">Hokmah ia</span>,
  donde la tecnología de inteligencia artificial lleva la
  <span className="text-red-400 m-2">Creación de documentos para educadores</span>
  de todos los niveles al siguiente nivel.
</h1>


        <Card className="flex flex-col items-center justify-center w-full p-6  rounded-lg shadow-lg">
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-xl font-semibold">¿Lista para empezar?</h3>
            <p className="text-sm text-gray-500">
            Haga clic en el botón a continuación para ir a su panel de control.
            </p>
            <Link href="/annual">
              <Button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-green-500">
                Get Started for Free
                <TrendingUp className="w-4 h-4" />
              </Button>
            </Link>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Hero;
