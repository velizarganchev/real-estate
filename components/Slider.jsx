import { Carousel, CarouselItem } from "react-bootstrap"
import Image from "next/image"

export default function Slider() {
    return (
        <div>
            <Carousel controls={false} fade={true} interval={2000}>
                <CarouselItem>
                    <Image className="d-block w-100 rounded-3" src='/images/carusel/real-estate1.jpg' alt="Name" width={3000} height={350} />
                </CarouselItem>
                <CarouselItem>
                    <Image className="d-block w-100 rounded-3" src='/images/carusel/real-estate2.jpg' alt="Name" width={3000} height={350} />
                </CarouselItem>
                <CarouselItem>
                    <Image className="d-block w-100 rounded-3" src='/images/carusel/real-estate3.jpg' alt="Name" width={3000} height={350} />
                </CarouselItem>
            </Carousel>
        </div>
    )
}
