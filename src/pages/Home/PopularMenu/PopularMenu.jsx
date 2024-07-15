import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menuData] = useMenu();
    const popularMenue = menuData.filter(item => item.category==='popular');

    return (
        <section className='mb-12'>
            <SectionTitle heading='From Our Menu'
                subHeading='Popular Items'
            />
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popularMenue.map(menu => <MenuItem
                        key={menu._id}
                        menu={menu}
                        />)
                }
            </div>
            <div className='flex justify-center items-center'>
                <button className='btn btn-outline border-0 border-b-4 mt-4'>View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;
