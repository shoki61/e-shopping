import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Home, Login, SignUp, ResetPassword, Favorites, ProductDetail, Cart, Products } from 'pages';
import { AppNotification } from 'components';
import { Chat, Header, LoginForChat } from 'shared';
import { Profile } from 'models';

type Props = {
  profile: Profile;
};

const Navigation = ({ profile }: Props) => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      {profile?._id ? <Chat /> : <LoginForChat />}
      <AppNotification />
    </div>
  );
};

const mapStateToProps = ({ user: { profile } }: any) => ({ profile });

export default connect(mapStateToProps)(Navigation);
