import classes from "./Specialties.module.css"

export default function Specialties() {
    return (
        <div className={classes.service} id="service">
            <div className={classes.section_header}>
                <h2>Our Services</h2>
                <p>We offer a wide range of specialized housing solutions to cater to the unique needs of our clients. We understand that business travel and relocation can be stressful,
                    which is why we offer tailored accommodations to ensure a comfortable and enjoyable stay!</p>
            </div>
            <div className={classes.service_content}>
                <div className={classes.single_service}>
                    <img src="images/carusel/1.jpg" alt="" />
                    <h2>Family-friendly Rentals</h2>
                    <p>We offer a range of family-friendly
                        rentals that are equipped with amenities such as game rooms,
                        bunk beds, and outdoor play areas to ensure that families have a memorable and enjoyable vacation together.</p>
                </div>
                <div className={classes.single_service}>
                    <img src="images/carusel/2.jpg" alt="" />
                    <h2>Executive Housing</h2>
                    <p> We provide executive housing solutions for business travelers who need a comfortable and convenient place to stay while on the road.
                        Our accommodations are fully furnished and equipped with modern amenities to ensure that our clients can focus on their work and stay productive.</p>
                </div>
                <div className={classes.single_service}>
                    <img src="images/carusel/3.jpg" alt="" />
                    <h2>Temporary Housing</h2>
                    <p>We provide temporary housing solutions for individuals or families who need a comfortable and convenient place to stay during a transitional period.
                        Whether you are in between homes, renovating your current home, or relocating to a new city,
                        we can help you find the perfect temporary housing solution.</p>
                </div>
            </div>
        </div>
    )
}



{/* <section id="services" className="services section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header text-center pb-5">
                            <h1>Our Services</h1>
                            <p>We offer a wide range of specialized housing solutions to cater to the unique needs of our clients. We understand that business travel and relocation can be stressful,
                                which is why we offer tailored accommodations to ensure a comfortable and enjoyable stay!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-4 mb-3">
                        <div className="card text-dark text-center bg-light pb-2">
                            <div className="card-body">
                                <i className="bi bi-subtract"></i>
                                <h3 className="card-title">Family-friendly Rentals</h3>
                                <p className="lead">
                                    We offer a range of family-friendly
                                    rentals that are equipped with amenities such as game rooms,
                                    bunk beds, and outdoor play areas to ensure that families have a memorable and enjoyable vacation together.
                                </p>
                                {/* <button className="btn btn-warning text-dark">Read More</button> */}
//                         </div >
//                     </div >
//                 </div >
//                 <div className="col-12 col-md-12 col-lg-4 mb-3">
//                     <div className="card text-dark text-center bg-light pb-2">
//                         <div className="card-body">
//                             <i className="bi bi-slack"></i>
//                             <h3 className="card-title">Executive Housing</h3>
//                             <p className="lead">
//                                 We provide executive housing solutions for business travelers who need a comfortable and convenient place to stay while on the road.
//                                 Our accommodations are fully furnished and equipped with modern amenities to ensure that our clients can focus on their work and stay productive.
//                             </p>
//                             {/* <button className="btn btn-warning text-dark">Read More</button> */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-12 col-md-12 col-lg-4 mb-3">
//                     <div className="card text-dark text-center bg-light pb-2">
//                         <div className="card-body">
//                             <i className="bi bi-house-heart"></i>
//                             <h3 className="card-title">Temporary Housing</h3>
//                             <p className="lead">
//                                 We provide temporary housing solutions for individuals or families who need a comfortable and convenient place to stay during a transitional period.
//                                 Whether you are in between homes, renovating your current home, or relocating to a new city,
//                                 we can help you find the perfect temporary housing solution.
//                             </p>
//                             {/* <button className="btn btn-warning text-dark">Read More</button> */}
//                         </div>
//                     </div>
//                 </div>
//             </div >
// <div className="row">
//     <div className="col-md-12">
//         <div className="section-header text-center pb-5">
//             <p>
//                 We take pride in providing customized and specialized housing solutions to meet the unique needs of our clients.
//                 Contact us today to learn more about how we can help you find the perfect housing solution for your needs!
//             </p>
//         </div>
//     </div>
// </div>
//         </div >
//     </section > * /}