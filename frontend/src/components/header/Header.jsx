import React from 'react';

import { Link } from 'react-router-dom'

//REDUX
import { connect } from 'react-redux'

//CSS
import './Header.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <Link to='/'>
                    <img src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png" alt="" />
                    <h1>Keep</h1>
                </Link>

                {this.props.userLogged._id ? <div className='buttoner'>
                    <Link to='/'>Cerrar sesión</Link>
                </div> : <div className='buttoner'>
                        <Link to='/users/login'>Iniciar sesión</Link>
                        {/* <Link to='/users/register' className='customButton'>Crear una cuenta</Link> */}
                    </div>}

            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLogged: state.userLogged
    }
}

export default connect(mapStateToProps)(Header);