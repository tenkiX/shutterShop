import React, { Component } from 'react';
import uuid from "uuid";
import JobSubItem from "./JobSubItem";

class JobItem extends Component {


    render() {
        var renderThis;
        try {
            renderThis=this.props.order.order.order;
        }catch (e) {
           // alert("catch");
        }

        return  renderThis.map((order,index) => (
            <JobSubItem key={uuid.v4()} dbindex={index} dbkey={this.props.order._id} order={order} finishJob={this.props.finishJob}/>

        ));

    }
}




export default JobItem;

