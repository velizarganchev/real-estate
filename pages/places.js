import PlacesList from '../components/PlacesList';

import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

export default function Index({ places }) {

    return (
        <div>
            <div className='container'>
                <div className="section-header text-center pt-3">
                    <h1>Our Places</h1>
                </div>
                <PlacesList places={places} />
            </div>
        </div>
    )
}

export async function getServerSideProps({ req, res }) {

    const { origin } = absoluteUrl(req)
    const { data } = await axios.get(`${origin}/api/places`)

    return ({
        props: {
            places: JSON.parse(JSON.stringify(data.places)),
        }
    })
}