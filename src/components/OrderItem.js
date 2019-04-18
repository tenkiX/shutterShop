import React, { Component } from 'react';

class OrderItem extends Component {
    render() {
        return  (
          <div>
                  {this.props.order.order.customerId}  {this.props.order.order.shutterType}
          </div>
        );
    }
}

export default OrderItem;