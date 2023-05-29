import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import { useGetPlaceQuery } from '../../../redux/placeApiSlice'

import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';


import ButtonLoader from '../../../components/layout/ButtonLoader';

const UpdatePlace = () => {

    const router = useRouter()

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
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const { id } = router.query;
    const { data, error, isError, isLoading } = useGetPlaceQuery(id);

    useEffect(() => {

        if (data) {
            setName(data.place.name)
            setPrice(data.place.pricePerNight)
            setDescription(data.place.description)
            setAddress(data.place.address)
            setCheckIn(data.place.checkIn)
            setCheckOut(data.place.checkOut)
            setGuestCapacity(data.place.guestCapacity)
            setNumOfBeds(data.place.numOfBeds)
            setInternet(data.place.internet)
            setParking(data.place.parking)
            setAirConditioned(data.place.airConditioned)
            setPetsAllowed(data.place.petsAllowed)
            setEntertainment(data.place.entertainment)
            setKitchen(data.place.kitchen)
            setWasher(data.place.washer)
            setRefrigerator(data.place.refrigerator)
            setDryer(data.place.dryer)
            setSelfCheckIn(data.place.selfCheckIn)
            setOldImages(data.place.images)
        }
        if (error) {
            toast.error(error);
        }

    }, [error, data])


    async function Update(id, placeData, config) {
        try {
            return await axios.put(`/api/places/${id}`, placeData, config)
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
            }

            if (images.length !== 0) placeData.images = images

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            Update(id, placeData, config).then(function (success) {
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
        setOldImages([]);
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
                        <h1 className="mb-4 text-center">Update Place</h1>
                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                defaultValue={name}
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
                                defaultValue={price}
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
                                defaultValue={description}
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
                                defaultValue={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkIn_field">Check-in</label>
                            <select
                                className="form-control"
                                id="checkIn_field"
                                defaultValue={checkIn}
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
                                defaultValue={checkOut}
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
                                defaultValue={guestCapacity}
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
                                defaultValue={numOfBeds}
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
                                onChange={(e) => setInternet(e.target.checked)}
                                checked={internet}
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
                                onChange={(e) => setParking(e.target.checked)}
                                checked={parking}
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
                                onChange={(e) => setAirConditioned(e.target.checked)}
                                checked={airConditioned}
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
                                onChange={(e) => setPetsAllowed(e.target.checked)}
                                checked={petsAllowed}
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
                                onChange={(e) => setEntertainment(e.target.checked)}
                                checked={entertainment}
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
                                onChange={(e) => setKitchen(e.target.checked)}
                                checked={kitchen}
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
                                onChange={(e) => setRefrigerator(e.target.checked)}
                                checked={refrigerator}
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
                                onChange={(e) => setWasher(e.target.checked)}
                                checked={washer}
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
                                onChange={(e) => setDryer(e.target.checked)}
                                checked={dryer}
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
                                onChange={(e) => setSelfCheckIn(e.target.checked)}
                                checked={selfCheckIn}
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
                            {oldImages && oldImages.map(img => (

                                <img
                                    src={img.url}
                                    key={img.public_id}
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
                            Update
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

export default UpdatePlace