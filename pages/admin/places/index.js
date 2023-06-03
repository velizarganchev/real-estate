import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import Link from "next/link"
import { Table } from "react-bootstrap"

import { useGetAllPlacesQuery, useDeletePlaceMutation } from "../../../redux/placeApiSlice"

import Loader from "../../../components/layout/Loader"

const AllPlaces = () => {

    const {
        data,
        isLoading: isLoadingPlaces,
        isFetching,
        isError,
        error,
    } = useGetAllPlacesQuery();

    const [deletePlace, { isLoading }] = useDeletePlaceMutation();


    const deletePlaceHandler = async (id) => {
        deletePlace(id)
    }

    return (
        <div className='container container-fluid'>
            {
                isLoadingPlaces ? <Loader />
                    :
                    <>
                        <h1 className='my-5'>All Places
                            <Link href='/admin/places/new' className="btn btn-outline-dark float-end">
                                Create Place
                            </Link>
                        </h1>

                        {data && data.places.length !== 0 ?
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
                                    {data.places.map((place, index) => (
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
                                                    {isLoading ?
                                                        <div className="spinner-border spinner-border-sm" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> :
                                                        <i className="fa fa-trash"></i>
                                                    }
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table> :
                            <div className="text-center fs-1"> No Places</div>
                        }
                    </>
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