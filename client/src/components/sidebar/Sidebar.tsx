'use client';
// ICONS
import { MdSportsCricket } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';


import SidebarTab from './components/SidebarTap';
import SidebarHeader from './components/SidebarHeader';

const tabs = [
  { id: 1, title: 'My Team', image: <MdSportsCricket />, href: '/dashboard' },
  { id: 2, title: 'Pools', image: <GiPerspectiveDiceSixFacesRandom />, href: '/market' },
   { id: 3, title: 'Results', image: <FaClipboardList />, href: '/transactions' },
 //  { id: 4, title: 'Player Rankings', image: <FaRankingStar />, href: '/rankings' },
];

interface SidebarProps {
  currentImage: string;
  className?: string;
}

export default function Sidebar({ currentImage, className = "" }: SidebarProps) {
  return (
<div className={` h-screen max-w-[58px] bg-slate-950 shadow-lg hover:max-w-[250px] overflow-hidden transition-all ${className}`}>

      <SidebarHeader imageSrc={currentImage} />
      <div className="flex flex-col mt-4 space-y-2">
        {tabs.map((tab, index) => (
          <SidebarTab key={tab.id} {...tab} isLast={false} />
        ))}
      </div>
    </div>
  );
}
