import { IconType } from "react-icons";

interface SidebarItemProps {
  href?: string;
  label: string;
  icon: IconType;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  onClick,
  href,
  label,
  icon: Icon,
}) => {
  return (
    <div className="flex flex-row items-center ">
      <div className=" relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-20 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className=" relative lg:flex hidden  items-center gap-4 p-4 hover:bg-slate-300 hover:bg-opacity-20 cursor-pointer ">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
