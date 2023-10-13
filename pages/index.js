import Slider from '../components/slider/Slider';
import Baner from '../components/layout/Baner';
import PlacesList from '../components/place/PlacesList';
import Specialties from '../components/specialties/Specialties';
import Contact from '../components/contact/Contact';

import absoluteUrl from 'next-absolute-url';
import axios from 'axios';
import Testimonials from '../components/testemonial/Testimonials';

export default function Index({ places }) {

  return (
    <div>
      <div className='container'>
        <Slider />

        <Baner />
        <PlacesList places={places} />
        <Specialties />
        <Testimonials />
        <Contact />
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const { origin } = absoluteUrl(context.req);
    const { data } = await axios.get(`${origin}/api/places`);

    return {
      props: {
        places: JSON.parse(JSON.stringify(data.places)),
      },
    };
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    return {
      props: {
        places: [],
      },
    };
  }
};



