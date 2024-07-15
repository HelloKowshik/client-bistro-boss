import { FaGoogle } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import usePublicAxios from '../../hooks/usePublicAxios';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = usePublicAxios();
    const navigate = useNavigate();

    const handleGoogleLogIn = () => {
        googleSignIn()
        .then(result => {
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            };
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
        })
        .catch(err => console.log(err.message));
    };

    return(
        <div>
        <div className="divider"></div>
            <div className='ml-12 mb-5'>
                <button className="btn" onClick={handleGoogleLogIn}>
                    Login With <FaGoogle className='mr-4'/>
                </button>
            </div>
        </div>  
    );
};
export default SocialLogin;
