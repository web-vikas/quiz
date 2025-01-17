/**
 * @version 0.0.1
 * Updated On : October 7, 2024
 * This is the navigation file that takes care of all router
 */

import { Button, Image } from 'antd';
import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { siteLogoDark } from 'src/assets';
import { ErrorBoundary, Loader } from 'src/components';
import * as Pages from 'src/pages';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" errorElement={ErrorBoundary}>
          <Route path="/dashboard/" element={<Pages.Dashboard />} />
          <Route path="/dashboard/quiz" element={<Pages.CreateQuiz />} />
          <Route index element={<Pages.Login />} />
          {/* <Route path="/forget-password" element={<Pages.ForgetPassword />} /> */}
          {/* ALL RESTRICTED ROUTES */}
          <Route element={<RequireAuth />}>
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center text-center flex-col">
      <Image src={siteLogoDark} className="w-28" preview={false} />
      <div>
        <h1>
          <span className="font-extrabold text-primary text-[10rem] md:text-[15rem] lg:text-[20rem]">
            404
          </span>
          <p className="text-text-secondary text-xl text-center">Have You Lost Somewhere : (</p>
        </h1>
        <div>
          <Button type="primary" size="large" className="mt-5">
            <Link to={'/'}>Go Back To Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Forbidden = () => {
  return (
    <div className="flex min-h-screen items-center justify-center text-center flex-col">
      <Image src={siteLogoDark} className="w-28" preview={false} />
      <div>
        <h1>
          <span className="font-extrabold text-primary text-[10rem] md:text-[15rem] lg:text-[20rem]">
            403
          </span>
          <p className="text-text-secondary text-xl text-center">
            Forbidden. You don't have access to this page.
          </p>
        </h1>
        <div>
          <Button type="primary" size="large" className="mt-5">
            <Link to={'/'}>Go Back To Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const RequireAuth = () => {
  const location = useLocation();

  const { userSession } = useSelector((state) => state.session);

  if (userSession == null)
    return (
      <div className="preloader">
        <Loader />
      </div>
    );
  else if (userSession == '') return <Navigate to="/" state={{ from: location }} />;
  else if (userSession) {
    return <Outlet />;
  } else return <Navigate to="/unauthorized" state={{ from: location }} />;
};
export default Navigation;
