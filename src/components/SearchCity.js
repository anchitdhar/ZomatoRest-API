import React from 'react'

function SearchCity(props) {
    return (
        <div style={{ marginTop: "20px" , marginBottom: "20px"}}>
            <h1>Search City</h1>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-11">
                            <input type="text" className="form-control" placeholder="Type keyword or city name"
                            value={props.value}
                            onChange={props.onChange}
                            />
                        </div>
                        <div className="col">
                            <button className="btn btn-dark" type="button" onClick={props.onClick}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchCity