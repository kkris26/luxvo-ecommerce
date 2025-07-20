import { Drawer, DrawerContent, DrawerBody, DrawerHeader } from "@heroui/react";
import { Card, CardFooter, Image, Button } from "@heroui/react";
const CartSideBar = ({ isOpen, onOpenChange }) => {
  return (
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
            <DrawerHeader>
              <h2 className="font-bold">Cart Item</h2>
            </DrawerHeader>
            <DrawerBody>
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Card
                    isFooterBlurred
                    className="border-none w-fit"
                    radius="lg"
                    key={index}
                  >
                    <Image
                      alt="Woman listing to music"
                      className="object-cover"
                      height={200}
                      src="https://heroui.com/images/hero-card.jpeg"
                      width={200}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-white/80">Available soon.</p>
                      <Button
                        className="text-tiny text-white bg-black/20"
                        color="default"
                        radius="lg"
                        size="sm"
                        variant="flat"
                      >
                        Notify me
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartSideBar;
