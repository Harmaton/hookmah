import  LightningBolt, { Lightbulb } from "lucide-react"; // Assuming you have an appropriate icon library

const Header = () => {
  return (
    <header className=" p-6 flex items-center">
      <h1 className="text-4xl font-fancy font-extrabold">Our Core Competencies</h1>
      <Lightbulb className="w-8 h-8 ml-4" />
    </header>
  );
};

export default Header;
