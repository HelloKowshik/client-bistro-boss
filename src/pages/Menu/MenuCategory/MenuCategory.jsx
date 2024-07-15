import MenuItem from '../../shared/MenuItem/MenuItem';
import Cover from '../../shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({items, title='Our Menu', coverImg}) => {
    return(
        <div className='mb-4 pt-8'>
        {
            title && <Cover img={coverImg} title={title}/> 
        }
            <div className='grid md:grid-cols-2 gap-10 my-16'>
        {
            items.map(item=><MenuItem key={item._id} menu={item}/>)
        }
        </div>
        <div className='md:flex justify-center items-center'>
        <Link to={`/order/${title}`}>
            <button className='btn btn-outline border-0 border-b-4 mt-4 bg-slate-100 border-orange-400'>Order Now</button>
        </Link>
        </div>
        </div>
    );
};

export default MenuCategory;
