import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useMenu from '../../../hooks/useMenu';
import orderBgImg from '../../../assets/shop/banner2.jpg';
import Cover from '../../shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Helmet } from 'react-helmet-async';
import OrderTab from '../OrderTab/OrderTab';
import 'react-tabs/style/react-tabs.css';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    // console.log(category);
    const [menuData] = useMenu();
    const dessertMenu = menuData.filter(item => item.category==='dessert');
    const saladMenu = menuData.filter(item => item.category==='salad');
    const pizzaMenu = menuData.filter(item => item.category==='pizza');
    const soupMenu = menuData.filter(item => item.category==='soup');
    const drinkMenu = menuData.filter(item => item.category==='drinks');

    return(
        <div>
            <Helmet>
                <title>Bistro | Order</title>
            </Helmet>
            <Cover img={orderBgImg} title='Order Food' />
            <div>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className='uppercase mt-10 mb-10 md:flex justify-center items-center'>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>   
                <TabPanel><OrderTab items={saladMenu}/></TabPanel>
                <TabPanel><OrderTab items={pizzaMenu}/></TabPanel>
                <TabPanel><OrderTab items={soupMenu}/></TabPanel>
                <TabPanel><OrderTab items={dessertMenu}/></TabPanel>
                <TabPanel><OrderTab items={drinkMenu}/></TabPanel>
            </Tabs>
            </div>
        </div>
    );
};

export default Order;
