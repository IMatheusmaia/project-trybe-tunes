import { Outlet } from 'react-router-dom';
import Header from '../../components/Heander';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
