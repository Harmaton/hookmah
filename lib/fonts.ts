import {
    JetBrains_Mono as FontMono,
    Inter as FontSans,
    Poppins,
    Manrope,
    Lato,
    Caveat,
  } from 'next/font/google';
  
  export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
  });
  
  export const fontMono = FontMono({
    subsets: ['latin'],
    variable: '--font-mono',
  });
  
  export const fontPoppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  });
  
  export const fontManrope = Manrope({
    subsets: ['latin'],
    variable: '--font-manrope',
    weight: ['200', '300', '400', '500', '600', '700', '800'],
  });
  
  export const fontLato = Lato({
    subsets: ['latin'],
    variable: '--font-lato',
    weight: ['100', '300', '400', '700', '900'],
  });
  
  export const fontCaveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    weight: ['400', '700', '600', '500'],
    style: ['normal'],
  });
  