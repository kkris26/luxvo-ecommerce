import LinkWrapper from "./LinkWrapper";
import { LuArrowUpRight } from "react-icons/lu";

const MenuSideBarWrapper = ({ children, path }) => {
  return (
    <p className="text-2xl font-extralight border-b border-transparent hover:border-b hover:border-black cursor-pointer  w-full flex justify-between items-center">
      <LinkWrapper className={"tracking-wider"} path={path}>{children}</LinkWrapper>
      <LuArrowUpRight strokeWidth={1} />
    </p>
  );
};

export default MenuSideBarWrapper;
