import { Routes, Route } from 'react-router-dom';

import { Home, Login, SignUp } from 'pages';
import { Header } from 'shared';

const Navigation = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Navigation;
