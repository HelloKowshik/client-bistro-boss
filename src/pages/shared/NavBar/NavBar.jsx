import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCartPlus } from "react-icons/fa";
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';
import useAuth from '../../../hooks/useAuth';

const NavBar = () => {
    const {user, logOut} = useAuth();
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const handleLogOut = () => {
      logOut()
      .then(() =>{
        Swal.fire({
             position: "top-end",
             icon: "success",
             title: "Logged Out!",
             showConfirmButton: false,
             timer: 1500
        });
      });
    };
    const navItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Menu</Link></li>
        {
          user && isAdmin && <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
        }
        {
          user && !isAdmin && <li><Link to='/dashboard/userHome'>Dashboard</Link></li>
        }
        <li><Link to='/order'>Order</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
        <li><Link to='/dashboard/cart'>
          <button className="btn">
            <FaCartPlus/> <div className="badge badge-secondary">{cart.length}</div>
          </button>
        </Link></li>
        {
          user ? <><button onClick={handleLogOut} className="btn btn-active btn-ghost">Logout({user?.email})</button></> : <li><Link to='/login'>Login</Link></li>
        }
    </>
    return (
        <>
         <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {
            navItems
        }
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Bistro Boss</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {
        navItems
      }
    </ul>
  </div>
  <div className="navbar-end">
  </div>
</div>   
</>
    );
};

export default NavBar;
