import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';

export default function Slider() {
    return (
        <Carousel slide={false}>
            <Carousel.Item>
                <Image
                    width={1400}
                    height={800}
                    className="d-block w-100"
                    src="/images/carusel/caruselOne.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    width={1400}
                    height={800}
                    className="d-block w-100"
                    src="/images/carusel/caruselTwo.jpeg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    width={1400}
                    height={800}
                    className="d-block w-100"
                    src="/images/carusel/caruselTree.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

