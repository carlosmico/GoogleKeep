import React from 'react'
import Axios from 'axios'

import { Link } from 'react-router-dom'

//REDUX
import { connect } from 'react-redux'

//CSS
import './Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submit = (event) => {
        event.preventDefault();

        Axios.post('http://localhost:3001/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            this.setState({ error: "" })

            if (res.data === "Accept") {
                this.props.dispatch({ type: 'LOGIN', payload: this.state.email })
                this.props.history.push('/notes');
            }
        }
        ).catch(err => {
            this.setState({
                error: err.response.data
            })
        })
    }

    render() {
        return (
            <div className='Login'>
                <div className="Content">
                    <h1>Iniciar sesión</h1>

                    <form onSubmit={this.submit}>
                        <input type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                        <p className="error">{this.state.error}</p>
                        <button type="submit" className='customButton' >Login</button>

                        <Link to='/users/register' title="Create an account" />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.userLogged
    }
}

export default connect(mapStateToProps)(Login);