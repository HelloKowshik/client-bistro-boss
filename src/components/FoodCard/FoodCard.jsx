import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useCart from '../../hooks/useCart';

const FoodCard = ({item}) => {
    const {_id, name, image, price, recipe} = item;
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const [, refetch] = useCart();

    const handleAddToCart = item => {
        if(user && user?.email){
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            };
            axiosInstance.post('/carts', cartItem)
            .then(res => {
                if(res.data.insertedId){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Order Sent!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        }else{
            Swal.fire("Please Login to Order");
            navigate('/login', {state:{from:location}});
        }
    };

    return(
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img src={image} />
            </figure>
            <p className='absolute right-0 mt-4 mr-4 pr-4 rounded bg-slate-900 text-white'>${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-orange-400" onClick={() => handleAddToCart(item)}>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
