import Link from 'next/link';
import Loader from '../../../components/layout/Loader';

import { useState } from 'react';

import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import useSWR, { mutate } from "swr";
import axios from 'axios';

import { Table } from "react-bootstrap"

// import easyinvoice from 'easyinvoice'

const AllBookings = () => {

    const [isDeleteBookingLoading, setIsDeleteBookingLoading] = useState(false);

    const { data: allBookings, error, isLoading } = useSWR(`/api/admin/bookings`,
        (url) => fetch(url).then((res) => res.json()));

    function addOneDay(dateStr) {
        const date = new Date(dateStr)
        date.setDate(date.getDate() + 1);
        return date;
    }
    // const downloadInvoice = async (booking) => {

    //     var data = {
    //         // Customize enables you to provide your own templates
    //         // Please review the documentation for instructions and examples
    //         "customize": {
    //             //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    //         },
    //         "images": {
    //             // The logo on top of your invoice
    //             "logo": "https://res.cloudinary.com/realestate-veli/image/upload/v1684768637/realestate/logo/Sierrah_Scarpine_Logo_awiyaq.png",
    //             // The invoice background
    //             "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
    //         },
    //         // Your own data
    //         "sender": {
    //             "company": "Real Estate",
    //             "address": "13th Street. 47 W 13th St",
    //             "zip": "10001",
    //             "city": "New York",
    //             "country": "United States"
    //         },
    //         // Your recipient
    //         "client": {
    //             "company": `${booking.user.name}`,
    //             "address": `${booking.user.email}`,
    //             "zip": "",
    //             "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
    //             "country": `Check Out: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
    //         },
    //         "information": {
    //             // Invoice number
    //             "number": `${booking._id}`,
    //             // Invoice data
    //             "date": `${new Date(Date.now()).toLocaleString('en-US')}`,
    //             // Invoice due date
    //             "due-date": `${new Date(Date.now()).toLocaleString('en-US')}`
    //         },
    //         // The products you would like to see on your invoice
    //         // Total values are being calculated automatically
    //         "products": [
    //             {
    //                 "quantity": `${booking.daysOfStay}`,
    //                 "description": `${booking.place.name}`,
    //                 "tax": 0,
    //                 "price": booking.place.pricePerNight
    //             },
    //         ],
    //         // The message you would like to display on the bottom of your invoice
    //         "bottom-notice": "This is auto generated Invoice of your booking on Real Estate.",
    //         // Settings to customize your invoice
    //         "settings": {
    //             "currency": "USD",
    //         },
    //         // Translate your invoice to your preferred language
    //         "translate": {
    //         },
    //     };

    //     const result = await easyinvoice.createInvoice(data);
    //     easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)

    // }


    const deleteBookingHandler = async (bookingId) => {
        setIsDeleteBookingLoading(true);

        axios.delete(`/api/admin/bookings/${bookingId}`)
            .then((response) => {
                if (response.data.success) {
                    setIsDeleteBookingLoading(false);
                    mutate(`/api/admin/bookings`);
                }
            });
    }

    return (
        <div className='container container-fluid'>
            {
                isLoading ?
                    <Loader />
                    :
                    <>
                        <h1 className='text-center my-5'>All Bookings</h1>
                        {allBookings && allBookings.bookings.length !== 0 ?
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Booking ID</th>
                                        <th >Check In</th>
                                        <th >Check Out</th>
                                        <th >Amount Paid</th>
                                        <th >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allBookings.bookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{booking._id}</td>
                                            <td>{new Date(booking.checkInDate).toLocaleString('en-US')}</td>
                                            <td>{addOneDay(booking.checkOutDate).toLocaleString('en-US')}</td>
                                            <td>${booking.amountPaid}</td>
                                            <td className="d-flex">
                                                <Link className="btn btn-primary" href={`/bookings/${booking._id}`}>
                                                    <i className="fa fa-eye"></i>
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger mx-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#b${booking._id}`}>
                                                    {isDeleteBookingLoading
                                                        ?
                                                        <div className="spinner-border spinner-border-sm" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> :
                                                        <i className="fa fa-trash"></i>}
                                                </button>
                                                <div className="modal fade" id={"b" + booking._id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete {booking._id}!</h1>
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
                                                                    onClick={() => deleteBookingHandler(booking._id)}
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
                            <div className="text-center fs-1"> No Bookings</div>
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
export default AllBookings