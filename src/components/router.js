import App from '../App';
import Login from './login';
import Register from './register';
import ForgotPassword from './forgotpassword';
import Welcome from './welcome';
import Thanks from './thanks';
import MobileIntervention from './mobileIntervention'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

export default function Router() {
  const renderContent = () => {
    if (isMobile) {
      return (
        <MobileIntervention/>
      );
    } else {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/app" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/thanks" element={<Thanks />} />
          </Routes>
        </BrowserRouter>
      );
    }
  };

  return renderContent();
}
