export default function DeleteModal(props) {
    return (
        <>
            <button
                type="button"
                className="btn btn-danger mx-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal">
                <i className="fa fa-trash"></i>
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete {props.placeName}!</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-outline-danger mx-2"
                                onClick={props.onClick}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
