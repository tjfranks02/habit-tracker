import React from "react"

import {signUp} from "../../api/auth"

class SignUp extends React.Component {

    constructor() {
        super()
        this.state = {username: "", password: "", message: ""};
    }

    async onSignUp(evnt) {
        evnt.preventDefault();
        let res = await signUp({username: this.state.username, password: this.state.password}, () => this.props.history.push("/"));

        if (res === undefined) {
            this.setState({message: "Username already taken!"});
        }
    }
    
    render() {
        return (
            <div className = "sign-up">
                <h2> Create new account </h2>
                <form onSubmit = {(evnt) => this.onSignUp(evnt)}>
                    <div>
                        <label> Username </label>
                        <input
                            type = "text"
                            value = {this.state.username}
                            onChange = {evnt => this.setState({username: evnt.target.value})}
                        />
                        <label> Password </label>
                        <input
                            type = "password"
                            value = {this.state.password}
                            onChange = {evnt => this.setState({password: evnt.target.value})}
                        />
                        <button> Create account </button>
                        <div> {this.state.message} </div>
                    </div>  
                </form>
            </div>
        );
    }
}

export default SignUp;