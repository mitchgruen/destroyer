import App from '../App';
import Login from './login';
import Register from './register';
import ForgotPassword from './forgotpassword';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/app" element={<App />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
