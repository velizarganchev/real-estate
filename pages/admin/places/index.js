import { useEffect, useState } from 'react';

import Loader from '../../../components/layout/Loader';
import Link from 'next/link';

import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import useSWR, { mutate } from "swr";
import axios from 'axios';

import { Table } from "react-bootstrap"

const AllPlaces = () => {

    const [places, setPlaces] = useState();
    const [isDeleteLoading, setIsDeleteloadeing] = useState(false);

    const { data, isLoading: isLoadingPlaces } = useSWR(`/api/admin/places`,
        (url) => fetch(url).then((res) => res.json()));

    useEffect(() => {
        if (data) {
            setPlaces(data.places);
        };
    }, [data]);

    const deletePlaceHandler = async (id) => {

        setIsDeleteloadeing(true);

        axios.delete(`/api/places/${id}`)
            .then((response) => {
                if (response.data.success) {
                    setIsDeleteloadeing(false);
                    mutate(`/api/admin/places`);
                }
            });
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
                                            <td className="d-flex">
                                                <Link className="btn btn-primary" href={`/admin/places/${place._id}`}>
                                                    <i className="fa fa-pencil"></i>
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="btn btn-danger mx-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#p${place._id}`}>
                                                    {isDeleteLoading ?
                                                        <div className="spinner-border spinner-border-sm" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> :
                                                        <i className="fa fa-trash"></i>
                                                    }
                                                </button>

                                                <div className="modal fade" id={"p" + place._id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete {place.name}!</h1>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-dark" data-bs-dismiss="modal">
                                                                    Close
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-danger mx-2"
                                                                    onClick={() => deletePlaceHandler(place._id)}
                                                                    data-bs-dismiss="modal">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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

    if (!session || session.user.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {
            session
        }
    }

}

export default AllPlaces