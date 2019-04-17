import React, { Component } from 'react';

class OrderItem extends Component {
    render() {
        return  (
          <div>
              <p>
                  {this.props.order.order.customerId}  {this.props.order.order.shutterType}
              </p>
          </div>
        );
    }
}

export default OrderItem;