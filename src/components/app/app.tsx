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
import {
  Routes,
  Route,
  useLocation,
  useMatch,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getState, fetchIngredients } from '../../services/ingredientsSlice';
import '../../index.css';
import styles from './app.module.css';
import { zeroPadLeft } from '../../utils/utils';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { checkUserAuth } from '../../services/userSlice';

function App() {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const matchFeedId = useMatch('/feed/:number')?.params.number || '';
  const zeroPadMatchFeedId = zeroPadLeft(matchFeedId);
  const matchProfileOrdersId = useMatch('/profile/orders/:number')?.params
    .number;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ingredients, isLoading } = useSelector(getState);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
    // console.log('app');
  }, []);

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />

        <Route path='/ingredients'>
          <Route path=':id' element={<IngredientDetails />} />
        </Route>

        <Route path='/feed' element={<Feed />}>
          <Route path=':number' element={<OrderInfo />} />
        </Route>

        <Route path='/login' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<Login />} />
        </Route>

        <Route path='/register' element={<ProtectedRoute onlyUnAuth />}>
          <Route index element={<Register />} />
        </Route>

        <Route path='/forgot-password' element={<ProtectedRoute />}>
          <Route index element={<ForgotPassword />} />
        </Route>

        <Route path='/reset-password' element={<ProtectedRoute />}>
          <Route index element={<ResetPassword />} />
        </Route>

        <Route path='/profile' element={<ProtectedRoute />}>
          <Route path='/profile'>
            <Route index element={<Profile />} />
            <Route path='orders' element={<ProfileOrders />}>
              <Route path=':number' element={<OrderInfo />} />
            </Route>
          </Route>
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={onCloseModal} title={`${zeroPadMatchFeedId}`}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={onCloseModal} title='Детали ингридиента'>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal onClose={onCloseModal} title={`${matchProfileOrdersId}`}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
