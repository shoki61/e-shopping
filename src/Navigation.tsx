import { Routes, Route } from 'react-router-dom';

import { Home, Login } from 'pages';
import { Header } from 'shared';

const Navigation = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Navigation;
