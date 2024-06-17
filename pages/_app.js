import { PrimeReactProvider } from "primereact/api";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CustomLayout } from "@/app/layout";
import { auth } from "@/app/configurations";
import "../app/styles/global.css";

const App = ({ Component, pageProps }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(()=>{
    if(!user){
      router.push('/');
    }
  }, [user])
  
  return (
    <PrimeReactProvider>
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    </PrimeReactProvider>
  );
};

export default App;
