import React, { Component } from 'react';
import cityscapeImage from '../images/sky.webp';
import { Link } from 'react-router-dom'; 

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            success: ''
        };
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleLogin = async (e) => {
        e.preventDefault();

        const { username, password } = this.state;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Send the username and password
            });

            const data = await response.json();

            if (response.ok) {
                this.setState({ success: data.message, error: '' });
                localStorage.setItem('token', data.token);  // Store the JWT token
            } else {
                this.setState({ error: data.error, success: '' });
            }
        } catch (error) {
            this.setState({ error: 'An error occurred during login', success: '' });
        }
    }

    render() {
        const { username, password, error, success } = this.state;

        const backgroundStyle = {
            backgroundImage: `url(${cityscapeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        };

        return (
            <section style={backgroundStyle}>
                <div className="max-w-md mx-auto bg-neutral-800 rounded-bl-3xl rounded-tr-3xl border border-white p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg shadow-white">
                    <h1 className="text-xl font-bold text-white md:text-6xl text-center">Login</h1>
                    <form className="space-y-4 md:space-y-2 text-center" onSubmit={this.handleLogin}>
                        <div className="mt-12">
                            <label htmlFor="username" className="block text-xl text-neonPurple">Username</label>
                            <input
                                id="username"
                                name="username"
                                value={username}
                                onChange={this.handleInputChange}
                                className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-xl text-neonPurple">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.handleInputChange}
                                className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
                            />

                            <div className="mt-3 flex-row">
                                <input
                                    id="checkbox"
                                    type="checkbox"
                                    className="appearance-none bg-gray-400 w-4 h-4 rounded-bl-sm rounded-tr-sm"
                                />
                                <label htmlFor="checkbox" className="text-sm text-neonBlue ml-3">Remember me</label>

                            <div className="mt-12">
                                <p className="text-sm text-neonPurple">New here?</p>
                                <Link to='/register' className="text-sm text-neonPurple hover:underline">Create an account</Link>
                            </div>

                            </div>
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}

                        <button type="submit" className="mt-4 bg-neonPurple text-white rounded-lg p-2">Login</button>
                    </form>
                </div>
            </section>
        );
    }
}

export default Login;
