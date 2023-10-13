import { Fragment, useState } from "react";
import Link from "next/link";

import { Button, Container } from "react-bootstrap";

import absoluteUrl from "next-absolute-url";
import axios from "axios";

import PlaceHeader from "../../components/place/PlaceHeader";
import PlaceContent from "../../components/place/PlaceContent";
import ImagesCard from "../../components/images/ImagesCard";

export default function PlacePage({ place, reviews }) {

    const [ShowAllFotos, setShowAllFotos] = useState(false);

    if (!place) {
        return (
            <div>
                <h2 className="text-center">Plece not found!</h2>
            </div>
        )
    }

    if (ShowAllFotos) {
        return (
            <>
                <Button onClick={() => setShowAllFotos(false)} variant="outline-link" size="sm">
                    ←  Back
                </Button>
                <Container className="bg-light">
                    <ImagesCard images={place.images} placeName={place.name} />
                </Container>
            </>
        )
    }

    return (
        <div className="container pt-4">
            <div className="mb-3">
                <Link className="text-dark" href={"/"}>← back to Home</Link>
            </div>
            <Fragment>
                <PlaceHeader place={place} OnShow={setShowAllFotos} />
                <PlaceContent place={place} initialReviews={reviews} />
            </Fragment>
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        const id = context.params.id;
        const { origin } = absoluteUrl(context.req);

        const { data } = await axios.get(`${origin}/api/places/${id}`);
        const { data: allReviews } = await axios.get(`${origin}/api/reviews?id=${id}`);

        return {
            props: {
                place: JSON.parse(JSON.stringify(data.place)),
                reviews: JSON.parse(JSON.stringify(allReviews)),
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                place: null,
                reviews: [],
            }
        };
    }
};