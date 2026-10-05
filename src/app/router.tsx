import { createBrowserRouter } from 'react-router';
import Layout from '../shared/components/Layout';
import MedicineListPage from '../pages/MedicineListPage';
import MedicineFormPage from '../pages/MedicineFormPage';
import DonationListPage from '../pages/DonationListPage';
import ShelterInfoPage from '../pages/ShelterInfoPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MedicineListPage /> },
      { path: 'add', element: <MedicineFormPage /> },
      { path: 'edit/:id', element: <MedicineFormPage /> },
      { path: 'donation', element: <DonationListPage /> },
      { path: 'shelter', element: <ShelterInfoPage /> },
    ],
  },
]);