import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Divider,
} from "@heroui/react";
import MenuSideBarWrapper from "../Wrapper/MenuSideBarWrapper";

import { HiChevronLeft } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import MainLogo from "../Logo/MainLogo";

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
                <div className="flex flex-col gap-6 w-full">
                  <MenuSideBarWrapper path={"/"}>Home</MenuSideBarWrapper>
                  <MenuSideBarWrapper path="/shop">Shop</MenuSideBarWrapper>
                  <MenuSideBarWrapper path="/categories">
                    Categories
                  </MenuSideBarWrapper>
                  <MenuSideBarWrapper path="/about">
                    About Us
                  </MenuSideBarWrapper>
                  <MenuSideBarWrapper path="/contact">
                    Contact
                  </MenuSideBarWrapper>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
