import { CustomNavbar } from "../components";

interface Props {
  children: Readonly<{ children: React.ReactNode}>;
}
const CustomLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <CustomNavbar />
      {children}
    </>
  );
};

export { CustomLayout };
