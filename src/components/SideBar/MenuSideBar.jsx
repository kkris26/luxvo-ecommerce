import { Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import MenuSideBarWrapper from "../Wrapper/MenuSideBarWrapper";

import { TfiClose } from "react-icons/tfi";
const menuItem = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];
export default function MenuSideBar({ isOpen, onOpenChange }) {
  return (
    <>
      <Drawer
        hideCloseButton
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            },
            exit: {
              opacity: 0,
              x: -100,
              transition: { duration: 0.3, ease: "easeInOut" },
            },
          },
          initial: "exit",
          animate: "enter",
          exit: "exit",
        }}
        backdrop="blur"
        isOpen={isOpen}
        placement={"left"}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody className="p-8">
                <div
                  onClick={onClose}
                  className="flex justify-start items-center gap-2 mb-8 cursor-pointer w-max"
                >
                  <TfiClose className="text-sm " />
                  <p className="font-extralight text-md tracking-wider">
                    close
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  {menuItem.map((menu) => (
                    <MenuSideBarWrapper path={menu.path}>
                      {menu.name}
                    </MenuSideBarWrapper>
                  ))}
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
