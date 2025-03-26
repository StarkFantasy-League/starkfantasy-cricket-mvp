interface SidebarHeaderProps {
    imageSrc: string;
  }
  
  export default function SidebarHeader({ imageSrc }: SidebarHeaderProps) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-20 h-20 bg-gray-500 rounded-lg flex items-center justify-center">
          {imageSrc ? (
            <img src={imageSrc} alt="Profile" width={64} height={64} className="rounded-lg" />
          ) : (
            <div className="w-16 h-16 bg-gray-700 rounded-lg" />
          )}
        </div>
      </div>
    );
  }
  