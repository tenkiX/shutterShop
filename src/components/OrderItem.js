import React, { Component } from 'react';
import uuid from "uuid";

class OrderItem extends Component {

    render() {
        var renderThis;
        try {
            renderThis=this.props.order.order.order;
        }catch (e) {
           // alert("catch");
        }

        return  renderThis.map(orders => (
            <tr key={uuid.v4()}>
                <td>{orders.shutterType}</td>
                <td>{orders.windowType}</td>
                <td>{orders.windowWidth}</td>
                <td>{orders.windowHeight}</td>
                <td>{orders.isJobFinished}</td>
            </tr>
        ));

    }
}




export default OrderItem;

