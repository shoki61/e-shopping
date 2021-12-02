import { Routes, Route } from 'react-router-dom';

import { Home, Login, SignUp, ResetPassword } from 'pages';
import { AppNotification } from 'components';
import { Chat, Header, LoginForChat } from 'shared';

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
      <Chat />
      <LoginForChat />
      <AppNotification />
    </div>
  );
};

export default Navigation;
