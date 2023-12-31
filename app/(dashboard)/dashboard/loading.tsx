
import { BounceLoader, ScaleLoader } from "react-spinners";

export default function loading() {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center max-w-7xl mx-auto'>
      <ScaleLoader  />
    </div>
  );
}
