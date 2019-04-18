import React, { Component } from 'react';
import OrderItem from './OrderItem';

class Orders extends Component {
  render() {
    return (<div>Your orders:
      {this.props.orders.map((order) => (
      <OrderItem key={order._id} order={order}/>
    ))}
    </div>)

  }
}

export default Orders;