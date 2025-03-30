'use client';

import Image from "../../components/image";


export default function PoolsPage() {
  return (
    <div className="relative min-h-screen w-full">

      <Image
        src="/assets/images/background.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      
      <div className="text-white text-4xl font-bold p-10">
        Pools Page
      </div>
    </div>
  );
}
