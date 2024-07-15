import { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import 'swiper/css';
import 'swiper/css/navigation';


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://server-bistro-boss.vercel.app/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
        .catch(err => console.log(err));
    }, []);

    return(
        <section className='my-20'>
            <SectionTitle
            heading='Testimonials'
            subHeading='What Our Client Say'
             />
             <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
            reviews.map(review =><SwiperSlide key={review._id}>
                <div className='my-16 mx-24 flex flex-col items-center'>
                 <Rating
                    style={{ maxWidth: 180 }}
                    value={review.rating}
                    readOnly
                    />
                    <p className='py-8'>{review.details}</p>
                    <h3 className='text-2xl text-orange-400'>{review.name}</h3>
                </div>
            </SwiperSlide>)
        }
      </Swiper>
        </section>
    );
};

export default Testimonials;
