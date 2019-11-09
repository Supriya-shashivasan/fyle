import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
// import request from 'axios';

import Bank from './bank'

import '../App.css'
class Table extends Component {
    constructor() {
        super();
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
                            <li className="ifsc"><Link to={link} style={{ color: 'black', textDecoration: 'none' }} >{bank.ifsc}</Link></li>
                            <li className="bname">{bank.bank_name}</li>
                            <li className="address">{bank.address}</li>

                        </ul>
                    })
                }
            </div>

            // </Router>


        )
    }
}

export default Table;