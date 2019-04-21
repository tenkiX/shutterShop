
import React, { Component } from 'react';
import OrderItem from './OrderItem';
import Table from "react-bootstrap/Table";

class Orders extends Component {

  render() {

    return (<div>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Type of shutter</th>
          <th>Type of window</th>
          <th>Width</th>
          <th>Height</th>
          <th>Is it ready?</th>
        </tr>
        </thead>
        <tbody>
      {this.props.orders.map((order) => (
        <OrderItem key={order._id} order={order}/>
        ))}
        </tbody>
      </Table>
    </div>)

  }
}

export default Orders;