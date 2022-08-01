import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';
import SignIn from 'views/pages/authentication/SignIn';
import ForgotPassword from 'views/pages/authentication/ForgotPassword';
import ResetPassword from 'views/pages/authentication/ResetPassword';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/Login')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <SignIn />
        },
        {
            path: '/login',
            element: <SignIn />
        },
        {
            path: '/forgotpassword',
            element: <ForgotPassword />
        },
        {
            path: '/resetpasword',
            element: <ResetPassword />
        }
    ]
};

export default LoginRoutes;
