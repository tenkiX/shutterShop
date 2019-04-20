import React, { Component } from 'react';
import {Button} from "react-bootstrap";

export class AddOrder extends Component {

    state = {
            activeUser: "",
            addedOrderCounter: 0,
            currentOrder: {
                    shutterType: "wooden",
                    windowHeight: "1564",
                    windowWidth:"1",
                    windowType:"basic",
                    orderedPieces:"1",
                    isJobFinished:"false"
                },
            order: []
            };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.addedOrderCounter === 0) {alert('Please add at least 1 item to shopping cart before submitting'); return;}
        let orderData = { order : {
            customerId: [this.props.activeUser],
            order: this.state.order
        }};
        this.props.addOrder(orderData);
    };

    onChange = (e) => {
        e.persist();
        this.setState(prevState => ({currentOrder: {...prevState.currentOrder, [e.target.name]: e.target.value}}));
    };

    onAddWindow = (e) => {
        e.persist();
        this.setState({order: [...this.state.order, this.state.currentOrder]});
        this.setState(({addedOrderCounter : this.state.addedOrderCounter +1}));
        alert('Added your order to shopping cart');
    };


//átirni mindet bootstrapre
    render() {
        return (<div>  <Button variant="outline-success" onClick={this.onAddWindow}>Add to order</Button>

            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <table><tbody>
                     <tr>
                        <td> Window size:</td>
                        <td><input type="number" name="windowHeight" min="1" onChange={this.onChange}/>
                            X
                            <input type="number" name="windowWidth" min="1" onChange={this.onChange}/> mm</td>
                    </tr>
                    <tr>
                        <td> Shutter type:</td>
                        <td><select name="shutterType" onChange={this.onChange}>
                            <option value="wooden">Wooden</option>
                            <option value="steel">Steel</option>
                            <option value="plastic">Plastic</option>
                        </select></td>
                    </tr>
                     <tr>
                         <td> Window type:</td>
                         <td><select name="windowType" onChange={this.onChange}>
                             <option value="openable">Openable</option>
                             <option value="not openable">not openable</option>
                             <option value="prison type">prison type</option>
                         </select></td>
                     </tr>
                     <tr>
                         <td> Ordered pieces:</td>
                         <td><input type="number" name="orderedPieces" min="1" onChange={this.onChange}/> </td>
                     </tr>
                    <tr>

                        <td><input
                            type="submit"
                            value="Submit"
                            className="btn"
                            style={{flex: '1'}}
                        /></td>
                    </tr></tbody>
                </table>
         </form>
            </div>
        )
    }
}

export default AddOrder