import React, { Component } from 'react'
import ImageAndWelcome from '../components/ImageAndWelcome';
import CityLists from '../components/CityLists'
import SearchCity from '../components/SearchCity'
import Axios from 'axios'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            keyword: '',
            citiesResultSearch: [],
            cityKeywordSearch: '',
            selectedRestaurants:[],
        }

        this.changeKeywordHandler = this.changeKeywordHandler.bind(this)
        this.searchHandler = this.searchHandler.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.moveToTop = this.moveToTop.bind(this)
        this.updateSelectStatus = this.updateSelectStatus.bind(this)
        this.bulkDelete = this.bulkDelete.bind(this)
        this.bulkMove = this.bulkMove.bind(this)
    }
    
    bulkMove() {
        if (this.state.selectedRestaurants.length === 0) return;
        var selectedIds = this.state.selectedRestaurants;
        for (var i=selectedIds.length-1;i >=0; i--){
            this.moveToTop(selectedIds[i])
            this.updateSelectStatus({id: selectedIds[i], status: false})
        }
        this.setState({
            selectedRestaurants: [],
        })
    }
    
    bulkDelete() {
        if (this.state.selectedRestaurants.length === 0) return;
        var selectedIds = this.state.selectedRestaurants;
        var updatedRes = this.state.citiesResultSearch;
        updatedRes = updatedRes.filter(item => !selectedIds.includes(item.restaurant.id))
        this.setState({
            citiesResultSearch: updatedRes,
            selectedRestaurants: [],
        })
    }

    updateSelectStatus(obj) {
        var id = obj.id;
        var status = obj.status;
        var updatedRes = this.state.citiesResultSearch;
        var selected = this.state.selectedRestaurants;
        updatedRes.map(item => {
            if (item.restaurant.id === id) {
                item.restaurant.is_selected = status;
                if (status === true) selected.push(id);
                else {
                    var index = selected.indexOf(id);
                    if (index > -1) selected.splice(index, 1);
                }
            }
        });
        
        this.setState({
            citiesResultSearch: updatedRes,
            selectedRestaurants: selected,
        })
    }

    moveToTop(id) {
        if (this.state.citiesResultSearch.length == 0 ) return;
        var updatedRes = this.state.citiesResultSearch;
        updatedRes.forEach((item, i) => {
            if (item.restaurant.id === id) {
                updatedRes.splice(i, 1);
                updatedRes.unshift(item);
            }
        })
        this.setState({
            citiesResultSearch: updatedRes,
        })
    }

    deleteItem(id) {
        if (this.state.citiesResultSearch.length == 0 ) return;
        var updatedRes = this.state.citiesResultSearch.filter(item => {
            return item.restaurant.id !== id
        });
        this.setState({
            citiesResultSearch: updatedRes
        })
    }

    changeKeywordHandler(event) {
        this.setState({ keyword: event.target.value })
        console.log("from search city component", this.state.keyword)
    }

    searchHandler = () => {
        const zomato_url = 'https://developers.zomato.com/api/v2.1/search?count=15'
        Axios.get(zomato_url, {
            headers: {
                "user-key": 'af0beadb1a6488d68cda137bc487a08e'
            },
            params: {
                "q": this.state.keyword
            }
        }).then(data => {
            this.setState({
                citiesResultSearch: data.data.restaurants,
                cityKeywordSearch: this.state.keyword,
                keyword: '',
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <ImageAndWelcome />
                <div className="container">
                    <SearchCity value={this.state.keyword} onChange={this.changeKeywordHandler} onClick={this.searchHandler}/>
                    <div className="bulk buttons" style={{marginBottom: "10px"}}>
                        <button className="btn btn-warning" onClick={this.bulkDelete}>Bulk Delete</button>
                        <button style={{marginLeft:"5px"}} className="btn btn-warning" onClick={this.bulkMove}>Bulk Move To Top</button>
                    </div>
                    <CityLists restaurants={this.state.citiesResultSearch} title={'Search Result'} subtitle={this.state.cityKeywordSearch} showSubtitle={true} deleteItem={this.deleteItem} moveToTop={this.moveToTop} updateSelectStatus={this.updateSelectStatus}/>
                </div>
            </>
        )
    }
}

export default Home
