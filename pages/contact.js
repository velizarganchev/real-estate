export default function contact() {
    return (
        <div id="contact" class="contact section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="section-header text-center pb-5">
                            <h2>Contact Us</h2>
                            <p>Lorem, ipsum dolor sit amet consectetur <br/> adipisicing elit. Illum qui illo.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row m-0">
                    <div class="col-md-12 p-0 pt-4 p-4 pb-4">
                        <form action="#" class="bg-light p-4 m-auto">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" required placeholder="Your Full name"/>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <input type="email" class="form-control" required placeholder="Your Email address"/>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="mb-3">
                                        <textarea rows="3" required class="form-control"
                                            placeholder="Your Query Here"></textarea>
                                    </div>
                                </div>
                                <button class="btn btn-outline-dark btn-lg btn-block mt-3">Send Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
