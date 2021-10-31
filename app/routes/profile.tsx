import { Outlet } from 'react-router-dom';
import MainLayout from '~/layouts/Main';

export default function Profile() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
