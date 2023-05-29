import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import axios from 'axios';
import { toast } from 'react-toastify';

import ButtonLoader from '../../../components/layout/ButtonLoader';

const NewPlace = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [checkIn, setCheckIn] = useState(3)
    const [checkOut, setCheckOut] = useState(10)
    const [guestCapacity, setGuestCapacity] = useState(1)
    const [numOfBeds, setNumOfBeds] = useState(1)
    const [internet, setInternet] = useState(false)
    const [parking, setParking] = useState(false)
    const [airConditioned, setAirConditioned] = useState(false)
    const [petsAllowed, setPetsAllowed] = useState(false)
    const [entertainment, setEntertainment] = useState(false)
    const [kitchen, setKitchen] = useState(false)
    const [washer, setWasher] = useState(false)
    const [refrigerator, setRefrigerator] = useState(false)
    const [dryer, setDryer] = useState(false)
    const [selfCheckIn, setSelfCheckIn] = useState(false)

    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const router = useRouter()

    async function Create(placeData, config) {
        try {
            return await axios.post('/api/places', placeData, config)
        } catch (error) {
            toast.error(error)

        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        try {

            const placeData = {
                name,
                pricePerNight: price,
                description,
                address,
                checkIn: Number(checkIn),
                checkOut: Number(checkOut),
                guestCapacity: Number(guestCapacity),
                numOfBeds: Number(numOfBeds),
                internet,
                airConditioned,
                petsAllowed,
                parking,
                entertainment,
                kitchen,
                refrigerator,
                washer,
                dryer,
                selfCheckIn,
                images
            }

            if (images.length === 0) return toast.error('Please upload images.')

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(placeData);
            Create(placeData, config).then(function (success) {
                if (success) {
                    router.push('/admin/places')
                }
            })

        } catch (error) {
            toast.error(error)
        }
    }

    const onChange = (e) => {

        const files = Array.from(e.target.files)

        setImages([]);
        setImagesPreview([]);

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result]);
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                }
            }
            reader.readAsDataURL(file)

        })
    }
    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-8">
                    <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                        <h1 className="mb-4 text-center">New Place</h1>
                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price_field">Price</label>
                            <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description_field">Description</label>
                            <textarea
                                className="form-control"
                                id="description_field"
                                rows="8"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkIn_field">Check-in</label>
                            <select
                                className="form-control"
                                id="checkIn_field"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkOut_field">Checkout</label>
                            <select
                                className="form-control"
                                id="checkOut_field"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category_field">Guest Capacity</label>
                            <select
                                className="form-control"
                                id="guest_field"
                                value={guestCapacity}
                                onChange={(e) => setGuestCapacity(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>


                        <div className="form-group">
                            <label htmlFor="category_field">Number of Beds</label>
                            <select
                                className="form-control"
                                id="numofbeds_field"
                                value={numOfBeds}
                                onChange={(e) => setNumOfBeds(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>


                        <label className="mb-3">Place Features</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="internet_checkbox"
                                value={internet}
                                onChange={(e) => setInternet(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="internet_checkbox">
                                Internet
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="parking_checkbox"
                                value={parking}
                                onChange={(e) => setParking(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="parking_checkbox">
                                Free parking on premises
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="airConditioned_checkbox"
                                value={airConditioned}
                                onChange={(e) => setAirConditioned(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="airConditioned_checkbox">
                                Air Conditioned
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="petsAllowed_checkbox"
                                value={petsAllowed}
                                onChange={(e) => setPetsAllowed(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="petsAllowed_checkbox">
                                Pets Allowed
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="entertainment_checkbox"
                                value={entertainment}
                                onChange={(e) => setEntertainment(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="entertainment_checkbox">
                                Entertainment
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="kitchen_checkbox"
                                value={kitchen}
                                onChange={(e) => setKitchen(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="kitchen_checkbox">
                                Kitchen
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="refrigerator_checkbox"
                                value={refrigerator}
                                onChange={(e) => setRefrigerator(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="refrigerator_checkbox">
                                Refrigerator
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="washer_checkbox"
                                value={washer}
                                onChange={(e) => setWasher(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="washer_checkbox">
                                Washer
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="dryer_checkbox"
                                value={washer}
                                onChange={(e) => setDryer(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="dryer_checkbox">
                                Dryer
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="selfCheckIn_checkbox"
                                value={washer}
                                onChange={(e) => setSelfCheckIn(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="selfCheckIn_checkbox">
                                Self check-In
                            </label>
                        </div>

                        <div className="form-group mt-4">
                            <label>Images</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    name="room_images"
                                    className="form-control"
                                    id="customFile"
                                    onChange={onChange}
                                    multiple
                                />
                                <label className="custom-file-label" htmlFor="customFile">
                                    Choose Images
                                </label>
                            </div>

                            {imagesPreview.map(img => (

                                <img
                                    src={img}
                                    key={img}
                                    alt="Images Preview"
                                    className="mt-3 mx-2"
                                    width="55"
                                    height="52"
                                />

                            ))}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-outline-dark btn-lg btn-block mt-3"
                        // disabled={loading ? true : false}
                        >
                            {/* {loading ? <ButtonLoader /> : 'CREATE'} */}
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div >
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

export default NewPlace