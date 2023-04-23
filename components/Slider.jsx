import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';

export default function Slider() {
    return (
        <Carousel slide={false}>
            <Carousel.Item> 
                <Image
                    width={1200}
                    height={600}
                    className="d-block w-100"
                    src="/images/carusel/1.png"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h5>First</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    width={1200}
                    height={600}
                    className="d-block w-100"
                    src="/images/carusel/2.png"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h5>Second</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    width={1200}
                    height={600}
                    className="d-block w-100"
                    src="/images/carusel/3.png"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h5>Third</h5>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

