import React, { Component } from 'react';
import OrderItem from './OrderItem';

class Orders extends Component {
  render() {
    return this.props.orders.map((order) => (
      <OrderItem key={order._id} order={order}/>
    ));
  }
}

export default Orders;