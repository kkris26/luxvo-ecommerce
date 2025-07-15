import NavbarHeader from "./components/Navbar/NavbarHeader";

const App = () => {
  return (
    <>
      <NavbarHeader />
      <div className="flex w-full h-screen items-center justify-center">
        <h1 className="text-default-600 ">Hello World!</h1>
      </div>
    </>
  );
};

export default App;
