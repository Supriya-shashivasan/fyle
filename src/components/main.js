import React, { Component } from 'react';
import { render } from 'react-dom';
import request from 'axios';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'


import '../App.css'


import Table from './table'
import Bank from './bank'

class Main extends Component {
    constructor() {
        super();

        this.state = {
            message: '',
            city: 'MYSORE',
            searchText: '',
            banks: [],
            list: [],
            perPage: 10,
            currentPage: 1,
            pages: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.search = this.search.bind(this);
        this.handlePerPage = this.handlePerPage.bind(this);
        this.changePage = this.changePage.bind(this);
        this.pageNumbers = this.pageNumbers.bind(this);

    }

    pageNumbers() {
        var pages = [];
        for (var i = 1; i <= Math.ceil(this.state.list.length / this.state.perPage); i++) {
            pages.push(i)
        }
        // console.log(pages)
        this.setState({
            pages: pages
        })
    }

    componentDidMount() {
        request
            .get('https://vast-shore-74260.herokuapp.com/banks?city=' + this.state.city)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    banks: response.data,
                    list: response.data

                }, () => {
                    this.pageNumbers();
                })
            })

    }



    changePage(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({
            city: event.target.value
        });
        console.log(this.state.city)
        request
            .get('https://vast-shore-74260.herokuapp.com/banks?city=' + event.target.value)
            .then(response => {
                // console.log(response.data)
                this.setState({
                    banks: response.data,
                    list: response.data

                }, () => {
                    this.pageNumbers();
                })
            })
    }

    handlePerPage(event) {
        this.setState({ perPage: Number(event.target.value) }, () => {
            var pages = [];
            for (var i = 1; i <= Math.ceil(this.state.list.length / this.state.perPage); i++) {
                pages.push(i)
            }
            this.setState({
                pages: pages
            })
        });

    }

    handleInputChange(event) {
        this.setState({ searchText: event.target.value }, () => {
            this.search()
        });
    }

    search() {
        console.log(this.state.banks)
        var text = this.state.searchText.toUpperCase();
        const updatedList = this.state.banks.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toString().toUpperCase().includes(text)
            );
        });
        console.log("uuwaaaaaaaaaaa", updatedList)
        this.setState({ list: updatedList }, () => {
            this.pageNumbers();
        })
    }

    render() {

        return (
            // <Router>
            <div className="main">
                <h1>Bank list</h1>
                <div className="fill">
                    <select value={this.state.city} id="city" onChange={this.handleChange}>
                        <option value="DHARWAD">Dharwad</option>
                        <option value="SHIMOGA">Shimoga</option>
                        <option value="HUBLI">Hubli</option>
                        <option value="MYSORE">Mysore</option>
                    </select>
                    <select value={this.state.perPage} id="page" onChange={this.handlePerPage}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                    </select>
                    <input type="text" value={this.state.searchText} id="search" placeholder="search here" onChange={this.handleInputChange} />
                    {/* <button onClick={this.search}>Submit</button> */}
                </div>
                <Table banks={this.state.list} perPage={this.state.perPage} currentPage={this.state.currentPage} />
                <span className="pagination">
                    {
                        this.state.pages.map(page => {
                            return <span className="page" id={page} onClick={this.changePage}>{page}</span>
                        })
                    }
                </span>

            </div>

            // </Router>

        );
    }
}

export default Main;
// render(<App />, document.getElementById('app'));