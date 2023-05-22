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


export default function BookingWidget({ place }) {

    const router = useRouter();

    const { data: session, status } = useSession()
    const { data: user, error, isError, isLoading } = useGetCurrUserQuery()

    const excludedDates = [];

    const [checkInDate, setCheckInDate] = useState()
    const [checkOutDate, setCheckOutDate] = useState()
    const [daysOfStay, setDaysOfStay] = useState()
    const [paymentLoading, setPaymentLoading] = useState(false)
    const [available, setAvailable] = useState()

    const clientId = "AY8JulNf1V06YMw3DmwucquBb2QAIekpqS9Pd_C-GD1Tuane5DI0fpLh8NhB7ZPQQtL-1ZLJDNEkVMh-";

    let numberOfNights = 0;


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

    const newBookingHandler = async () => {

        const bookingData = {
            place: router.query.id,
            checkInDate,
            checkOutDate,
            daysOfStay,
            amountPaid: 90,
            paymentInfo: {
                id: 'STRIPE_PAYMENT_ID',
                status: 'STRIPE_PAYMENT_STATUS'
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
                router.push('/')
            }

        } catch (error) {

            console.log(error.response);

        }

    }

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
        }, [currency, dispatch, options, showSpinner]);


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
                    return actions.order.capture().then(function () {
                        // Your code here after capture the order
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
                    <span className="text-uppercase p-2">
                        {daysOfStay > 0 ?
                            <strong className="fs-5">{daysOfStay * place.pricePerNight} $</strong> :
                            ("Add dates for prices")}
                    </span>
                    <span className="p-2"><i className="fa-solid fa-star"></i> 5.0-12 revies</span>
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
                {available && !user.user &&
                    <div className="alert alert-danger my-3 font-weight-bold">Login to book place.</div>
                }

                {available && user.success &&
                    <div className="d-grid gap-2 mt-5">
                        <button
                            onClick={newBookingHandler}
                            className="btn btn-outline-dark btn-lg"
                            type="button"
                        // disabled={email.length >= 1 ? ('') : 'disabled' }
                        >
                            {
                                daysOfStay > 0 ? ("Book this place $" + daysOfStay * place.pricePerNight) :
                                    ("Book this place")
                            }
                        </button>
                    </div>
                }
                {/* <div className="form-floating">
                    <input
                        className="form-control"
                        value={numberOfGuests}
                        onChange={ev => setNumberOfGuests(ev.target.value)}
                        min={1} type="number"
                        max={place.guestCapacity}
                        id="floatingSelectGrid"
                        style={{ borderRadius: "unset" }} />
                    <label htmlFor="floatingSelectGrid">GUESTS</label>
                    {
                        numberOfNights > 0 && (
                            <div>
                                <div className="form-floating">
                                    <input
                                        value={fullName}
                                        onChange={ev => setFullName(ev.target.value)}
                                        className="form-control"
                                        type="text" id="fullName"
                                        style={{ borderRadius: "unset" }} />
                                    <label htmlFor="fullName">Your full name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        value={email}
                                        onChange={ev => setEmail(ev.target.value)}
                                        className="form-control"
                                        type="text" id="email"
                                        style={{ borderTopLeftRadius: "unset", borderTopRightRadius: "unset" }} />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                        )
                    }
                </div> */}

                <div className="mt-4">
                    <p className="">Enter your travel dates to see the total price per night.</p>
                </div>
            </div>
        </div>
    )
}
