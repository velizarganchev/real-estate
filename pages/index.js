import Slider from '../components/Slider';
import Baner from '../components/layout/Baner';
import PlacesList from '../components/PlacesList';
import Specialties from '../components/Specialties';
import Contact from '../components/Contact';

import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

export default function Index({ places }) {

  return (
    <div>
      <Slider />
      <div className='container'>
        <Baner />
        <PlacesList places={places} />
        <Specialties />
        <Contact />
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