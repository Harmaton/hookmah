'use client'
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const projects = [
  {
    title: "Complete los detalles",
    description:
      "ingrese información básica como el título del curso, los objetivos y las metodologías en la aplicación web",
    id: "1",
  },
  {
    title: "Mejora de la IA",
    description:
      "ingrese información básica como el título del curso, los objetivos y las metodologías en la aplicación web.",
    id: "2",
  },
  {
    title: "Exportar y editar",
    description:
      "exporta el documento a formato Word. Revise y edite el contenido según sea necesario para garantizar la precisión y coherencia antes de finalizar el documento",
    id: "3",
  },
];

export const DocumentTypes = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-8"
    data-aos="fade-up"
    >
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="relative group  block p-2 h-full w-full "
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-slate-800 block  rounded-3xl"
                  layoutId="hoverBackground" // required for the background to follow
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="rounded-2xl h-full w-full p-4 overflow-hidden bg-gradient-to-br from-red-800 to-black/[0.2] border border-transparent group-hover:border-red-700 relative z-50">
  <div className="relative z-50">
    <div className="p-4">
      <h4 className="text-red-100 font-bold tracking-wide mt-4">
        {project.title}
      </h4>
      <p className="mt-8 tracking-wide leading-relaxed text-sm text-red-200">
        {project.description}
      </p>
    </div>
  </div>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

