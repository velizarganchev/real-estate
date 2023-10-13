import Image from 'next/image';
import Loader from '../../../components/layout/Loader';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import useSWR, { mutate } from "swr";
import axios from 'axios';

import { toast } from 'react-toastify';

const UpdatePlace = () => {

    const router = useRouter()

    const [form, setForm] = useState({
        id: '',
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
        images: []
    });

    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const { id } = router.query;
    const [origin, setOrigin] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const { data, error, isLoading: isPlaceLoading } = useSWR(`/api/places/${id}`,
        (url) => fetch(url).then((res) => res.json()));


    useEffect(() => {

        const { origin } = window.location;
        setOrigin(origin);

        if (data) {
            setForm({
                ...form,
                id: id,
                name: data.place.name,
                pricePerNight: data.place.pricePerNight,
                description: data.place.description,
                city: data.place.city,
                address: data.place.address,
                checkIn: data.place.checkIn,
                checkOut: data.place.checkOut,
                guestCapacity: data.place.guestCapacity,
                numOfBeds: data.place.numOfBeds,
                internet: data.place.internet,
                parking: data.place.parking,
                airConditioned: data.place.airConditioned,
                petsAllowed: data.place.petsAllowed,
                entertainment: data.place.entertainment,
                kitchen: data.place.kitchen,
                washer: data.place.washer,
                refrigerator: data.place.refrigerator,
                dryer: data.place.dryer,
                selfCheckIn: data.place.selfCheckIn,
            })
            setOldImages(data.place.images)
        }
        if (error) {
            toast.error(error);
        }
    }, [error, data]);

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
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const placeData = {
            id: form.id,
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
        };

        if (images.length !== 0) placeData.images = images;

        try {
            setIsLoading(true);

            const response = await axios.put(`${origin}/api/places/${id}`, placeData);

            if (response.data.success) {
                mutate(`/api/admin/places`);
                router.push('/admin/places');
            } else {
                console.error('Update failed:', response.data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false);
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
            setOldImages([]);
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
            {
                isPlaceLoading ?
                    <Loader />
                    :
                    <div className="row wrapper">
                        <div className="col-10 col-lg-8">
                            <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                                <h1 className="mb-4 text-center">Update Place</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        name='name'
                                        className="form-control"
                                        defaultValue={form.name}
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
                                        defaultValue={form.pricePerNight}
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
                                        defaultValue={form.description}
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
                                        defaultValue={form.address}
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
                                        defaultValue={form.checkIn}
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
                                        defaultValue={form.checkOut}
                                        onChange={handleChange}
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
                                        name='guestCapacity'
                                        id="guest_field"
                                        defaultValue={form.guestCapacity}
                                        onChange={handleChange}
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
                                        name='numOfBeds'
                                        id="numofbeds_field"
                                        defaultValue={form.numOfBeds}
                                        onChange={handleChange}
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
                                        name='internet'
                                        id="internet_checkbox"
                                        onChange={handleChange}
                                        checked={form.internet}
                                    />
                                    <label className="form-check-label" htmlFor="internet_checkbox">
                                        Internet
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        name='parking'
                                        type="checkbox"
                                        id="parking_checkbox"
                                        onChange={handleChange}
                                        checked={form.parking}
                                    />
                                    <label className="form-check-label" htmlFor="parking_checkbox">
                                        Free parking on premises
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        name='airConditioned'
                                        type="checkbox"
                                        id="airConditioned_checkbox"
                                        onChange={handleChange}
                                        checked={form.airConditioned}
                                    />
                                    <label className="form-check-label" htmlFor="airConditioned_checkbox">
                                        Air Conditioned
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        name='petsAllowed'
                                        type="checkbox"
                                        id="petsAllowed_checkbox"
                                        onChange={handleChange}
                                        checked={form.petsAllowed}
                                    />
                                    <label className="form-check-label" htmlFor="petsAllowed_checkbox">
                                        Pets Allowed
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        name='entertainment'
                                        type="checkbox"
                                        id="entertainment_checkbox"
                                        onChange={handleChange}
                                        checked={form.entertainment}
                                    />
                                    <label className="form-check-label" htmlFor="entertainment_checkbox">
                                        Entertainment
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        name='kitchen'
                                        type="checkbox"
                                        id="kitchen_checkbox"
                                        onChange={handleChange}
                                        checked={form.kitchen}
                                    />
                                    <label className="form-check-label" htmlFor="kitchen_checkbox">
                                        Kitchen
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        name='refrigerator'
                                        type="checkbox"
                                        id="refrigerator_checkbox"
                                        onChange={handleChange}
                                        checked={form.refrigerator}
                                    />
                                    <label className="form-check-label" htmlFor="refrigerator_checkbox">
                                        Refrigerator
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        name='washer'
                                        type="checkbox"
                                        id="washer_checkbox"
                                        onChange={handleChange}
                                        checked={form.washer}
                                    />
                                    <label className="form-check-label" htmlFor="washer_checkbox">
                                        Washer
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        name='dryer'
                                        type="checkbox"
                                        id="dryer_checkbox"
                                        onChange={handleChange}
                                        checked={form.dryer}
                                    />
                                    <label className="form-check-label" htmlFor="dryer_checkbox">
                                        Dryer
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        name='selfCheckIn'
                                        type="checkbox"
                                        id="selfCheckIn_checkbox"
                                        onChange={handleChange}
                                        checked={form.selfCheckIn}
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

                                        <Image
                                            src={img}
                                            key={img}
                                            alt="Images Preview"
                                            className="mt-3 mx-2"
                                            width="55"
                                            height="52"
                                        />

                                    ))}
                                    {oldImages && oldImages.map(img => (

                                        <Image
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
                                    disabled={isLoading ? true : false}
                                >
                                    {isLoading ?
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        : 'UPDATE'}
                                </button>
                            </form>
                        </div>
                    </div>
            }
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

export default UpdatePlace