import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaUtensils } from "react-icons/fa";
import usePublicAxios from '../../../hooks/usePublicAxios';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

const imageBBKey = import.meta.env.VITE_IMAGE_BB_KEY;
const apiURL = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;

const AddItems = () => {
    const axiosPublic = usePublicAxios();
    const axiosInstance = useAxios();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async(data) => {
        console.log(data);
        const imageFile = {image: data.image[0]};
        const res = await axiosPublic.post(apiURL, imageFile, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        });
        console.log({res: res.data});
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            };
            const menuRes = await axiosInstance.post('/menu', menuItem);
            console.log({MENU: menuRes.data});
            if(menuRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Item Added",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return(
        <div>
            <Helmet>
                <title>Bistro | Dashboard</title>
            </Helmet>
            <SectionTitle heading='Add an item' subHeading="What's New" />
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-2">
                        <label className='label'>
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input 
                            type="text" 
                            {...register("name", {required: true})}
                            className="input input-bordered w-full" />
                    </div>
                    <div className='flex gap-6'>
                        <div className="form-control w-full my-6">
                        <label className='label'>
                            <span className="label-text">Category</span>
                        </label>
                        <select defaultValue='default' {...register("category", {required: true})} className='select select-bordered w-full'>
                            <option disabled value='default'>Select A Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        <div className="form-control w-full my-6">
                        <label className='label'>
                            <span className="label-text">Price*</span>
                        </label>
                        <input 
                            type="number" 
                            {...register("price", {required: true})}
                            className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className='label'>
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea 
                            className="textarea textarea-bordered h-24"
                            {...register('recipe', {required: true})}></textarea>
                    </div>
                    <div className='form-control my-2'>
                        <input 
                            type="file" 
                            {...register('image', {required: true})}
                            className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <button className='btn'>
                        <FaUtensils /> Add Items
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
