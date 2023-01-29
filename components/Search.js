
export default function Search() {
    return (
        <div className="d-flex justify-content-center my-5">
            <form className="row d-flex align-items-center">
                <div className="col-auto">
                    <div class="input-group mb-3">
                        <input type="date" class="form-control" id="from" />
                        <input type="date" class="form-control" id="to" />
                        <input type="number" class="form-control" placeholder="Adult" id="adult" />
                        <input type="number" class="form-control" placeholder="kids" id="kids" />

                        <button class="btn btn-primary" type="button" id="button-addon2">Button</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
