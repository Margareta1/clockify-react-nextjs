import '../styles/global.css'
import { CustomLayout } from '@/app/layout/CustomLayout';

const App = ({ Component, pageProps }) => {
  return <CustomLayout><Component {...pageProps} /></CustomLayout>;
};

export default App;