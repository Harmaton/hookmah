// SVGOverlay.tsx
import React from 'react';

const SVGOverlay = () => {
  return (
    <div className="absolute inset-0">
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <defs>
          <pattern id="pattern" width="100%" height="100%" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="4" fill="#fff" />
            <circle cx="15" cy="15" r="3" fill="blue" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern)" />
      </svg>
    </div>
  );
};

export default SVGOverlay;
