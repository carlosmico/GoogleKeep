import React from 'react'
import { Link } from 'react-router-dom'

//CSS
import './Error404.css'

const Error404 = () => {
    return (
        <div className='Error404'>
            <div>
                <img src="https://logodownload.org/wp-content/uploads/2014/09/google-logo-1.png" alt=""/>

                <h2>404. That’s an error.</h2>

                <Link to='/' className="customButton">Volver al inicio</Link>
            </div>

            <div>
                <img src="https://s3.amazonaws.com/images.seroundtable.com/t-google-404-1299071983.jpg" alt="" />
            </div>


        </div>
    );
}

export default Error404;