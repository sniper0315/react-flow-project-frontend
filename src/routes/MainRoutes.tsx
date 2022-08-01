import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Offers from 'views/pages/offers';
import Team from 'views/pages/team';
import Clients from 'views/pages/clients';
import CLientDetails from 'views/pages/clients/CLientDetails';
import Messages from 'views/pages/messages';
import Settings from 'views/pages/settings';
import HelpCenter from 'views/pages/helpCenter';
import Tasks from 'views/pages/tasks';

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        },
        {
            path: '/offers',
            element: <Offers />
        },
        {
            path: '/team',
            element: <Team />
        },
        {
            path: '/clients',
            element: <Clients />
        },
        {
            path: '/clients/:idClient',
            element: <CLientDetails />
        },
        {
            path: '/messages',
            element: <Messages />
        },
        {
            path: '/settings',
            element: <Settings />
        },
        {
            path: '/help-center',
            element: <HelpCenter />
        },
        {
            path: '/tasks',
            element: <Tasks />
        }
    ]
};

export default MainRoutes;
