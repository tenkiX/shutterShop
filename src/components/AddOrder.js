import React, { Component } from 'react';

export class AddOrder extends Component {

    state = {
            activeUser: "",
            order: {
                customerId: "",
                shutterType: "wooden",
                windowHeight: "",
                windowWidth:""
            }};

    onSubmit = (e) => {
        e.preventDefault();
        let orderData = this.state;
        this.props.addOrder(orderData);
    };

    onChange = (e) => {
        e.persist();

        this.setState(prevState => ({order: {...prevState.order, customerId : [this.props.activeUser], [e.target.name]: e.target.value}}));
    };

    render() {
        return (
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
                        <td><input
                            type="submit"
                            value="Submit"
                            className="btn"
                            style={{flex: '1'}}
                        /></td>
                    </tr></tbody>
                </table>
         </form>
        )
    }
}

export default AddOrder