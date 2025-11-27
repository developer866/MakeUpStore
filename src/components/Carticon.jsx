import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
function Carticon(props) {
  return (

    <>
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
      <div>

        <FaShoppingCart size={28} />
        <div>{props.totalItem}</div>
      </div>
    </>

  )
}

export default Carticon
