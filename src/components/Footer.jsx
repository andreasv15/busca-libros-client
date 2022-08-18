import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='text-center p-3' style={{ backgroundColor: 'white' }}>
      Web desarrollada por: <span> </span>
      <a className='text-black' target="_blank" href='https://portfolio-andreasanchez.netlify.app/'>
        <strong>Andrea Sánchez Velasco</strong>
      </a>
    </div>
  )
}

export default Footer