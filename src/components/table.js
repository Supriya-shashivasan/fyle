import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// import request from 'axios';

import Bank from './bank'

import '../App.css'
class Table extends Component {
    constructor() {
        super();
        this.addToFav=this.addToFav.bind(this)
        // this.favList = [];
        this.state={
            favList:[]
        }
    }

    componentDidMount() {
        var list = JSON.parse(localStorage.getItem("banks") || "[]").map(bank => bank.ifsc)
        this.setState({
            favList:list
        })
    }

    addToFav(e, bank){
        console.log(e.target)
        var banks = JSON.parse(localStorage.getItem("banks") || "[]");
        var filtered=banks.filter(function (row) {
            return row.ifsc==bank.ifsc
        })

        if(filtered.length==0){
            var list = this.state.favList
            list.push(bank.ifsc)
            this.setState({
                favList:list
            })            
            banks.push(bank);
            localStorage.setItem("banks", JSON.stringify(banks));
            console.log("wowza", JSON.parse(localStorage.getItem("banks") || "[]"))
            // e.target.value ="Favorite"
        }else{
            for (var i = 0; i < banks.length; i++) {
                if (banks[i].ifsc == bank.ifsc) {
                    banks.splice(i, 1);
                    localStorage.setItem("banks", JSON.stringify(banks));
                    var index = this.state.favList.indexOf(bank.ifsc);
                    var list=this.state.favList
                    if (index > -1) {
                        list.splice(index, 1);
                    }
                    this.setState({
                        favList:list
                    })
                    console.log("wowza", JSON.parse(localStorage.getItem("banks") || "[]"))
                    // e.target.value = "Add to Favorites"

                }

            }
        }
        
    }
    render() {
        const banks = this.props.banks;
        const indexOfLastBank = this.props.currentPage * this.props.perPage;
        const indexOfFirstBank = indexOfLastBank - this.props.perPage;
        const currentBank = this.props.banks.slice(indexOfFirstBank, indexOfLastBank);
        return (
            // <Router>
            <div className="data">
                <ul className="row">
                    <li className="fav"><b>Favorites</b></li>                
                    <li className="ifsc"><b>IFSC</b></li>
                    <li className="bname"><b>Bank Name</b></li>
                    <li className="address"><b>Address</b></li>
                </ul>
                {
                    currentBank.map(bank => {
                        var link = {
                            pathname: "/bank/" + bank.ifsc,
                            bankDetails: bank
                        };
                        return <ul className="row">
                            <li className="fav" onClick={(e) => { this.addToFav(e,bank) }}>{ this.state.favList.indexOf(bank.ifsc) >= 0 ? 'Favorited' : 'Add to favourite' }</li>                        
                            <li className="ifsc"><Link to={link} style={{ color: 'black', textDecoration: 'none' }} >{bank.ifsc}</Link></li>
                            <li className="bname">{bank.bank_name}</li>
                            <li className="address">{bank.address}</li>                        
                            
                        </ul>
                    })
                }
            </div>
        )
    }
}

export default Table;