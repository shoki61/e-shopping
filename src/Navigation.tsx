import { Routes, Route } from 'react-router-dom';

import { Home, Login, SignUp, ResetPassword } from 'pages';
import { AppNotification, Space } from 'components';
import { Header } from 'shared';

const Navigation = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <AppNotification />
    </div>
  );
};

export default Navigation;
