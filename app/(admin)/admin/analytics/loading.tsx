import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCheckIcon } from "lucide-react";
import React from "react";

type Props = {};

const MetricCard: React.FC = () => (
  <Card className='p-10'>
  <CardContent>
    <Skeleton className="w-[100px] h-[20px] rounded-full" />
  </CardContent>
  <CardFooter className='flex flex-col'>
    <>
    <Skeleton className="w-[100px] h-[20px] rounded-full" />
 <Skeleton className="w-[100px] h-[20px] rounded-full" />

    </>
  </CardFooter>
</Card>
);

const Loading = (props: Props) => {
  return (
    <>
    <div> 
      <div className=' flex flex-col m-2 space-y-5  items-center'>
        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
            <MetricCard />
          </div>
         
        </div>
      
    </div>
    </>
  );
};

export default Loading;
