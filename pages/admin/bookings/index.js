import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import { useGetAllBookingsQuery } from "../../../redux/bookingApiSlice"
import { useEffect } from "react"
import { useRouter } from "next/router"

import Link from "next/link"
import { Table } from "react-bootstrap"

import easyinvoice from 'easyinvoice'
import axios from "axios"
import { toast } from 'react-toastify'

import Loader from "../../../components/layout/Loader"

const AllBookings = () => {

    const { data: allBookings, error, isLoading } = useGetAllBookingsQuery();

    const router = useRouter()

    useEffect(() => {
        if (error) {
            axios.error(error)
        }
    }, [error])


    const downloadInvoice = async (booking) => {


        var data = {
            // Customize enables you to provide your own templates
            // Please review the documentation for instructions and examples
            "customize": {
                //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                "logo": "https://res.cloudinary.com/realestate-veli/image/upload/v1684768637/realestate/logo/Sierrah_Scarpine_Logo_awiyaq.png",
                // The invoice background
                "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
            },
            // Your own data
            "sender": {
                "company": "Real Estate",
                "address": "13th Street. 47 W 13th St",
                "zip": "10001",
                "city": "New York",
                "country": "United States"
            },
            // Your recipient
            "client": {
                "company": `${booking.user.name}`,
                "address": `${booking.user.email}`,
                "zip": "",
                "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
                "country": `Check Out: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
            },
            "information": {
                // Invoice number
                "number": `${booking._id}`,
                // Invoice data
                "date": `${new Date(Date.now()).toLocaleString('en-US')}`,
                // Invoice due date
                "due-date": `${new Date(Date.now()).toLocaleString('en-US')}`
            },
            // The products you would like to see on your invoice
            // Total values are being calculated automatically
            "products": [
                {
                    "quantity": `${booking.daysOfStay}`,
                    "description": `${booking.place.name}`,
                    "tax": 0,
                    "price": booking.place.pricePerNight
                },
            ],
            // The message you would like to display on the bottom of your invoice
            "bottom-notice": "This is auto generated Invoice of your booking on Real Estate.",
            // Settings to customize your invoice
            "settings": {
                "currency": "USD",
            },
            // Translate your invoice to your preferred language
            "translate": {
            },
        };

        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)

    }

    const deleteBookingHandler = async (id) => {
        try {
            try {
                const { data } = await axios.delete(`/api/admin/bookings/${id}`)

                if (data.success) {
                    toast.success(data.message)
                }

            } catch (error) {
                toast.error(error)

            }
        } catch (error) {
            console.log(error)
        }
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
                                            <td>{new Date(booking.checkOutDate).toLocaleString('en-US')}</td>
                                            <td>${booking.amountPaid}</td>
                                            <td>
                                                <Link className="btn btn-primary" href={`/bookings/${booking._id}`}>
                                                    <i className="fa fa-eye"></i>
                                                </Link>
                                                <button className="btn btn-success mx-2" onClick={() => downloadInvoice(booking)}>
                                                    <i className="fa fa-download"></i>
                                                </button>
                                                <button className="btn btn-danger mx-2" onClick={() => deleteBookingHandler(booking._id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
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
export default AllBookings