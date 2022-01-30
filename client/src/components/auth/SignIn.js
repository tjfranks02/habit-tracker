import React from "react"

import {signIn} from "../../api/auth"

class SignIn extends React.Component {
    
    constructor() {
        super();
        this.state = {username: "", password: "", message: ""};
    }
    
    async onSignIn(evnt) {
        evnt.preventDefault();
        let res = await signIn({username: this.state.username, password: this.state.password}, () => this.props.history.push("/"));
        
        if (!res) {
            this.setState({message: "Invalid username or password!"});
        }   
    }

    render() {
        return (
            <div className = "sign-in">
                <h2> Sign In </h2>
                <form onSubmit = {(evnt) => this.onSignIn(evnt)}>
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
                        <button> Sign In </button>
                        <div> {this.state.message} </div>
                    </div>  
                </form>
            </div>
        );
    }
}

export default SignIn;