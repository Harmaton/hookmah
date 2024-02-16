"use client"

import { useEffect } from 'react'
import AOS from 'aos'
import "aos/dist/aos.css";

export const AOSInit = () => {
    useEffect(() => {
        AOS.init({  
          offset: 60, // offset (in px) from the original trigger point
          delay: 200, // values from 0 to 3000, with step 50ms
          duration: 1000, // values from 0 to 3000, with step 50ms
          easing: 'ease', // default easing for AOS animations
          mirror: false, // whether elements should animate out while scrolling past them
          anchorPlacement: 'top-bottom',
        });
      }, [])

  return null
}