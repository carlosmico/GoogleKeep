import React from 'react'
import { isEmail } from 'validator'

import Axios from 'axios'

//CSS
import './Register.css'

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            passwordConfirm: "",
            error: {
                name: "",
                username: "",
                email: "",
                password: ""
            },
            isValidForm: true,
        }
    }

    onChange = (event) => {
        var name = event.target.name;

        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            switch (name) {
                case "name":
                    this.validateName();
                    break;

                case "password":
                    this.validatePassword();
                    break;

                case "passwordConfirm":
                    this.validatePassword();
                    break;
            }
        });
    }

    submit = (event) => {
        event.preventDefault();

        //Seteamos el valor isValidForm a true para poder volver a comprobar una vez pulsado el botón
        this.setState({ isValidForm: true });

        let user = {
            name: this.state.name,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }

        this.validateForm()
            .then(() => {
                // console.log(this.state);
                if (this.state.isValidForm) {
                    let existError = false;

                    Axios.post('http://localhost:3001/register', user)
                        .catch(error => {
                            existError = true;

                            if (!error.response) return alert('Error al conectar con el Backend');

                            let errMsg = error.response.data.errmsg;

                            if (errMsg.includes("username")) {
                                let error = this.state.error;

                                error.username = "Ya existe un usuario con este nombre de usuario";

                                this.setState({ error: error });
                            } else if (errMsg.includes("email")) {
                                let error = this.state.error;

                                error.email = "Ya existe un usuario con este email";

                                this.setState({ error: error });
                            }
                        }).then(() => {
                            if (existError === false) {
                                this.props.history.push('/users/login')
                            }
                        })
                }
            }
            );
    }

    validateForm = () => {
        return new Promise((res, rej) => {
            this.validateUsername();
            this.validateEmail();
            this.validatePassword();
            res();
        });
    }

    validateName = () => {
        if (this.state.name.length >= 50) {
            let error = this.state.error;

            error.name = "El nombre no puede tener más de 50 carácteres.";

            this.setState({ error: error });
        } else {
            let error = this.state.error;

            error.name = "";

            this.setState({ error: error });
        }
    }

    validateUsername = () => {
        if (this.state.username === "") {
            let error = this.state.error;

            error.username = "El usuario es requerido."

            this.setState({ error: error, isValidForm: false });
        } else {
            let error = this.state.error;

            error.username = "";

            this.setState({ error: error });
        }
    }

    validateEmail = () => {
        if (this.state.email === "") {
            let error = this.state.error;

            error.email = "El email es requerido."

            this.setState({ error: error, isValidForm: false });
        } else if (!isEmail(this.state.email)) {
            let error = this.state.error;

            error.email = "El email debe de ser válido."

            this.setState({ error: error, isValidForm: false });
        } else {
            let error = this.state.error;

            error.email = "";

            this.setState({ error: error });
        }
    }

    validatePassword = () => {
        let password = this.state.password;

        if (password === "") {
            let error = this.state.error;

            error.password = "La contraseña es requerida."

            this.setState({ error: error, isValidForm: false });
        } else if (password.length < 8) {
            let error = this.state.error;

            error.password = "La contraseña tiene que tener mínimo 8 carácteres."

            this.setState({ error: error, isValidForm: false });
        } else if (password !== this.state.passwordConfirm) {
            let error = this.state.error;

            error.password = "Las contraseñas no coinciden."

            this.setState({ error: error, isValidForm: false });
        } else {
            let error = this.state.error;

            error.password = "";

            this.setState({ error: error });
        }
    }

    render() {
        return (
            <div className="Register">
                <div className="Content">
                    <h1>Crear una cuenta</h1>

                    {/* FORMULARIO REGISTRO */}

                    <form onSubmit={this.submit}>
                        {/* Name */}
                        <input type="text" name="name" placeholder="Nombre" value={this.state.name} onChange={this.onChange} />
                        <div className="formError">{this.state.error.name}</div>

                        {/* LastName */}
                        <input type="text" name="lastname" placeholder="Apellidos" value={this.state.lastname} onChange={this.onChange} />

                        {/* UserName */}
                        <input type="text" name="username" placeholder="Usuario" value={this.state.username} onChange={this.onChange} />
                        <div className="formError">{this.state.error.username}</div>

                        {/* Email */}
                        <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.onChange} />
                        <div className="formError">{this.state.error.email}</div>

                        {/* Password */}
                        <input type="password" name="password" placeholder="Contraseña" value={this.state.password} onChange={this.onChange} />
                        <div className="formError">{this.state.error.password}</div>

                        {/* PasswordConfirmation */}
                        <input type="password" name="passwordConfirm" placeholder="Confirmar Contraseña" value={this.state.passwordConfirm} onChange={this.onChange} />


                        <button type="submit" className='customButton'>Enviar</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;