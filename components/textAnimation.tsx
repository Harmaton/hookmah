'use client'

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedCharacters from "./animated-letters";
import { useInView } from 'react-intersection-observer';


export default function TextAnimation() {
  const [replay, setReplay] = useState(true);
  // Placeholder text data, as if from API

  
  const flash = {
    hidden: { color: '#000000' }, 
    visible: {
      color: ['#FF0000', '#000000'], // flash to red and back to black
      transition: { yoyo: 1, duration: 0.5 } // flash the color once
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: false, 
  });

  const placeholderText = [
    {
      type: "heading2",
      text: "Your New Home for  The Best Art From All Over the World!"
    },
    {
        type: "heading3",
        text: "-theartsoko."
      }
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

    // Quick and dirt for the example
    const handleReplay = () => {
        setReplay(!replay);
        const timeoutId = setTimeout(() => {
          setReplay(true);
        }, 100);
        return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts before timeout.
      };
      

     // Replay animation every time component comes in view
  useEffect(() => {
    if (inView) handleReplay();
  }, [inView]);


  return (
    <motion.div
      ref={ref} // Attach ref to the component
      className="m-0"
      initial="hidden"
      animate={replay ? "visible" : "hidden"}
      variants={container}
      
    >
        {placeholderText.map((item, index) => {

          return(
            <AnimatedCharacters key={index} {...item} />
          );
        })}

    </motion.div>
  );
}
