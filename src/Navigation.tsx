import { Routes, Route } from 'react-router-dom';

import { Home, Login } from 'pages';
import { Header } from 'shared';

const Navigation = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route caseSensitive path="/" element={<Login />} />
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
};

export default Navigation;
