import { CustomNavbar } from "../components/Navbar/Navbar";

const CustomLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <CustomNavbar />
      {children}
    </>
  );
};

export { CustomLayout };
