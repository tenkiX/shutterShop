import React, { Component } from 'react';
import axios from "axios";
import PieChart from 'react-minimal-pie-chart';

class ManagerStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            steelNumber: 0,
            plasticNumber: 0,
            woodenNumber: 0
        };
    }
    componentWillMount() {
        this.loadData();
    }
    loadData() {

        axios.get(`http://localhost:8090/statistics/Steel`)
            .then(res => {this.setState({ steelNumber: res.data })})
            .catch(e => {alert(e  + " failed.")});

        axios.get(`http://localhost:8090/statistics/Plastic`)
            .then(res => {this.setState({ plasticNumber: res.data })})
            .catch(e => {alert(e  + " failed.")});

        axios.get(`http://localhost:8090/statistics/Wooden`)
            .then(res => {this.setState({ woodenNumber: res.data })})
            .catch(e => {alert(e  + " failed.")});
    };




    render() {
        return (
            <div>
                <p> Popularity of shutter types among our buyers </p>
                <PieChart animate={true} animationDuration={500}
                    data={[
                        { title: 'Steel', value: this.state.steelNumber, color: '#E38627' },
                        { title: 'Plastic', value: this.state.plasticNumber, color: '#C13C37' },
                        { title: 'Wooden', value: this.state.woodenNumber, color: '#6A2135' },
                    ]}
                />;
            </div>
        );
    }
}

export default ManagerStatistics;