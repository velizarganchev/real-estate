import Link from "next/link";

export default function Baner() {
    return (
        <section id="about" className="about m-2 p-3 text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12 ps-lg-5 mt-md-5">
                        <div className="about-text">
                            <h2>We Provide Beste Quality <br /> Servise Ever</h2>
                            <p>
                                We understand that finding comfortable and convenient housing for your business or vacation needs can be a daunting task, which is why we are here to simplify the process for you!
                                Our mission is to provide top-quality housing solutions that cater to the unique needs of business executives, travelers, and families.
                            </p>
                            <Link href="/about" className="btn btn-outline-dark">About Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
