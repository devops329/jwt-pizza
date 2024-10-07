import React from 'react';
import { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from '../views/home';
import About from '../views/about';
import Register from '../views/register';
import Login from '../views/login';
import Logout from '../views/logout';
import Menu from '../views/menu';
import Delivery from '../views/delivery';
import FranchiseDashboard from '../views/franchiseDashboard';
import History from '../views/history';
import AdminDashboard from '../views/adminDashboard';
import DinerDashboard from '../views/dinerDashboard';
import CreateStore from '../views/createStore';
import CreateFranchise from '../views/createFranchise';
import CloseFranchise from '../views/closeFranchise';
import CloseStore from '../views/closeStore';
import Payment from '../views/payment';
import NotFound from '../views/notFound';
import Docs from '../views/docs';
import Breadcrumb from '../components/breadcrumb';
import { pizzaService } from '../service/service';
import { Role, User } from '../service/pizzaService';
import 'preline/preline';

declare global {
  interface Window {
    HSStaticMethods: any;
  }
}

export default function App() {
  const [user, setUser] = React.useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const user = await pizzaService.getUser();
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
    window.scrollTo(0, 0);
  }, [location.pathname]);

  function loggedIn() {
    return !!user;
  }
  function loggedOut() {
    return !loggedIn();
  }
  function isAdmin() {
    return Role.isRole(user, Role.Admin);
  }
  function isNotAdmin() {
    return !isAdmin();
  }

  const navItems = [
    { title: 'Home', to: '/', component: <Home />, display: [] },
    { title: 'Diner', to: '/diner-dashboard', component: <DinerDashboard user={user} />, display: [] },
    { title: 'Order', to: '/menu', component: <Menu />, display: ['nav'] },
    {
      title: 'Franchise',
      to: '/franchise-dashboard',
      component: <FranchiseDashboard user={user} />,
      constraints: [isNotAdmin],
      display: ['nav', 'footer'],
    },
    { title: 'About', to: '/about', component: <About />, display: ['footer'] },
    { title: 'History', to: '/history', component: <History />, display: ['footer'] },
    { title: 'Admin', to: '/admin-dashboard', component: <AdminDashboard user={user} />, constraints: [isAdmin], display: ['nav'] },
    { title: 'Create franchise', to: '/:subPath?/create-franchise', component: <CreateFranchise />, display: [] },
    { title: 'Close franchise', to: '/:subPath?/close-franchise', component: <CloseFranchise />, display: [] },
    { title: 'Create store', to: '/:subPath?/create-store', component: <CreateStore />, display: [] },
    { title: 'Close store', to: '/:subPath?/close-store', component: <CloseStore />, display: [] },
    { title: 'Payment', to: '/payment', component: <Payment />, display: [] },
    { title: 'Delivery', to: '/delivery', component: <Delivery />, display: [] },
    { title: 'Login', to: '/:subPath?/login', component: <Login setUser={setUser} />, constraints: [loggedOut], display: ['nav'] },
    { title: 'Register', to: '/:subPath?/register', component: <Register setUser={setUser} />, constraints: [loggedOut], display: ['nav'] },
    { title: 'Logout', to: '/:subPath?/logout', component: <Logout setUser={setUser} />, constraints: [loggedIn], display: ['nav'] },
    { title: 'Docs', to: '/docs/:docType?', component: <Docs />, display: [] },
    { title: 'Opps', to: '*', component: <NotFound />, display: [] },
  ];

  return (
    <div className="bg-gray-800">
      <Header user={user} navItems={navItems} />
      <Breadcrumb location={location.pathname.replace('/', '')} />

      <main className="size-full">
        <Routes>
          {navItems.map((item) => (
            <Route key={item.title} path={item.to} element={item.component} />
          ))}
        </Routes>
      </main>

      <Footer navItems={navItems} />
    </div>
  );
}
