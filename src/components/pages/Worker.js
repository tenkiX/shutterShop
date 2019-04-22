
import React, { Component } from 'react';
import Table from "react-bootstrap/Table";
import axios from "axios";
import JobItem from "../JobItem";



class Worker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: null //This is what our data will eventually be loaded into
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

    finishJob = (dbkey,index) => {
        axios.post(`http://localhost:8090/finishJob/${dbkey}/${index}`)
            .then(res => {alert("job finished"); })
            .catch(e => {alert(e  + " job finishing failed.")});
    };

    render() {
        if (!this.state.orders) {
            return <div />
        }

        //WE HAVE DATA, DO A NORMAL RENDER
        return (
            <div>
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
                    {this.state.orders.map((order) => (
                        <JobItem key={order._id} order={order} finishJob={this.finishJob}/>
                    ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default Worker;