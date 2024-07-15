import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { MdDelete } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AllUsers = () => {
    const axiosInstance = useAxios();
    const { refetch, data: users = [] } = useQuery({
        queryKey:['users'],
        queryFn: async () => {
            const result = await axiosInstance.get('/users');
            return result.data;
        }
    });

    const handleDeleteUser = user => {
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
                axiosInstance.delete(`/users/${user._id}`)
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

    const handleMakeAdmin = user => {
        axiosInstance.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    };


    return(
        <div>
            <Helmet>
                <title>Bistro | Users</title>
            </Helmet>
            <div className='flex justify-evenly'>
                <h2 className='text-3xl'>All Users</h2>
                <h2 className='text-3xl'>Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                    users.map((user, i)=> <tr key={user._id}>
                    <th>{i + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        {
                            user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn btn-lg bg-orange-500 text-white text-2xl"><FaRegUser/>
                        </button>
                        }
                    </td>
                    <td><button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-lg text-red-600"><MdDelete/></button></td>
                  </tr>)
                }
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default AllUsers;
