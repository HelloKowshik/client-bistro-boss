import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './featuredItem.css';

const FeaturedItem = () => {
    return(
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle 
            heading='Featured Items'
            subHeading='check it out'
            />
            <div className='md:flex justify-center items-center pb-20 pt-12 px-36 bg-slate-500 bg-opacity-60'>
                <div>
                    <img src={featuredImg} />
                </div>
                <div className='md:ml-10'>
                    <p>June 30, 2024</p>
                    <p className='uppercase'>where can i get some?</p>

                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nisi doloremque excepturi sint, mollitia tenetur quia consequatur unde culpa, veniam recusandae, illum architecto qui similique reprehenderit dignissimos aliquam? Error ab, magnam ea deleniti voluptatum mollitia vero similique atque, fugiat minus. Illum, accusantium impedit id dicta inventore dignissimos doloribus nulla quaerat.</p>
                    <button className='btn btn-outline border-0 border-b-4 mt-4'>Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedItem;
