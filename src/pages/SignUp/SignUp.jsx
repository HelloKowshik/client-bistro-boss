import { AuthContext } from '../../providers/AuthProvider';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import usePublicAxios from '../../hooks/usePublicAxios';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {
    const axiosPublic = usePublicAxios();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        createUser(data.email, data.password)
        .then(res =>{
            const loggedUser = res.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(()=>{
              const userInfo = {name: data.name, email: data.email};
              axiosPublic.post('/users', userInfo)
              .then(res => {
                if(res.data.insertedId){
                  Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Sign Up Successfull!",
                      showConfirmButton: false,
                      timer: 1500
                  });
                  navigate('/');
                  reset();
                }
              });
            })
            .catch((err) => console.log(err.message));
        });
    };
    return(
        <div>
            <Helmet>
                <title>Bistro | SignUp</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center md:w-1/2 lg:text-left">
      <h1 className="text-5xl font-bold">SignUp now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in.
      </p>
    </div>
    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" {...register("name", { required: true })} className="input input-bordered"/>
          {errors.name && <span className='text-red-600'>Name is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" {...register("email", { required: true })} className="input input-bordered" required />
          {errors.email && <span className='text-red-600'>Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" name="photoURL" {...register("photoURL", { required: true })} className="input input-bordered" required />
          {errors.photoURL && <span className='text-red-600'>Email is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" {...register("password", { required: true, minLength: 6, maxLength:10 })} className="input input-bordered" required />
          {errors.password && <span className='text-red-600'>Password is required & minimum 6 character</span>}
        </div>
        <div className="form-control mt-6">
          <input type='submit' className="btn btn-primary" value='Sign Up' />
        </div>
      </form>
      <p className='px-6'><small>Have an account? <Link className='text-orange-600' to='/login'>Login</Link></small></p>
      <SocialLogin />
    </div>
  </div>
</div>
    </div>
    );
};

export default SignUp;
