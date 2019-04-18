import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Orders from './components/Orders';
import Worker from './components/pages/Worker';
import Manager from './components/pages/Manager';
import axios from 'axios';

import './App.css';
import AddOrder from "./components/AddOrder";

class App extends Component {
  state = {
    orders: [],
    activeUser: "1"
  };



  componentDidMount() {
    axios.get(`http://localhost:8090/listOrders/${this.state.activeUser}`)
        .then(res => this.setState({ orders: res.data }))
  };

  // Add order
  addOrder = (orderData) => {
    axios.post('http://localhost:8090/placeOrder', orderData)
        .then(res => {alert("Order submitted"); this.componentDidMount()})
        .catch(e => {alert(e  + " order failed.")});
  };


  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
                <React.Fragment>
                  <AddOrder addOrder={this.addOrder} />
                </React.Fragment>
            )} />
            <Route path="/shoppingCart" render={props => (
                <React.Fragment>
                  <Orders orders={this.state.orders} />
                </React.Fragment>
            )} />
            <Route path="/worker" component={Worker} />
            <Route path="/manager" component={Manager} />
          </div>  
        </div>
      </Router>
    );
  }
}

export default App;
