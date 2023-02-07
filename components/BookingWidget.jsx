import { useState } from "react"
import { differenceInCalendarDays } from "date-fns"

export default function BookingWidget({ place }) {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    return (
        <div className="col col-lg-4 col-sm-12 shadow p-3 my-5 bg-body rounded">
            <div className="mt-3">
                <div className="d-flex justify-content-between">
                    <span className="text-uppercase p-2">Add dates for prices</span>
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
                        min={1} type="number" id="floatingSelectGrid"
                        style={{ borderRadius: "unset" }} />
                    <label htmlFor="floatingSelectGrid">GUESTS</label>
                    {
                        numberOfNights > 0 && (
                            <div>
                                <div className="form-floating">
                                    <input
                                        value={name}
                                        onChange={ev => setName(ev.target.value)}
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
                </div>

                <div className="d-grid gap-2 mt-5">
                    <button
                        className="btn btn-primary btn-lg"
                        type="button">
                        {
                            numberOfNights > 0 ? ("Book this place $" + numberOfNights * place.price) :
                                ("Check availability")
                        }
                    </button>
                </div>
                <div className="mt-4">
                    <p className="">Enter your travel dates to see the total price per night.</p>
                </div>
            </div>
        </div>
    )
}
