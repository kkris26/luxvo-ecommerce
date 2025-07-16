import { Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import AuthForm from "../AuthForm";
import { useState } from "react";

export default function RightSideBar({ isOpen, onOpenChange }) {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <>
      <Drawer
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            },
            exit: {
              opacity: 0,
              x: 100,
              transition: { duration: 0.3, ease: "easeInOut" },
            },
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
          {(onCLose) => (
            <>
              <DrawerBody>
                <div className="flex flex-col gap-8 justify-center items-center h-full">
                  <AuthForm
                    close={onCLose}
                    isSignUp={isSignUp}
                    setIsSignUp={setIsSignUp}
                  />
                </div>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
