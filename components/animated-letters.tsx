import React, { useMemo, FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return <span className="word-wrapper">{children}</span>;
};

interface TagMap {
  [key: string]: string;
}

const tagMap: TagMap = {
  paragraph: "p",
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
};

interface AnimatedCharactersProps {
  text: string;
  type: keyof TagMap;
}

const AnimatedCharacters: FC<AnimatedCharactersProps> = ({ text, type }) => {
    const words = useMemo(() => {
      const splitWords = text.split(" ");
      return splitWords.map(word => [...Array.from(word), "\u00A0"]);
    }, [text]);
  

  const isHeading3 = type === 'heading3'; // Determine if type is 'heading3' once outside of map

  const item = useMemo(() => ({
    hidden: {
      y: "200%",
      color: "#0055FF",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0.25,
      color: isHeading3 ? '#0055FF' : "#27f27a", // Use the variable here
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  }), []); // No dependencies since isHeading3 and colors are constants

  const Tag = tagMap[type] as keyof JSX.IntrinsicElements;

  return (
    <Tag>
      {words.map((word, index) => (
        <Wrapper key={index}>
          {word.map((element, idx) => (
            <span key={idx} style={{ overflow: "hidden", display: "inline-block" }}>
              <motion.span style={{ display: "inline-block" }} variants={item}>
                {element}
              </motion.span>
            </span>
          ))}
        </Wrapper>
      ))}
    </Tag>
  );
};

export default React.memo(AnimatedCharacters);
