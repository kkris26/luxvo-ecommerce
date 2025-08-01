import { Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import AuthForm from "../AuthForm";
import { useSearchParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function RightSideBar({ isOpen, onOpenChange }) {
  const [searchParams, setSearchParams] = useSearchParams("");

  const { userLogin } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSearchParams(`?auth=${isSignUp ? "signup" : "signin"}`);
    } else {
      setSearchParams("");
    }
  }, [isOpen, isSignUp]);

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (!userLogin) {
      if (auth === "signin") {
        onOpenChange(true);
      } else if (auth === "signup") {
        setIsSignUp(true);
        onOpenChange(true);
      } else {
        onOpenChange(false);
      }
    }
  }, [searchParams, userLogin]);

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
        classNames={{
          base: "sm:data-[placement=right]:m-2 rounded-none sm:rounded-md",
        }}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onCLose) => (
            <>
              <DrawerBody>
                <div className="flex w-full flex-col gap-3 justify-center items-center h-full">
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
