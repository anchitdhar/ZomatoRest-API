import React from 'react'
import CityCard from './CityCard'

function CityLists(props) {
    return (
        <>
            <div className="row">
                {
                    (!props.restaurants) ?
                        (<div className="col">
                            <p>Loading ...</p>
                        </div>
                        ) : (
                            props.restaurants.map(item => {
                                return (
                                    <CityCard key={item.id} restaurant={item.restaurant} deleteItem={props.deleteItem} moveToTop={props.moveToTop} updateSelectStatus={props.updateSelectStatus}/>
                                )
                            })
                        )
                }
            </div>
        </>
    )
}

export default CityLists
