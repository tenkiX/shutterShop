import React, { Component } from 'react';
import Table from "react-bootstrap/Table";
import axios from "axios";


class ManagerStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null
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
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Type of shutter</th>
                        <th>Type of window</th>
                        <th>Width</th>
                        <th>Height</th>
                        <th>List of required materials</th>
                        <th>Is it assembled?</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ManagerStatistics;