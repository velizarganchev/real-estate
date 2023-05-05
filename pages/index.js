import PlacesList from "../components/PlacesList";
import Slider from "../components/Slider";
import Contact from "../components/Contact";
import Baner from "../components/Baner";

import { useEffect } from "react";
import { toast } from "react-toastify";

import axios from "axios";
import absoluteUrl from "next-absolute-url";

import { wrapper } from "../redux/store";
import { getAllPlaces } from "../redux/actions/placeActions";
//import { fetchAllPlaces } from "../redux/place-slice";

//import mongodb from "../utils/mongodb";
// import Place from "../models/Place";

export default function Home({ places }) {

  useEffect(() => {
    toast.success('Success Message')
  }, [])


  return (
    <div>
      <Slider />
      <div className='container'>
        <Baner />
        <PlacesList />
        <Contact />
      </div>
    </div>
  )
}
// export async function getServerSideProps(context) {

//   const { origin } = absoluteUrl(context.req)
//   const { data } = await axios.get(`${origin}/api/places`)

//   // console.log(data.places)
//   return ({
//     props: {
//       places: JSON.parse(JSON.stringify(data.places))
//     }
//   })
// }


export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req }) => {

  await store.dispatch(getAllPlaces(req))
})