import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import classes from "./Slider.module.css";

export default function Slider() {
    const items = [
        {
            img: "/images/carusel/1.jpg",
            caption: "Discover Your Dream Getaway",
        },
        {
            img: "/images/carusel/2.jpg",
            caption: "Indulge in Coastal Elegance",
        },
        {
            img: "/images/carusel/3.jpg",
            caption: "Book Now and Experience Exceptional Hospitality",
        },
    ]
    return (
        <Carousel slide={false}>
            {items.map((obj, idx) => (
                <Carousel.Item key={idx} className='container'>
                    <div className={classes.image_wrapper}>
                        <Image
                            src={obj.img}
                            alt="First slide"

                            fill={true}
                            sizes='(max-width: 768px) 100vw, 700px'
                            quality={100}
                            priority
                        />
                    </div>
                    <Carousel.Caption>
                        <h5>{obj.caption}</h5>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}

        </Carousel>
    );
}

