import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Orders from './components/Orders';
import Worker from './components/pages/Worker';
import Manager from './components/pages/Manager';
import axios from 'axios';

import './App.css';
import AddOrder from "./components/AddOrder";
import ManagerStatistics from "./components/ManagerStatistics";

class App extends Component {
  state = {
    orders: [],
    activeUserId: ""
  };

  changeUser= (userId) => {
      this.setState({activeUserId:userId.activeUserId});
  };

  listCustomerOrders=(userId) =>{
    axios.get(`http://localhost:8090/listOrders/${userId.activeUserId}`)
             .then(res => this.setState({ orders: res.data }))
             .catch(e => {alert(e  + " failed.")});
  };



  addOrder = (orderData) => {
    axios.post('http://localhost:8090/placeOrder', orderData)
        .then(res => {alert("Order submitted"); })
        .catch(e => {alert(e  + " order failed.")});
  };


  render() {
    return (
        <Router>
        <div className="App">
            <div className="container">
                <Header changeUser = {this.changeUser} listCustomerOrders = {this.listCustomerOrders} />


            <Route path="/customerOrder" render={props => (
                <React.Fragment>
                  <AddOrder addOrder={this.addOrder} activeUser = {this.state.activeUserId} />
                </React.Fragment>
            )} />
            <Route path="/customerOrderList" render={props => (
                <React.Fragment>
                    <Orders orders={this.state.orders} />
                </React.Fragment>
            )} />
            <Route path="/worker" render={props => (
                <React.Fragment>
                    <Worker/>
                </React.Fragment>
            )} />
            <Route path="/managerStatistics" render={props => (
                <React.Fragment>
                    <ManagerStatistics/>
                </React.Fragment>
            )} />
            <Route path="/manager" render={props => (
                <React.Fragment>
                    <Manager/>
                </React.Fragment>
            )} />

            </div>
        </div>
  </Router>
    );
  }
}

export default App;
