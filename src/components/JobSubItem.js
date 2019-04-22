import React, { Component } from 'react';
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";


class JobSubItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            materials: {
                material : "",
                noOfStaves: "",
                ofWidth: "",
                ofLength: "",
                fixtures:""
            }
        };
    }
    componentWillMount() {
        this.loadData();
    }

    loadData() {
        this.getRequiredMaterials(this.props.order.shutterType,this.props.order.windowWidth,this.props.order.windowHeight);
    };

    getRequiredMaterials  = (shutterType,windowWidth,windowHeight) => {
        axios.get(`http://localhost:8090/getRequiredMaterials/${shutterType}/${windowWidth}/${windowHeight}`)
            .then(res => this.setState({ materials: res.data }))
            .catch(e => {alert(e  + " failed.")});
    };

    onTableRowClicked= (e) => {
        e.preventDefault();
        if (this.props.order.isJobFinished === "true") {alert("this item has been already manufactured! you dont need to assemble it again!"); return;}
        this.props.finishJob(this.props.dbkey,this.props.dbindex);

    };

    render() {


        return  (
            <tr onClick={this.onTableRowClicked.bind(this)}>
                <td>{this.props.order.shutterType}</td>
                <td>{this.props.order.windowType}</td>
                <td>{this.props.order.windowWidth}</td>
                <td>{this.props.order.windowHeight}</td>
                <td><ListGroup>
                    <ListGroup.Item>{this.state.materials.noOfStaves} pcs of {this.state.materials.material} staves with dim: {this.state.materials.ofLength}x{this.state.materials.ofWidth}</ListGroup.Item>
                    <ListGroup.Item>{this.state.materials.fixtures} pcs of fixtures</ListGroup.Item>
                </ListGroup>
                </td>
                <td>{this.props.order.isJobFinished}</td>
            </tr>

        );

    }
}


export default JobSubItem;
