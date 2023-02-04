
export default function Contact() {
    return (
        <div>
            <h2 className='text-center mt-5 mb-4'>Contact</h2>
            <div className='row'>
                <div className='col-md-6 col-sm-12 col-xs-12'>
                    <form
                    // ref={form} 
                    // onSubmit={sendEmail}
                    >
                        <div className="row form-outline mb-4">
                            <div className="col">
                                <label className="form-label" htmlFor="user_phone">First name</label>
                                <input type="text" className="form-control" name="fname" placeholder="First name" aria-label="First name" />
                            </div>
                            <div className="col">
                                <label className="form-label" htmlFor="user_phone">Last name</label>
                                <input type="text" className="form-control" name="lname" placeholder="Last name" aria-label="Last name" />
                            </div>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="user_email">Email *</label>
                            <input type="email" name="user_email" className="form-control" required />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="message">Write a message</label>
                            <textarea className="form-control" name="message" rows="4" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark btn-block mb-4">Submit</button>
                    </form>
                </div>
                <div className='col-md-6 col-sm-12 col-xs-12'>
                    <div className='map-area'>
                        <iframe
                            title="address"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1887.6132980631814!2d23.327795919082728!3d42.71361875218845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8ff34c8823e7%3A0x18d994b6b2a2ea6f!2sShell!5e0!3m2!1sde!2sde!4v1672039517813!5m2!1sde!2sde"

                            style={{ border: "0", width: "100%", height: "450px" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
