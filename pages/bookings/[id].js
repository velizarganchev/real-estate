import React from 'react'

import { getServerSession } from "next-auth"
import { authOptions } from '../api/auth/[...nextauth]'

import { useGetBookingDetailsQuery } from "../../redux/bookingApiSlice"
import { useGetCurrUserQuery } from '../../redux/userApiSlice'

import { useRouter } from "next/router"
import Loader from '../../components/layout/Loader'

import Image from 'next/image'
import Link from 'next/link'

const BookingDetails = () => {

    let isPaid = false;
    let isAdmin = false;

    const router = useRouter();
    const { id } = router.query;

    const { data: bookingData, isLoading } = useGetBookingDetailsQuery(id);
    const { data: userData } = useGetCurrUserQuery();

    if (bookingData) {
        isPaid = bookingData.booking.paymentInfo && bookingData.booking.paymentInfo.status === 'COMPLETED' ? true : false
    }
    if (userData) {
        isAdmin = userData.user && userData.user.role === 'admin' ? true : false
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-between">
                {
                    isLoading
                        ? <Loader />
                        :
                        <div className="col-12 col-lg-8 mt-5 booking-details">
                            {bookingData && bookingData.booking && bookingData.booking.place && bookingData.booking.user &&
                                <>

                                    <h2 className="my-5">Booking # {bookingData.booking._id}</h2>

                                    <h4 className="mb-4">User Info</h4>
                                    <p><b>Name:</b> {bookingData.booking.user && bookingData.booking.user.name}</p>
                                    <p><b>Email:</b> {bookingData.booking.user && bookingData.booking.user.email}</p>
                                    <p><b>Amount:</b> ${bookingData.booking.amountPaid}</p>

                                    <hr />

                                    <h4 className="mb-4">Booking Info</h4>
                                    <p><b>Check In:</b> {new Date(bookingData.booking.checkInDate).toLocaleString('en-US')}</p>

                                    <p><b>Check Out:</b> {new Date(bookingData.booking.checkOutDate).toLocaleString('en-US')}</p>

                                    <p><b>Days of Stay:</b> {bookingData.booking.daysOfStay}</p>

                                    <hr />

                                    <h4 className="my-4">Payment Status</h4>
                                    <p className={isPaid ? 'text-success' : 'text-danger'}><b>{isPaid ? 'COMPLETED' : 'NOT COMPLETED'}</b></p>

                                    {isAdmin &&
                                        <>
                                            <h4 className="my-4">PayPal Payment ID</h4>
                                            <p className='text-danger'><b>{bookingData.booking.paymentInfo.id}</b></p>
                                        </>
                                    }

                                    <h4 className="mt-5 mb-4">Booked Room:</h4>

                                    <hr />
                                    <div className="cart-item my-1">
                                        <div className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <Image
                                                    src={bookingData.booking.place.images[0].url}
                                                    alt={bookingData.booking.place.name}
                                                    height={45}
                                                    width={65}
                                                />
                                            </div>

                                            <div className="col-5 col-lg-5">
                                                <Link href={`/room/${bookingData.booking.place._id}`}>{bookingData.booking.place.name}</Link>
                                            </div>

                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>${bookingData.booking.place.pricePerNight}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{bookingData.booking.daysOfStay} Day(s)</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export async function getServerSideProps({ req, res }) {

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
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
export default BookingDetails