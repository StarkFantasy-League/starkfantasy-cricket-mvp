
import NavBar from "./components/navbar";
import UserBlock from "./components/userBlock";

interface HeaderProps {
  className?: string;
  title?: boolean;
}

export default function Header({ className = "", title = false }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 w-full px-4 z-50 lg:py-4 bg-slate-900 lg:bg-transparent ${className}`}
    >
      <div className="relative h-[100px]">
        <div className="flex items-center justify-between">
          {/* Logo div */}
          <div className="flex items-center space-x-2">
            <img
              src="/icons/logo.png"
              alt="Logo"
              className="w-[80px] md:w-[90px] lg:w-[100px]"
            />
            <h3 className="text-white text-2xl font-medium">
              {title ? "StarkFantasy League" : ""}
            </h3>
          </div>

          {/* Navbar */}
          <div className="absolute h-[100px] inset-x-0 top-0 flex justify-center items-center">
            <NavBar />
          </div>

          {/* User Block */}
          <div>
            <UserBlock />
          </div>
        </div>
      </div>
    </header>
  );
}
