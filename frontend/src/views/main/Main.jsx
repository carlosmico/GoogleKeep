import React from 'react'
import { Link } from 'react-router-dom'

//CSS
import './Main.css'

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Main'>
                <img src="https://gsuite.google.es/learning-center/assets/images/keep/keep-intro.png?cache=2cc3b19" alt="" />

                <h1>Empieza a utilizar Google Keep</h1>

                <Link to='/users/register' className="customButton">Crear una cuenta</Link>
            </div>
        );
    }
}

export default Main;