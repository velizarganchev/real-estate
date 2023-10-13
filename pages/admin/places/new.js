import Image from 'next/image'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import { mutate } from "swr";
import axios from 'axios'

import { toast } from 'react-toastify';


const NewPlace = () => {

    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        pricePerNight: '',
        description: '',
        city: '',
        address: '',
        checkIn: 3,
        checkOut: 10,
        guestCapacity: 1,
        numOfBeds: 1,
        internet: false,
        parking: false,
        airConditioned: false,
        petsAllowed: false,
        entertainment: false,
        kitchen: false,
        washer: false,
        refrigerator: false,
        dryer: false,
        selfCheckIn: false,
    });

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [origin, setOrigin] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const { origin } = window.location;
        setOrigin(origin);
    }, []);

    const handleChange = (e) => {

        const { name, type, value, checked } = e.target;

        setForm((prev) => {

            if (type === "checkbox") {
                return {
                    ...prev,
                    [name]: checked,
                };
            } else {
                return {
                    ...prev,
                    [name]: value
                };
            }
        });
    };

    const submitHandler = (e) => {
        e.preventDefault()

        const placeData = {
            name: form.name,
            pricePerNight: form.pricePerNight,
            description: form.description,
            city: form.city,
            address: form.address,
            checkIn: Number(form.checkIn),
            checkOut: Number(form.checkOut),
            guestCapacity: Number(form.guestCapacity),
            numOfBeds: Number(form.numOfBeds),
            internet: form.internet,
            airConditioned: form.airConditioned,
            petsAllowed: form.petsAllowed,
            parking: form.parking,
            entertainment: form.entertainment,
            kitchen: form.kitchen,
            refrigerator: form.refrigerator,
            washer: form.washer,
            dryer: form.dryer,
            selfCheckIn: form.selfCheckIn,
            images
        }

        if (images.length === 0) return toast.error('Please upload images.');

        try {
            setIsLoading(true);

            axios.post(`${origin}/api/places`, placeData).then((response) => {
                if (response.data.success) {
                    mutate(`/api/admin/places`);
                    setIsLoading(false);

                    router.push('/admin/places');
                }
            });

        } catch (error) {
            console.log(error)
        }
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        const maxSize = 2 * 1024 * 1024; // 2 MB (adjust as needed)

        const validFiles = files.filter((file) => file.size <= maxSize);

        if (validFiles.length < files.length) {

            toast.error('Some files are too large.');
            console.error('Some files are too large.');
        } else {

            setImages([]);
            setImagesPreview([]);

            validFiles.forEach((file) => {
                const reader = new FileReader();

                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setImages((oldArray) => [...oldArray, reader.result]);
                        setImagesPreview((oldArray) => [...oldArray, reader.result]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

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
                                name='name'
                                id="name_field"
                                className="form-control"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price_field">Price</label>
                            <input
                                type="text"
                                name='pricePerNight'
                                id="price_field"
                                className="form-control"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description_field">Description</label>
                            <textarea
                                className="form-control"
                                name='description'
                                id="description_field"
                                rows="8"
                                value={form.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                name='city'
                                id="city_field"
                                className="form-control"
                                value={form.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address_field">Street</label>
                            <input
                                type="text"
                                name='address'
                                id="address_field"
                                className="form-control"
                                value={form.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkIn_field">Check-in</label>
                            <select
                                className="form-control"
                                name='checkIn'
                                id="checkIn_field"
                                value={form.checkIn}
                                onChange={handleChange}
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
                                name='checkOut'
                                id="checkOut_field"
                                value={form.checkOut}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category_field">Number of Beds</label>
                            <select
                                className="form-control"
                                name='numOfBeds'
                                id="numofbeds_field"
                                value={form.numOfBeds}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category_field">Guest Capacity</label>
                            <select
                                className="form-control"
                                name='guestCapacity'
                                id="guest_field"
                                value={form.guestCapacity}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <label className="mb-3">Place Features</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name='internet'
                                id="internet_checkbox"
                                value={form.internet}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="internet_checkbox">
                                Internet
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name='parking'
                                id="parking_checkbox"
                                value={form.parking}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="parking_checkbox">
                                Free parking on premises
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name='airConditioned'
                                id="airConditioned_checkbox"
                                value={form.airConditioned}
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
                                name='petsAllowed'
                                id="petsAllowed_checkbox"
                                value={form.petsAllowed}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="petsAllowed_checkbox">
                                Pets Allowed
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name='entertainment'
                                id="entertainment_checkbox"
                                value={form.entertainment}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="entertainment_checkbox">
                                Entertainment
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name='kitchen'
                                id="kitchen_checkbox"
                                value={form.kitchen}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="kitchen_checkbox">
                                Kitchen
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name='refrigerator'
                                id="refrigerator_checkbox"
                                value={form.refrigerator}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="refrigerator_checkbox">
                                Refrigerator
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name='washer'
                                id="washer_checkbox"
                                value={form.washer}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="washer_checkbox">
                                Washer
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name='dryer'
                                id="dryer_checkbox"
                                value={form.dryer}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="dryer_checkbox">
                                Dryer
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name='selfCheckIn'
                                id="selfCheckIn_checkbox"
                                value={form.selfCheckIn}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="selfCheckIn_checkbox">
                                Self check-In
                            </label>
                        </div>

                        <div className="form-group mt-4">
                            <label className="custom-file-label" htmlFor="customFile">
                                Choose Images
                            </label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    name="room_images"
                                    className="form-control"
                                    id="customFile"
                                    onChange={onChange}
                                    multiple
                                />

                            </div>

                            {imagesPreview.map(img => (

                                <Image
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
                            disabled={isLoading ? true : false}
                        >
                            {isLoading ?
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                : 'CREATE'}
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}

export async function getServerSideProps({ req, res }) {

    const session = await getServerSession(req, res, authOptions)

    if (!session || session.user.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {
            session
        }
    }

}

export default NewPlace