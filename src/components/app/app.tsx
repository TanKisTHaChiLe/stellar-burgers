import { ConstructorPage } from '@pages';
import { Feed } from '@pages';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { NotFound404 } from '@pages';
import { ProtectedRoute } from '../protected-route';
import { Routes, Route } from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

const App = () => (
  <div className={styles.app}>
    <Routes>
      <Route path='/' element={<AppHeader />}>
        <Route index element={<ConstructorPage />} />
        <Route path='ingredients'>
          <Route path=':id' element={<IngredientDetails />} />
        </Route>
        <Route path='feed' element={<Feed />}>
          <Route path=':number' element={<OrderInfo />} />
        </Route>
        <Route path='login' element={<ProtectedRoute />}>
          <Route index element={<Login />} />
        </Route>
        <Route path='register' element={<ProtectedRoute />}>
          <Route index element={<Register />} />
        </Route>
        <Route path='forgot-password' element={<ProtectedRoute />}>
          <Route index element={<ForgotPassword />} />
        </Route>
        <Route path='reset-password' element={<ProtectedRoute />}>
          <Route index element={<ResetPassword />} />
        </Route>
        <Route path='profile' element={<ProtectedRoute />}>
          <Route path='profile'>
            <Route index element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />}>
              <Route path=':number' element={<OrderInfo />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
