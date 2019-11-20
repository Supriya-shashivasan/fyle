import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import request from 'axios';

import Table from './table'
import '../App.css'

class Favorites extends Component{
    constructor(props) {
        super()
    }
    render() {
        var favs = JSON.parse(localStorage.getItem("banks"));
        return (
            <div className="main">
                <h1>My favorites</h1>
                <Table banks={favs} perPage={favs.length} currentPage={1} />
            </div>
        )
    }
}

export default Favorites;