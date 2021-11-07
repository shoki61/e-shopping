import { Routes, Route } from 'react-router-dom';

import { Home } from 'pages';

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Navigation;
