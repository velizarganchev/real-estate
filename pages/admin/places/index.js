// import { useGetAllMyBookingsQuery } from "../../redux/bookingApiSlice"
import { useState, useEffect } from "react"

import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import Link from "next/link"
import { Table } from "react-bootstrap"

import axios from "axios"
import absoluteUrl from 'next-absolute-url'

import { toast } from 'react-toastify'
import { useRouter } from "next/router"

const AllPlaces = () => {

    const [places, setPlaces] = useState()
    const router = useRouter()

    async function LoadPlaces() {
        try {
            return await axios.get('/api/admin/places')
        } catch (error) {
            toast.error(error)

        }
    }

    useEffect(() => {
        LoadPlaces().then(function (result) {
            const data = result.data
            if (data.success) {
                setPlaces(data.places)
            }
        })
    }, []);


    const deletePlaceHandler = async (id) => {

        try {
            try {

                const { data } = await axios.delete(`/api/places/${id}`)
                console.log(data)
                if (data.success) {
                    toast.success(data.message)
                }

            } catch (error) {
                toast.error(error)

            }
        } catch (error) {

        }
    }

    return (
        <div className='container container-fluid'>
            <h1 className='my-5'>All Places
                <Link href='/admin/places/new' className="btn btn-outline-dark float-end">
                    Create Place
                </Link>
            </h1>

            {places && places.length !== 0 ?
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th >Place ID</th>
                            <th >Name</th>
                            <th >Price / Night</th>
                            <th >Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {places.map((place, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{place._id}</td>
                                <td>{place.name}</td>
                                <td>{place.pricePerNight}</td>
                                <td>
                                    <Link className="btn btn-primary" href={`/admin/places/${place._id}`}>
                                        <i className="fa fa-pencil"></i>
                                    </Link>
                                    <button className="btn btn-danger mx-2" onClick={() => deletePlaceHandler(place._id)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table> :
                <div className="text-center fs-1"> No Bookings</div>
            }
        </div>
    )
}

export async function getServerSideProps({ req, res }) {

    const session = await getServerSession(req, res, authOptions)

    if (!session || session.user._doc.role !== 'admin') {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
    return {
        props: {
        }
    }

}

export default AllPlaces