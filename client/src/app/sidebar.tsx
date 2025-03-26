'use client';

import Sidebar from "../components/sidebar/Sidebar";
import { useState } from 'react';

export default function Page() {
  const [currentImage, setCurrentImage] = useState('/images/team-1.png');

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar currentImage={currentImage} />
    </div>
  );
}
