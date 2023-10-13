import Link from 'next/link';

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";

import axios from "axios";
import { toast } from 'react-toastify'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";


export default function BookingWidget({ place }) {

    const clientId = 'ATqOflJU4g5errCRDdiA0B8gcO6w0eAAEgyMbZiWatsTsn5lPrRuWAL_8UatBbsJmQSGT1vBK1U-pQLq';

    const router = useRouter();

    const { data: user, error } = useSWR(`/api/me`,
        (url) => fetch(url).then((res) => res.json()));

    const [checkInDate, setCheckInDate] = useState()
    const [checkOutDate, setCheckOutDate] = useState()
    const [daysOfStay, setDaysOfStay] = useState()
    const [available, setAvailable] = useState()
    const [toCheckOut, setToCheckOut] = useState(false)


    const amount = daysOfStay * place.pricePerNight;
    const currency = "USD";
    const style = { "layout": "vertical" };

    const excludedDates = [];

    const { id } = router.query;

    const { data: dates } = useSWR(`/api/bookings/check_booked_dates?placeId=${id}`, (url) => fetch(url)
        .then((res) => res.json()));

    if (dates) {

        dates.bookedDates.forEach(date => {
            excludedDates.push(new Date(date))
        })
    }

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

            axios.post(`/api/bookings`, bookingData)
                .then((response) => {
                    if (response.data.success) {
                        router.push('/bookings/me')
                    }
                });
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
            {available && !user.success &&
                <>
                    <div className="alert alert-danger my-3 font-weight-bold">
                        Login to book place.
                        <Link className="ms-2 text-primary font-weight-bold  text-uppercase" href={'/auth/login'}>Login</Link>
                    </div>
                </>
            }

            {available && user.success &&
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
                        </button>
                    }
                </div>
            }
            <div className="mt-4">
                <p className="">Enter your travel dates to see the total price per night.</p>
            </div>
        </div>
    )
}
