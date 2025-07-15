import { Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import AuthForm from "./AuthForm";

export default function SideMenu({ isOpen, onOpenChange }) {
  return (
    <>
      <Drawer
        motionProps={{
          variants: {
            enter: { opacity: 1, x: 0, transition: { duration: 0.3 } },
            exit: { opacity: 0, x: 40, transition: { duration: 0.3 } },
          },
          initial: "exit",
          animate: "enter",
          exit: "exit",
        }}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerBody>
                <div className="flex flex-col gap-8 justify-center items-center h-full">
                  <AuthForm />
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
