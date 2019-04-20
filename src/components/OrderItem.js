import React, { Component } from 'react';

class OrderItem extends Component {
    render() {
        return  (
             <div>
                {this.props.order.order.customerId}
                <pre>{JSON.stringify(this.props.order.order, null, 2)}</pre>
            </div>
        );
    }
}

export default OrderItem;