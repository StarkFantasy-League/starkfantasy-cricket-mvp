interface SidebarTabProps {
  title: string;
  image: JSX.Element;
  href: string;
  isLast?: boolean;
}

export default function SidebarTab({ title, image, href, isLast = false }: SidebarTabProps) {
  return (
    <div className="relative">
      <a href={href} className="flex items-center p-4 hover:bg-gray-700 transition">
        <span className="text-3xl text-white">{image}</span> 
        <span className="text-white font-medium text-lg ml-3">{title}</span>
      </a>
      {!isLast && <div className="w-full border-b-[3px] border-white" />}
    </div>
  );
}
