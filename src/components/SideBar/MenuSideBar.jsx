import {
  Drawer,
  DrawerContent,
  DrawerBody,
  Button,
  Divider,
} from "@heroui/react";
import MenuSideBarWrapper from "../Wrapper/MenuSideBarWrapper";

import { TfiClose } from "react-icons/tfi";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
const menuItem = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const socialButtons = [
  {
    icon: <FaInstagram />,
    ariaLabel: "Instagram",
    link: "https://www.instagram.com",
  },
  {
    icon: <FaTiktok />,
    ariaLabel: "TikTok",
    link: "https://www.tiktok.com",
  },
  {
    icon: <FaFacebook />,
    ariaLabel: "Facebook",
    link: "https://www.facebook.com",
  },
  {
    icon: <FaYoutube />,
    ariaLabel: "YouTube",
    link: "https://www.youtube.com",
  },
];
const contactInfo = [
  {
    type: "email",
    label: "info@luxvo.com",
    href: "mailto:info@luxvo.com",
  },
  {
    type: "phone",
    label: "+99 7865 677 53",
    href: "tel:+99786567753",
  },
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
              transition: { duration: 0.3, ease: "easeOut" },
            },
            exit: {
              opacity: 0,
              x: -100,
              transition: { duration: 0.3, ease: "easeIn" },
            },
          },
          initial: "exit",
          animate: "enter",
          exit: "exit",
        }}
        classNames={{
          base: "sm:data-[placement=right]:m-2 rounded-none sm:rounded-md",
        }}
        backdrop="blur"
        isOpen={isOpen}
        size="sm"
        placement={"left"}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerBody className="p-8 flex flex-col justify-between">
                <div>
                  <div
                    onClick={onClose}
                    className="flex justify-start items-center gap-2 cursor-pointer w-max"
                  >
                    <TfiClose className="text-sm " />
                    <p className="font-extralight text-md tracking-wider">
                      close
                    </p>
                  </div>
                  <Divider className="my-6 bg-divider/50" />
                  <div className="flex flex-col gap-4 w-full">
                    {menuItem.map((menu) => (
                      <MenuSideBarWrapper
                        key={menu.name}
                        onClick={onClose}
                        path={menu.path}
                      >
                        {menu.name}
                      </MenuSideBarWrapper>
                    ))}
                  </div>
                  <Divider className="my-8 bg-divider/50" />
                  <div>
                    <div className="flex gap-4 mt-0 ">
                      {socialButtons.map((social) => (
                        <a
                          href={social.link}
                          target="_blank"
                          key={social.ariaLabel}
                        >
                          <Button
                            isIconOnly
                            aria-label={social.ariaLabel}
                            color="default"
                            radius="full"
                            size="sm"
                          >
                            {social.icon}
                          </Button>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 font-light">
                  <h3 className="text-lg">Get in touch</h3>
                  <div className="text-sm tracking-wider mt-2 flex gap-5 ">
                    {contactInfo.map((item, i) => (
                      <a
                        key={i}
                        href={item.href}
                        className="underline underline-offset-2 block text-sm "
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
