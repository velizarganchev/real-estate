import { useState } from "react"
import { differenceInCalendarDays } from "date-fns"

import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";

export default function BookingWidget({ place }) {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    // const [fullName, setFullName] = useState('');
    // const [email, setEmail] = useState('');
    const [toCheckOut, setToCheckOut] = useState(false)
    const router = useRouter();

    const clientId = "AY8JulNf1V06YMw3DmwucquBb2QAIekpqS9Pd_C-GD1Tuane5DI0fpLh8NhB7ZPQQtL-1ZLJDNEkVMh-";

    let numberOfNights = 0;

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    const amount = numberOfNights * place.price;
    const currency = "USD";
    const style = { "layout": "vertical" };

    const createBooking = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/places", data);
            if (res.status === 201) {
                router.push(`/places/${res.data._id}`);
            }

        } catch (error) {
            console.log(error)
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
        }, [currency, showSpinner]);


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
                        const client = details.purchase_units[0];
                        createBooking({
                            place: place.title,
                            checkIn: checkIn,
                            checkOut: checkOut,
                            name: client.shipping.name.full_name,
                            address: client.shipping.address.address_line_1 + ", " + client.shipping.address.admin_area_1,
                            email: client.payee.email_address,
                            numberOfGuests: numberOfGuests,
                            price: numberOfNights * place.price,
                            payment: 1
                        })
                    });
                }}
            />
        </>
        );
    }

    return (
        <div className="col col-lg-4 col-sm-12 shadow p-3 my-5 bg-body rounded">
            <div className="mt-3">
                <div className="d-flex justify-content-between">
                    <span className="text-uppercase p-2">
                        {numberOfNights > 0 ?
                            <strong className="fs-2">{numberOfNights * place.price} $</strong> :
                            ("Add dates for prices")}
                    </span>
                    <span className="p-2"><i className="fa-solid fa-star"></i> 5.0-12 revies</span>
                </div>
                <div className="input-group mb-0 input-group-lg my-3">
                    <input
                        type="date"
                        value={checkIn}
                        onChange={ev => setCheckIn(ev.target.value)}
                        className="form-control border-bottom-0"
                        style={{ borderBottomLeftRadius: "unset" }} />
                    <input
                        type="date"
                        value={checkOut}
                        onChange={ev => setCheckOut(ev.target.value)}
                        className="form-control border-bottom-0"
                        style={{ borderBottomRightRadius: "unset" }} />
                </div>
                <div className="form-floating">
                    <input
                        className="form-control"
                        value={numberOfGuests}
                        onChange={ev => setNumberOfGuests(ev.target.value)}
                        min={1} type="number"
                        max={place.maxGuests}
                        id="floatingSelectGrid"
                        style={{ borderRadius: "unset" }} />
                    <label htmlFor="floatingSelectGrid">GUESTS</label>
                </div>

                <div className="d-grid gap-2 mt-5">
                    {toCheckOut ? (<PayPalScriptProvider
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
                    </PayPalScriptProvider>) : <button
                        onClick={() => setToCheckOut(true)}
                        className="btn btn-primary btn-lg"
                        type="button">
                        {
                            numberOfNights > 0 ? ("Book this place $" + numberOfNights * place.price) :
                                ("Check availability")
                        }
                    </button>}

                </div>
                <div className="mt-4">
                    <p className="">Enter your travel dates to see the total price per night.</p>
                </div>
            </div>
        </div>
    )
}
