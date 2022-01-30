import React from "react";

import {getRoutine, completeTask, deleteTask} from "../../api/routine";
import tick from "../../tick.jpg";

class HabitList extends React.Component {

    constructor() {
        super();
        this.state = {habitList: []};
    }

    async componentDidMount() {
        this.updateList();
    }

    async updateList() {

        let token = localStorage.getItem("token");
        let habitList = await getRoutine({token: token});
        
        //means the auth token is in some way invalid
        if (!habitList) {
            this.props.history.push("/signin");
            return;
        }

        this.setState({habitList: habitList});
    }

    completeTask(task) {
        
        if (!task.completed) {
            completeTask(task, () => this.updateList());
        }
    }

    deleteTask(task) {
        deleteTask(task, () => this.updateList());
    }

    renderList() {

        let habitList = this.state.habitList;

        habitList = habitList.map((habit) => {
            
            let doneSym = undefined;

            if (habit.completed) {
                doneSym = (
                    <div>
                        <img src={tick} width = {50} height = {50}/>
                    </div>);
            }
            
            return (
                <div key = {habit.startTime}>
                    <h3> {habit.name} </h3>
                    <p> {habit.description} </p>
                    {habit.startTime + " "}
                    {habit.endTime}
                    {doneSym}
                    <button onClick = {() => this.completeTask(habit)}> Mark complete </button>
                    <button onClick = {() => this.deleteTask(habit)}> Delete </button>
                </div>
            )
        });

        return habitList;
    }

    render() {

        return (
            <div className = "habitlist">  
                <h1> My Routine </h1>
                {this.renderList()}
            </div>
        );
    }
}

export default HabitList;