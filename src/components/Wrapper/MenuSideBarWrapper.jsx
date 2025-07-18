import LinkWrapper from "./LinkWrapper";
import { LuArrowUpRight } from "react-icons/lu";

const MenuSideBarWrapper = ({ children, path, onClick }) => {
  return (
    <p
      onClick={onClick}
      className="text-2xl font-extralight border-b border-transparent hover:border-b hover:border-black cursor-pointer  w-full flex justify-between items-center"
    >
      <LinkWrapper
        className={
          "tracking-wider flex justify-between items-center  w-full"
        }
        path={path}
      >
        {children}
        <LuArrowUpRight strokeWidth={1} />
      </LinkWrapper>
    </p>
  );
};

export default MenuSideBarWrapper;
