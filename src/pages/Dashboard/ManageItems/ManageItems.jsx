import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { Helmet } from 'react-helmet-async';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menuData, loading, refetch] = useMenu();
    const axiosInstance = useAxios();

    const handleDeleteItem = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        })
        .then(async(result) => {
            if (result.isConfirmed) {
                console.log(item._id);
                const res = await axiosInstance.delete(`/menu/${item._id}`);
                if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Item deleted!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };
    const handleUpdateItem = item => {};

    return(
        <div>
            <Helmet>
                <title>Bistro | Dashboard</title>
            </Helmet>
            <SectionTitle heading='Manage All Items' subHeading="Hurry Up!" />
            <div className='flex justify-evenly'>
                <h2 className='text-3xl'>Total Items: {menuData.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='bg-base-200'>
                        <tr>
                            <th>#</th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menuData.map((item, i) => <tr key={item._id}>
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
                                <td>${item.price}</td>
                                <th>
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button className="btn btn-sm bg-orange-500 text-white"
                                        onClick={() => handleUpdateItem(item)}>
                                        <FaEdit />
                                        </button>
                                    </Link>
                                </th>
                                <th>
                                    <button 
                                        className="btn btn-sm bg-red-500 text-white"
                                        onClick={() => handleDeleteItem(item)}
                                    >
                                        <MdDelete /></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;
