import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useSession } from 'next-auth/react';

import { useGetAllBookedDatesQuery } from '../redux/bookingApiSlice'
import { useGetCurrUserQuery } from "../redux/userApiSlice";

import { toast } from 'react-toastify'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import Link from "next/link";


export default function BookingWidget({ place }) {

    const router = useRouter();

    const { data: session, status } = useSession()
    const { data: user, error, isError, isLoading, isSuccess } = useGetCurrUserQuery()

    const excludedDates = [];

    const [checkInDate, setCheckInDate] = useState()
    const [checkOutDate, setCheckOutDate] = useState()
    const [daysOfStay, setDaysOfStay] = useState()
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [available, setAvailable] = useState()
    const [toCheckOut, setToCheckOut] = useState(false)

    const clientId = "ATqOflJU4g5errCRDdiA0B8gcO6w0eAAEgyMbZiWatsTsn5lPrRuWAL_8UatBbsJmQSGT1vBK1U-pQLq";

    const amount = daysOfStay * place.pricePerNight;
    const currency = "USD";
    const style = { "layout": "vertical" };

    async function CheckBooking(placeId, checkInDate, checkOutDate) {
        try {
            let link = `/api/bookings/check?placeId=${placeId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
            return await axios.get(link)
        } catch (error) {
            toast.error(error.response)
        }
    }

    const onChange = (dates) => {
        const [checkInDate, checkOutDate] = dates;

        setCheckInDate(checkInDate);
        setCheckOutDate(checkOutDate);

        if (checkInDate && checkOutDate) {
            // Calclate days of stay

            const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1)

            setDaysOfStay(days)

            CheckBooking(id, checkInDate.toISOString(), checkOutDate.toISOString())
                .then(function (result) {
                    if (result.data.isAvailable) {
                        setAvailable(true)
                    } else {
                        setAvailable(false)
                    }
                })
        }

    }

    const { id } = router.query;
    const { data: dates } = useGetAllBookedDatesQuery(id);

    if (dates) {

        dates.bookedDates.forEach(date => {
            excludedDates.push(new Date(date))
        })
    }



    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        const newBookingHandler = async (details) => {

            const bookingData = {
                place: router.query.id,
                checkInDate,
                checkOutDate,
                daysOfStay,
                amountPaid: Number(details.purchase_units[0].amount.value),
                paymentInfo: {
                    id: details.id,
                    status: details.status
                }
            }

            try {

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                const { data } = await axios.post('/api/bookings', bookingData, config)
                if (data.success) {
                    router.push('/bookings/me')
                }
            } catch (error) {

                console.log(error.response);

            }

        }

        return (<>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        // Your code here after capture the order
                        console.log(details)
                        if (details.status === "COMPLETED") {
                            newBookingHandler(details)
                        }
                    });
                }}
            />
        </>
        );
    }

    return (
        <div className="col col-lg-4 col-sm-12 shadow p-3 my-5 bg-body rounded">
            <div className="">
                <div className="d-flex justify-content-between">
                    <div className="text-uppercase">
                        {daysOfStay > 0 ?
                            <strong className="fs-5">{daysOfStay * place.pricePerNight} $</strong> :
                            ("Add Dates")}
                    </div>
                    <div className="ratings mt-auto mb-3">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(place.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({place.numOfReviews} Reviews)</span>
                    </div>
                </div>
                <DatePicker
                    className='w-100'
                    selected={checkInDate}
                    onChange={onChange}
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    minDate={new Date()}
                    excludeDates={excludedDates}
                    selectsRange
                    inline
                />
                {available === true &&
                    <div className="alert alert-success my-3 font-weight-bold">Place is available. Book now.</div>
                }

                {available === false &&
                    <div className="alert alert-danger my-3 font-weight-bold">Place not available. Try different dates.</div>
                }
                {available && isError &&
                    <>
                        <div className="alert alert-danger my-3 font-weight-bold">Login to book place.</div>
                        <Link className="btn btn-outline-primary" href={'/auth/login'}>Login</Link>
                    </>
                }

                {available && isSuccess &&
                    <div className="d-grid gap-2 mt-5">
                        {toCheckOut ?
                            (<PayPalScriptProvider
                                options={{
                                    "client-id": clientId,
                                    components: "buttons",
                                    currency: "USD"
                                }}
                            >
                                <ButtonWrapper
                                    currency={currency}
                                    showSpinner={false}
                                />
                            </PayPalScriptProvider>) :
                            <button
                                onClick={() => setToCheckOut(true)}
                                className="btn btn-outline-dark btn-lg"
                                type="button"
                            // disabled={email.length >= 1 ? ('') : 'disabled' }
                            >
                                {
                                    daysOfStay > 0 ? (`Book this place for ${daysOfStay * place.pricePerNight} $`) :
                                        ("Book this place")
                                }
                            </button>}
                    </div>
                }
                <div className="mt-4">
                    <p className="">Enter your travel dates to see the total price per night.</p>
                </div>
            </div>
        </div>
    )
}
