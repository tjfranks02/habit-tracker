import React from "react"

class Selector extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <ul>
                    <li> Running </li>
                    <li> Walking </li>
                    <li> Swimming </li>
                </ul>
            </div>
        );
    }
}

export default Selector;