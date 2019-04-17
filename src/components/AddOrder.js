import React, { Component } from 'react';

export class AddOrder extends Component {
    state = {
        order: {
            customerId: "",
            shutterType: "",
            windowHeight: "",
            windowWidth:""
    }};

    onSubmit = (e) => {
        e.preventDefault();
        let orderData = {
            order: {
            customerId: "3",
            shutterType: "sfddsf",
            windowHeight: "23",
            windowWidth:"3232"
            }};

        this.setState({order: orderData});
        console.log(this.state.order);
        this.props.addOrder(this.state.order);

    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <table><tbody>
                    <tr>
                        <td>My user nickname:</td>
                        <td><input
                            type="text"
                            name="userNickName"
                            style={{ flex: '10', padding: '5px' }}
                            placeholder="My super unique username..."
                            value={this.state.order}
                            onChange={this.onChange}
                        /></td>
                    </tr>
                    <tr>
                        <td> Window size:</td>
                        <td><input type="number" name="quantity" min="1"/>
                            X
                            <input type="number" name="quantity" min="1"/> mm</td>
                    </tr>
                    <tr>
                        <td> Window type:</td>
                        <td><select name="Select type">
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