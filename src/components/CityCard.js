import React from 'react'

function CityCard(props) {
    var deleteCurrent = function(e) {
        props.deleteItem(props.restaurant.id)
    }
    var moveItemToTop = function(e) {
        props.moveToTop(props.restaurant.id)
    }
    var changeSelectStatus = function(e) {
        if (props.restaurant.is_selected) {
            var obj = {
                id: props.restaurant.id,
                status: false,
            }
            props.updateSelectStatus(obj)
        }
        else {
            var obj = {
                id: props.restaurant.id,
                status: true,
            }
            props.updateSelectStatus(obj)
        }
    }
    return (
        <div className="col-12">
            <div className="card" style={{display:"table", width:"100%",background:props.restaurant.is_selected?"rgba(0,0,0,0.14)":"None"}}>
                 <div className="card-body" style={{display:"table-cell", width:"60%"}}>
                    <h4 className="card-title">
                        {props.restaurant.name}
                    </h4>
                    <p className="card-text">{props.restaurant.location.address}</p>
                </div>
                <div style={{display:"table-cell", width:"40%", verticalAlign:"middle"}}>
                    <button className="btn btn-danger" onClick={deleteCurrent}>Delete</button>
                    
                    <button className="btn btn-danger" onClick={moveItemToTop}
                        style={{marginLeft:"4px"}} >MoveToTop</button>
                    <button className="btn btn-success" style={{marginLeft:"4px"}} onClick={changeSelectStatus}>{props.restaurant.is_selected ? 'Selected': 'Select'}</button>
                </div>
            </div>
        </div>
    )
}

export default CityCard
