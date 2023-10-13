import PlacesList from "../../components/place/PlacesList";
import Loader from "../../components/layout/Loader";

import useSWR from "swr";

export default function Index() {

    const { data, error, isLoading } = useSWR(`/api/places`,
        (url) => fetch(url).then((res) => res.json()));

    return (
        <>
            {isLoading ? <Loader /> :
                <div>
                    <div className='container'>
                        <div className="section-header text-center pt-3">
                            <h1>Our Places</h1>
                        </div>
                        <PlacesList places={data.places} />
                    </div>
                </div>}
        </>

    )
};