import React from "react"
import {Doughnut, Bar} from "react-chartjs-2"

import {fetchStats} from "../../api/stats";

const defaultDoughnutData = {
    labels: ["Number of tasks completed", "Number of tasks incomplete"],
    datasets: [
        {
            label: "Summary of tasks",
            data: [10, 10],
            backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

const defaultBarData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        { 
            label: "Percentage of tasks completed daily",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

class Stats extends React.Component {

    constructor() {
        super();
        this.state = {startDate: "", endDate: "", message: "", doughnutData: defaultDoughnutData, barData: defaultBarData};
    }

    setBarData(returnData) {
        //set data for bar chart data
        let currentData = this.state.barData;
        currentData.datasets[0].data = returnData.dailyPercentages;
        currentData.labels = returnData.dates;

        let color = "rgba(75, 192, 192, 0.2)";
        let backgroundColor = [];
        let borderColor = [];

        for (let index = 0; index < returnData.dailyPercentages.length; index++) {
            backgroundColor.push(color);
            borderColor.push(color);
        }

        currentData.datasets[0].backgroundColor = backgroundColor;
        currentData.datasets[0].borderColor = borderColor;

        this.setState({barData: {...currentData}});
    }

    setChartData(returnData) {
        //set data for doughnut chart
        let currentData = this.state.doughnutData;
        currentData.datasets[0].data = [returnData.totalComplete, returnData.totalTasks - returnData.totalComplete];
        this.setState({doughnutData: {...currentData}});

        this.setBarData(returnData);
    }

    async fetchStats(evnt) {
        evnt.preventDefault();
        let returnData = await fetchStats(this.state.startDate, this.state.endDate);
        
        console.log(returnData.dates);
        console.log(returnData.dates.length);

        if (returnData.dates.length === 0) {
            this.setState({message: "No data for this time period! It is possible your account didn't exist in the timeframe!"});
        } else if (returnData) {
            this.setChartData(returnData);
            this.setState({message: ""});
        } else {
            this.setState({message: "Invalid dates!"});
        }
    }

    render() {
        return (
            <div className = "stat-summary">
                <h1> Select date range </h1>
                <div>
                    <form onSubmit = {(evnt) => this.fetchStats(evnt)}>
                        <input 
                            onChange = {evnt => this.setState({startDate: evnt.target.value})}
                            value = {this.state.startDate}
                            type = "date" 
                        />
                        <input 
                            onChange = {evnt => this.setState({endDate: evnt.target.value})}
                            value = {this.state.endDate}
                            type = "date" 
                        />
                        <div> {this.state.message} </div>
                        <button> Get statistics </button>
                    </form>
                </div>
                <h3> Ratio of tasks completed to not completed! </h3>
                <div>
                    <Doughnut 
                        height = {250} 
                        width = {250}
                        options={{maintainAspectRatio: false}} 
                        data={this.state.doughnutData} 
                    />
                </div>
                <h3> Percentage completed in each day of the time period </h3>
                <div>
                    <Bar 
                        height = {250}
                        width = {250}
                        options = {{maintainAspectRatio: false}}
                        data = {this.state.barData}
                    />
                </div>
            </div>
        );
    }
}

export default Stats;