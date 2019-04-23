import React, { Component } from 'react';
import Table from "react-bootstrap/Table";
import axios from "axios";
import ManagerItem from "../ManagerItem";

import uuid from "uuid";

class Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null,

        };
    }
    componentWillMount() {
        this.loadData();
    }
    loadData() {

        axios.get(`http://localhost:8090/listAllOrders`)
            .then(res => this.setState({ orders: res.data }))
            .catch(e => {alert(e  + " failed.")});
    };



    render() {
        if (!this.state.orders) {
            return <div />
        }
        //van data már
        return (
            <div>

                <Table bordered hover>
                    <thead>
                    <tr>
                        <th>Orders</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.orders.map((order) => (
                        <tr key={uuid.v4()}><td>
                        <Table striped bordered hover responsive>
                            <tbody>
                            <tr><td>Customer: {order.order.customerId} (shipping address: {order.order.address})</td><td>Contact: {order.order.contactEmail}</td></tr>
                        <ManagerItem key={order._id} order={order} finishJob={this.finishJob}/>

                            </tbody>
                        </Table></td>
                        </tr>

                    ))}

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Manager;

