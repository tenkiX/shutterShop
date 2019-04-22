
import React, { Component } from 'react';
import Table from "react-bootstrap/Table";
import axios from "axios";
import JobItem from "../JobItem";
import Alert from "react-bootstrap/Alert";



class Worker extends Component {
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

    finishJob = (dbkey,index) => {
        axios.post(`http://localhost:8090/finishJob/${dbkey}/${index}`)
            .then(res => {alert("job finished"); this.loadData()})
            .catch(e => {alert(e  + " job finishing failed.")});
    };



    render() {
        if (!this.state.orders) {
            return <div />
        }

        //van data már
        return (
            <div>
                <Alert key={0} variant='info'>
                    Click on the job to mark as assembled!
                </Alert>
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