import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import request from 'axios';

import '../App.css'


class Bank extends Component {
    constructor(props) {
        super()
    }
    render() {
        var list = this.props.location.bankDetails;
        // console.log("ole",list)
        return (
            <div className="main">
                <h2>Bank Details</h2>
                <p>Bank Name : {list.bank_name}</p>
                <p>Bank IFSC: {list.ifsc}</p>
                <p>Bank Address: {list.address}</p>
                <p>Bank City: {list.city}</p>
            </div>
        )
    }

}
export default Bank;