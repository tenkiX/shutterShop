import React, { Component } from 'react';


class JobSubItem extends Component {

    onTableRowClicked= (e) => {
        e.preventDefault();
        this.props.finishJob(this.props.dbkey,this.props.dbindex);

    };

    render() {


        return  (
            <tr onClick={this.onTableRowClicked.bind(this)}>
                <td>{this.props.dbindex}</td>
                <td>{this.props.order.windowType}</td>
                <td>{this.props.order.windowWidth}</td>
                <td>{this.props.order.windowHeight}</td>
                <td>{this.props.order.isJobFinished}</td>
            </tr>
        );

    }
}




export default JobSubItem;
