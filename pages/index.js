import Slider from '../components/Slider'
import Specialties from '../components/Specialties'
import SierrahScarpine from '../components/SierrahScarpine'
import Baner from '../components/layout/Baner'
import PlacesList from '../components/PlacesList'
import Contact from '../components/Contact'

import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { useGetCurrUserQuery } from '../redux/userApiSlice'
import { useGetAllPlacesQuery } from '../redux/placeApiSlice'

import axios from 'axios'
import absoluteUrl from 'next-absolute-url'
export default function Index({ places }) {

  return (  
    <div>
      <Slider />
      <div className='container'>
        <Baner />
        <SierrahScarpine />
        <Specialties />
        <PlacesList places={places} />
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
      session: await getServerSession(req, res, authOptions)
    }
  })
}