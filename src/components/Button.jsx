import React from 'react'
import { Link } from 'react-router-dom'

function Button(props) {

    return (
        <div>
            <Link to={props.link}>
                <p>{props.text}</p>
            </Link>
        </div>
    )
}

export default Button