import React from 'react'
import { useGetBookingDetailsQuery } from "../../redux/bookingApiSlice"

import { useRouter } from "next/router"

import Image from 'next/image';
import Link from 'next/link';

export default function BookingDetails() {

    const router = useRouter();
    const { id } = router.query;

    const { data } = useGetBookingDetailsQuery(id);

    // const isPaid = data.booking.paymentInfo && data.booking.paymentInfo.status === 'paid' ? true : false

    return (
        <div className="container">
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 booking-details">
                    {data && data.booking && data.booking.place && data.booking.user &&
                        <>

                            <h2 className="my-5">Booking # {data.booking._id}</h2>

                            <h4 className="mb-4">User Info</h4>
                            <p><b>Name:</b> {data.booking.user && data.booking.user.name}</p>
                            <p><b>Email:</b> {data.booking.user && data.booking.user.email}</p>
                            <p><b>Amount:</b> ${data.booking.amountPaid}</p>

                            <hr />

                            <h4 className="mb-4">Booking Info</h4>
                            <p><b>Check In:</b> {new Date(data.booking.checkInDate).toLocaleString('en-US')}</p>

                            <p><b>Check Out:</b> {new Date(data.booking.checkOutDate).toLocaleString('en-US')}</p>

                            <p><b>Days of Stay:</b> {data.booking.daysOfStay}</p>

                            <hr />

                            <h4 className="my-4">Payment Status</h4>
                            {/* <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'Paid' : 'Not Paid'}</b></p> */}

                            {/* {user && user.role === 'admin' &&
                                <>
                                    <h4 className="my-4">Stripe Payment ID</h4>
                                    <p className='redColor'><b>{booking.paymentInfo.id}</b></p>
                                </>
                            } */}

                            <h4 className="mt-5 mb-4">Booked Room:</h4>

                            <hr />
                            <div className="cart-item my-1">
                                <div className="row my-5">
                                    <div className="col-4 col-lg-2">
                                        <Image
                                            src={data.booking.place.images[0]}
                                            alt={data.booking.place.name}
                                            height={45}
                                            width={65}
                                        />
                                    </div>

                                    <div className="col-5 col-lg-5">
                                        <Link href={`/room/${data.booking.place._id}`}>{data.booking.place.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p>${data.booking.place.pricePerNight}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <p>{data.booking.daysOfStay} Day(s)</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
