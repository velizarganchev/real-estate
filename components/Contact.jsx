
export default function Contact() {
    return (
        <div>
            <h2 className='text-center mb-4'>Contact</h2>
            <div className='row d-flex justify-content-around'>
                <div className='col-md-8 col-sm-12 col-xs-12'>
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
                        <button type="submit" className="btn btn-outline-dark btn-block mb-4">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
