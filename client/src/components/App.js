import React from "react"
import {Route} from "react-router-dom"

import SearchBar from "./SearchBar"
import HabitList from "./habit/HabitList"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import CreateHabit from "./habit/create/CreateHabit"
import Stats from "./stats/Stats"

class App extends React.Component {

    render() {
        return (
            <div>
                <SearchBar/>
                <Route path = "/" exact component = {HabitList} />
                <Route path = "/signin" exact component = {SignIn} />
                <Route path = "/signup" exact component = {SignUp} />
                <Route path = "/create" exact component = {CreateHabit} />
                <Route path = "/stats" exact component = {Stats} />
            </div>
        );
    }
}

export default App;