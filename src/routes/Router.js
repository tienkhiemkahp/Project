import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const LichSuDangKy = Loadable(lazy(() => import('../views/lich-su-dang-ky/LichSuDangKy')));
const DichVu = Loadable(lazy(() => import('../views/dich-vu/DichVu')));
const TaiKhoan = Loadable(lazy(() => import('../views/tai-khoan/TaiKhoan')));
const GoiCuoc = Loadable(lazy(() => import('../views/goi-cuoc/GoiCuoc')));
const ChatPage = Loadable(lazy(() => import('../views/chat-page/ChatPage')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to={'/dich-vu'} /> },
      { path: '/lich-su-dang-ky', exact: true, element: <LichSuDangKy /> },
      { path: '/dich-vu', exact: true, element: <DichVu /> },
      { path: '/tai-khoan', exact: true, element: <TaiKhoan /> },
      { path: '/goi-cuoc', exact: true, element: <GoiCuoc /> },
      { path: '/chat-page', exact: true, element: <ChatPage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
