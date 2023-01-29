
export default function Search() {
    return (
        <div className="d-flex justify-content-center my-5">
            <form className="row d-flex align-items-center">
                <div className="col-auto">
                    <div className="input-group mb-3">
                        <input type="date" className="form-control" id="from" />
                        <input type="date" className="form-control" id="to" />
                        <input type="number" className="form-control" placeholder="Adult" id="adult" />
                        <input type="number" className="form-control" placeholder="kids" id="kids" />

                        <button className="btn btn-primary" type="button" id="button-addon2">Button</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
