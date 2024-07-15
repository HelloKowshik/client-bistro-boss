import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/Cover/Cover';
import menuBgImg from '../../../assets/menu/banner3.jpg';
import dessertBgImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaBgImg from '../../../assets/menu/pizza-bg.jpg';
import saladBgImg from '../../../assets/menu/salad-bg.jpg';
import soupBgImg from '../../../assets/menu/soup-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menuData] = useMenu();
    const dessertMenu = menuData.filter(item => item.category==='dessert');
    const saladMenu = menuData.filter(item => item.category==='salad');
    const pizzaMenu = menuData.filter(item => item.category==='pizza');
    const soupMenu = menuData.filter(item => item.category==='soup');
    const offeredMenu = menuData.filter(item => item.category==='offered');

    return (
        <div>
            <Helmet>
                <title>Bistro | Menu</title>
            </Helmet>
            <Cover img={menuBgImg} title='Our Menu'/> 
            <SectionTitle heading="Today's Offer" subHeading="Don't Miss"/>  
            <MenuCategory items={offeredMenu}/>       
            <MenuCategory items={dessertMenu} title='dessert' coverImg={dessertBgImg}/>       
            <MenuCategory items={pizzaMenu} title='pizza' coverImg={pizzaBgImg}/>       
            <MenuCategory items={saladMenu} title='salad' coverImg={saladBgImg}/>       
            <MenuCategory items={soupMenu} title='soup' coverImg={soupBgImg}/>       
        </div>
    );
};

export default Menu;
