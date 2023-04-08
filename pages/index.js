import PlacesList from "../components/PlacesList";
import Slider from "../components/Slider";
import Contact from "../components/Contact";
import Baner from "../components/Baner";
import mongodb from "../utils/mongodb";
import Place from "../models/Place";

export default function Home({ places }) {
  return (
    <div>
      <Slider />
      <div className='container'>
        <Baner />
        <PlacesList places={places} />
        <Contact />
      </div>
    </div>
  )
}
export async function getServerSideProps() {
  await mongodb.dbConnect();
  const places = await Place.find({}).lean();
  return ({
    props: {
      places: JSON.parse(JSON.stringify(places))
    }
  })
}