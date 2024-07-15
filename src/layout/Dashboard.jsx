import { Outlet, NavLink } from 'react-router-dom';
import { FaCartPlus, FaListUl, FaUtensils } from "react-icons/fa";
import { IoIosHome, IoMdMenu } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { MdPayments, MdRateReview, MdBookmark, MdEmail } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    return(
        <div className='flex'>
            <div className='w-64 min-h-screen bg-orange-400'>
                <ul className='menu p-4'>
                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/adminHome'><IoIosHome/> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/addItem'><FaUtensils /> Add Item</NavLink></li>
                            <li><NavLink to='/dashboard/manageItems'><FaListUl/> Manage Items</NavLink></li>
                            <li><NavLink to='/dashboard/bookings'><MdBookmark/> Manage Bookings</NavLink></li>
                            <li><NavLink to='/dashboard/users'><FaUsersLine/> All Users</NavLink></li>
                        </> :
                        <>
                            <li><NavLink to='/dashboard/userHome'><IoIosHome/> User Home</NavLink></li>
                            <li><NavLink to='/dashboard/reservation'><SlCalender/> Reservation</NavLink></li>
                            <li><NavLink to='/dashboard/paymentHistory'><MdPayments/> Payment History</NavLink></li>
                            <li><NavLink to='/dashboard/cart'><FaCartPlus/> My Cart ({cart.length})</NavLink></li>
                            <li><NavLink to='/dashboard/review'><MdRateReview/> Add Review</NavLink></li>
                            <li><NavLink to='/dashboard/booking'><MdBookmark/> My Bookings</NavLink></li>
                        </>
                    }
                    <div className='divider'></div>
                    <li><NavLink to='/'><IoIosHome/> Home</NavLink></li>
                    <li><NavLink to='/menu'><IoMdMenu/> Menu</NavLink></li>
                    <li><NavLink to='/contact'><MdEmail /> Contact</NavLink></li>
                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
