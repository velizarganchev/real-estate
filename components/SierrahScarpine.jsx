import Image from "next/image";

export default function AboutScarpine() {
    return (
        <section id="about" className="about section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-12">
                        <div className="about-img">
                            <Image src="/images/sierrahScarpin.jpg" alt="" className="img-fluid" width={400} height={300} />
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 col-12 ps-lg-5 mt-md-5">
                        <div className="about-text">
                            <h2>Sierrah Scarpine</h2>
                            <p>
                                Meet Sierrah Scarpine, a dedicated and experienced commercial real estate agent with multiple years of experience in the industry. Sierrah`s background in business marketing and real estate, combined with my commitment to client satisfaction, has helped her build a strong reputation in the industry.
                                <br /><br />As a lifelong resident of Orange County, Sierrah has an intimate understanding of the community and the nuances of the local real estate market. Her clients appreciate her attention to detail, her communication skills, and her commitment to their satisfaction.
                                <br /><br /> Sierrah`s passion for real estate began early on when she worked as a property manager for short-term vacation rentals. She quickly discovered her love for designing homes and helping people find the perfect place for their stay. Since then, Sierrah has built her portfolio with three properties, managing multiple corporate housing rentals, and building a reputation as a successful real estate agent.
                            </p>
                            {/* <a href="" className="btn btn-warning">Learn More</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
