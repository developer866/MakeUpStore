import React from 'react'
import { Link } from 'react-router-dom'

function Button(props) {

    return (<>


        <style>
            {`
            .btn{
             display:Block;
            }
             @media(max-width:600px){
             .btn{
             display:none;}
             }
            `
            }
        </style>
        <div className='btn'>
            <Link to={props.link}>
                <p>{props.text}</p>
            </Link>
        </div>
    </>
    )
}

export default Button