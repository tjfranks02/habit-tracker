import React from "react"

class HabitForm extends React.Component {

    constructor() {
        super();
        this.state = {name: "", startTime: "", endTime: "", description: ""};
    }

    onFormSubmit(evnt) {
        evnt.preventDefault();
        this.props.onHabitCreate(this.state);
    }

    render() {
        return (
            <div>
                <h2> Add a task to your routine! </h2>
                <form onSubmit = {evnt => this.onFormSubmit(evnt)}>
                    <label> Name </label>
                    <input 
                        type = "text"
                        value = {this.state.name}
                        onChange = {evnt => this.setState({name: evnt.target.value})}
                    />
                    <label> Description </label>
                    <input 
                        type = "text"
                        value = {this.state.description}
                        onChange = {evnt => this.setState({description: evnt.target.value})}
                    />
                    <label> Time </label>
                    <input
                        type = "time"
                        value = {this.state.startTime}
                        onChange = {evnt => this.setState({startTime: evnt.target.value})}
                    />
                    <input
                        type = "time"
                        value = {this.state.endTime}
                        onChange = {evnt => this.setState({endTime: evnt.target.value})}
                    />
                    <div> {this.props.error} </div> 

                    <button> Create habit </button>
                </form>
            </div>
        );
    }
}

export default HabitForm;