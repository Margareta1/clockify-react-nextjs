import "../styles/global.css";
import { CustomLayout } from "@/app/layout/CustomLayout";
import { PrimeReactProvider } from "primereact/api";

const App = ({ Component, pageProps }) => {
  return (
    <PrimeReactProvider>
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    </PrimeReactProvider>
  );
};

export default App;
