import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";
import { useSelector } from 'react-redux';

import { RootState } from "../redux/store";
import Link from "next/link";

interface SidebarContextValue {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({
  expanded: true,
});

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
   isLoggedIn &&
   <div className="sticky top-16 bg-gray-100 md:p-4 h-[calc(100vh-61.6px)]">
    <aside className="h-[calc(100vh-78.6px)] hidden sm:block">
      <nav className={`h-full w-35 flex flex-col bg-white border-r shadow-sm ${isLoggedIn}?"hidden":""`}>
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          /> */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
    </div>
  );
}

interface SidebarItemProps {
  icon: JSX.Element;
  text: string;
  to:string;
  active?: boolean;
  alert?: boolean;
}

export function SidebarItem({
  icon,
  text,
  to,
  active = false,
  alert = false,
}: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
   <Link href={to}>
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        
        {text}
      
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
    </Link>
  );
}