import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import Home from '../pages/Home/Home/Home';
import Menu from '../pages/Menu/Menu/Menu';
import Order from '../pages/Order/Order/Order';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import Dashboard from '../layout/Dashboard';
import Cart from '../pages/Dashboard/Cart/Cart';
import AllUsers from '../pages/Dashboard/AllUsers/AllUsers';
import AddItems from '../pages/Dashboard/AddItems/AddItems';
import ManageItems from '../pages/Dashboard/ManageItems/ManageItems';
import UpdateItem from '../pages/Dashboard/UpdateItem/UpdateItem'
import Payment from '../pages/Dashboard/Payment/Payment';
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory';
import AdminHome from '../pages/Dashboard/AdminHome/AdminHome';
import UserHome from '../pages/Dashboard/UserHome/UserHome';

export const routes = createBrowserRouter([
{
    path:'/',
    element: <Main />,
    children:[
    {
        path:'/',
        element: <Home />
    },
    {
        path: '/menu',
        element: <Menu />
    },
    {
        path: '/order/:category',
        element: <Order />
    },
    {
        path: '/order',
        element: <Order />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUp />
    }
    ]
},
{
    path:'/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children:[
    {
        path: 'userHome',
        element: <UserHome />
    },
    {
        path: 'adminHome',
        element: <AdminRoute><AdminHome /></AdminRoute>
    },    
    {
        path: 'cart',
        element: <PrivateRoute><Cart /></PrivateRoute>
    },
    {
        path: 'payment',
        element: <Payment />
    },
    {
        path:'paymentHistory',
        element: <PaymentHistory />
    },
    {
        path: 'addItem',
        element: <AdminRoute><AddItems /></AdminRoute>
    },
    {
        path: 'manageItems',
        element: <AdminRoute><ManageItems /></AdminRoute>
    },
    {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem /></AdminRoute>,
        loader: ({params}) => fetch(`https://server-bistro-boss.vercel.app/menu/${params.id}`)
    },
    {
        path: 'users',
        element: <AdminRoute><AllUsers /></AdminRoute>
    }
    ]
}
]);
