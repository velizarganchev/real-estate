import React from 'react'

export default function PlaceFeatures({place}) {
    return (
        <>
            <h6 className="mb-4">This is what this accommodation offers you</h6>
            <ul className="d-sm-flex list-unstyled">
                <li className="px-2">
                    <i className="fa-solid fa-utensils"></i> -
                    Kitchen - <i
                        className={place.kitchen ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                        aria-hidden="true"
                    ></i>
                </li>
                <li className="px-2">
                    <i className="fa-solid fa-wifi"></i> -
                    Wifi - <i
                        className={place.internet ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                        aria-hidden="true"
                    ></i>
                </li>
                <li className="px-2">
                    <i className="fa-solid fa-square-parking"></i> -
                    Free parking - <i
                        className={place.parking ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                        aria-hidden="true"
                    ></i>
                </li>
                <li className="px-2">
                    <i className="fa-solid fa-tv"></i> -
                    TV - <i
                        className={place.entertainment ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                        aria-hidden="true"
                    ></i>
                </li>
                <li className="px-2">
                    <i className="fa-solid fa-fan"></i> -
                    Air conditioning - <i
                        className={place.airConditioned ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                        aria-hidden="true"
                    ></i>
                </li>
                <li className="px-2">
                    <i className="fa-solid fa-paw"></i> -
                    Pets Allowed - <i
                        className={place.petsAllowed ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                        aria-hidden="true"
                    ></i>
                </li>
                <li className="px-2" >
                    <i className="fa-solid fa-soap"></i> -
                    Washer - <i
                        className={place.washer ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                        aria-hidden="true"
                    ></i>
                </li>
                <li className="px-2">
                    <i className="fa-solid fa-temperature-high"></i> -
                    Dryer  - <i
                        className={place.dryer ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                        aria-hidden="true"
                    ></i>
                </li>
                <li className="px-2">
                    <i className="fa-solid fa-snowflake"></i> -
                    Refrigerator - <i
                        className={place.refrigerator ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                        aria-hidden="true"
                    ></i>
                </li>
            </ul>
        </>
    )
}
