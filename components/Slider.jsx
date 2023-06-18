import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';

export default function Slider() {
    return (
        <Carousel slide={false}>
            <Carousel.Item >
                <Image
                    width={1600}
                    height={600}
                    className="d-block w-100"
                    src="/images/carusel/1.png"
                    alt="First slide"
                    priority
                />
                <Carousel.Caption>
                    <h5>Discover Your Dream Getaway</h5>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    width={1600}
                    height={600}
                    className="d-block w-100"
                    src="/images/carusel/2.png"
                    alt="Second slide"
                    priority
                />

                <Carousel.Caption>
                    <h5>Indulge in Coastal Elegance</h5>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    width={1600}
                    height={600}
                    className="d-block w-100"
                    src="/images/carusel/3.png"
                    alt="Third slide"
                    priority
                />
                <Carousel.Caption>
                    <h5>Book Now and Experience Exceptional Hospitality</h5>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

