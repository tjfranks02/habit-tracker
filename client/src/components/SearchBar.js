import React from "react";
import {Link} from "react-router-dom";

import "../styles/header.css";

class SearchBar extends React.Component {

    render() {
        return (
            <div>
                <header className = "header">
                    <nav className = "main-nav">
                        <div className = "right-link">
                            <Link className = "nav-cta" to = "/signup"> Sign Up </Link>
                            <Link className = "nav-cta" to = "/signin"> Sign In </Link>
                        </div>
                        <Link className = "main-nav-link" to = "/"> My Routine </Link>
                        <Link className = "main-nav-link" to = "/create"> Add to your routine </Link>
                        <Link className = "main-nav-link" to = "/stats"> See your stats </Link>
                    </nav>
                </header>
            </div>
        );
    }
}

export default SearchBar;