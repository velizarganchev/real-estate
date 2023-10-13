import { useState } from "react";

import ContactForm from "./ContactForm";

export default function Contact() {

    return (
        <div>
            <h2 className='text-center m-4'>Contact</h2>
            <div className='row d-flex justify-content-around'>
                <div className='col-md-8 col-sm-12 col-xs-12'>
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
