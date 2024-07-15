import { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
        .then(res => {
          Swal.fire({
             position: "top-end",
             icon: "success",
             title: "User Logged In!",
             showConfirmButton: false,
             timer: 1500
        });
          const user = res.user;
          // console.log(user);
          navigate(from, {replace: true});
          form.reset();
        })
    };

    const handleValidateCaptcha = (e) => {
        const captchaValue = e.target.value;
        if(validateCaptcha(captchaValue)){
            setDisabled(false);
        }else{
            setDisabled(true);
        }
    };

    return(
        <div>
            <Helmet>
                <title>Bistro | Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center md:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in.
      </p>
    </div>
    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <LoadCanvasTemplate />
          </label>
          <input type="text" name="captcha" onBlur={handleValidateCaptcha} placeholder='Enter Captcha' className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <input type='submit' className="btn btn-primary" disabled={disabled} value='Login' />
        </div>
      </form>
      <p className='px-6'><small>New Here? Create an <Link className='text-orange-600' to='/signup'>Account</Link></small></p>
      <SocialLogin />
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;
