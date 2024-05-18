import classes from "./Testimonials.module.css";

function Testimonials() {
    return (
        <div className={classes.testimonial_area}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className={`${classes.section_header} text-center`}>
                            <h4>Testimonials</h4>
                            <h2>What Clients Says</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat at animi unde, et, obcaecati eius.</p>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="carousel slide" data-bs-ride="true" id="carouselExampleIndicators">
                            <div className={`carousel-indicators ${classes.carousel_indicators}`}>
                                <button aria-label="Slide 1" className="active" data-bs-slide-to="0" data-bs-target="#carouselExampleIndicators" type="button"></button> <button aria-label="Slide 2" data-bs-slide-to="1" data-bs-target="#carouselExampleIndicators" type="button"></button> <button aria-label="Slide 3" data-bs-slide-to="2" data-bs-target="#carouselExampleIndicators" type="button"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className={classes.icon_area}>
                                        <i className="fa fa-comments"></i>
                                    </div>
                                    <div className={`${classes.content} text-center`}>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit reiciendis necessitatibus laborum numquam consequuntur possimus magnam expedita ipsam illum voluptatem quia assumenda placeat, at asperiores vitae obcaecati. Reprehenderit nesciunt voluptatem excepturi, libero ipsum tempora perspiciatis.</p>
                                        <div className={classes.person}><img alt="" src="/images/iva-about.jpg" /></div>
                                        <h5>David Jones</h5>
                                        <h6>Web Developer</h6>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className={classes.icon_area}>
                                        <i className="fa fa-comments"></i>
                                    </div>
                                    <div className={`${classes.content} text-center`}>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit reiciendis necessitatibus laborum numquam consequuntur possimus magnam expedita ipsam illum voluptatem quia assumenda placeat, at asperiores vitae obcaecati. Reprehenderit nesciunt voluptatem excepturi, libero ipsum tempora perspiciatis.</p>
                                        <div className={classes.person}><img alt="" src="/images/sierrahScarpin.jpg" /></div>
                                        <h5>Martin Thomas</h5>
                                        <h6>Graphics Designer</h6>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className={classes.icon_area}>
                                        <i className="fa fa-comments"></i>
                                    </div>
                                    <div className={`${classes.content} text-center`}>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit reiciendis necessitatibus laborum numquam consequuntur possimus magnam expedita ipsam illum voluptatem quia assumenda placeat, at asperiores vitae obcaecati. Reprehenderit nesciunt voluptatem excepturi, libero ipsum tempora perspiciatis.</p>
                                        <div className={classes.person}><img alt="" src="/images/sierrahScarpin.jpg" /></div>
                                        <h5>Luke Jobs</h5>
                                        <h6>UI/UX Designer</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Testimonials;