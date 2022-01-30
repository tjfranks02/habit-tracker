import React from "react";

import Selector from "./Selector";
import HabitForm from "./HabitForm";

import {attemptAddHabit} from "../../../api/routine"

class CreateHabit extends React.Component {

    constructor() {
        super();
        this.state = {error: ""};
    }

    async onHabitCreate(habit) {
        let res = await attemptAddHabit({...habit, completed: false});

        if (!res) {
            this.setState({error: "Task invalid! Check if times are already taken!"});
        } else {
            this.setState({error: ""});
        }
    }

    render() {
        return (
            <div className = "add-task"> 
                <HabitForm onHabitCreate = {(habit) => this.onHabitCreate(habit)} error = {this.state.error} />
            </div>
        );
    }
}

export default CreateHabit;