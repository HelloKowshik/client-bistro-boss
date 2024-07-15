import useCart from '../../../hooks/useCart';
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((acc, cur) => acc + cur.price, 0);
    const axiosInstance = useAxios();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        })
        .then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/carts/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            icon: "success"
                        });
                    }
                });
            }
        });
};

    return(
        <div>
            <div className='flex justify-evenly mb-8'>
                <h2 className='text-4xl'>Items: {cart.length}</h2>
                <h2 className='text-4xl'>Price: ${totalPrice}</h2>
                {
                    cart.length ? <Link to='/dashboard/payment'>
                    <button className='btn btn-primary'>Pay</button>
                </Link>: <button disabled className='btn btn-primary'>Pay</button>
                }
            </div>
            <div className="overflow-x-auto">
  <table className="table">
    <thead className='bg-base-200'>
      <tr>
        <th>#</th>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        cart.map((item, i) => <tr key={item._id}>
        <td>{i + 1}</td>    
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image} />
              </div>
            </div>
          </div>
        </td>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <th>
          <button className="btn btn-ghost btn-lg text-red-600" onClick={() => handleDelete(item._id)}><MdDelete/></button>
        </th>
      </tr>)
      }
    </tbody>
  </table>
</div>
</div>
    );
};

export default Cart;
