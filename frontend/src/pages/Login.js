// import React, { Component } from 'react'
// import cityscapeImage from '../images/sky.webp';
// import '../App.css';

// export class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//             rememberMe: false
//         };
//     }

//     handleCheckboxChange = (event) => {
//         this.setState(prevState => ({ rememberMe: !prevState.rememberMe, }));
//     };

//     handleInputChange = (event) => {
//         const { name, value } = event.target;
//         this.setState({ [name]: value});
//     };

//     handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(this.state);
//     }

//     render() {
//         const backgroundStyle = {
//             backgroundImage: `url(${cityscapeImage})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             height: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//         };

//         return (
//             <section style={backgroundStyle}>
//                 <div className="max-w-md min-w-[350px] mx-auto bg-neutral-800 rounded-bl-3xl rounded-tr-3xl border border-white p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg shadow-white">
//                     <h1 className="glitch font-bold text-white text-6xl text-center">Login</h1>
//                     <form className="space-y-4 md:space-y-2 text-center">
//                         <div className="mt-12">
//                             <label for="username" className="block text-xl text-neonPurple">Username</label>
//                             <input id="username" name="username" value={this.state.username} onChange={this.handleInputChange} className="bg-gray-400 rounded-bl-lg rounded-tr-lg"></input>
//                         </div>
//                         <div>
//                             <label for="password" type="password" className="block text-xl text-neonPurple">Password</label>
//                             <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} className="bg-gray-400 rounded-bl-lg rounded-tr-lg"></input>

//                             <div className="mt-3 flex-row">
//                                 <input id="checkbox" type="checkbox" value="" checked={this.state.rememberMe} onChange={this.handleCheckboxChange} className="appearance-none bg-gray-400 w-4 h-4 rounded-bl-sm rounded-tr-sm"></input>
//                                 <label htmlFor="checkbox" type="text" className="text-sm text-neonBlue ml-3">Remember Me</label>

//                                 <div className="mt-6">
//                                     <button type="submit" className="w-3xl min-w-[200px] bg-neutral-700 text-neonBlue rounded-bl-lg rounded-tr-lg py-1 hover:bg-neonPurple">Login</button>
//                                 </div>
//                                 <div className="mt-6">
//                                     <p className="text-sm text-neonPurple">New Here?</p>
//                                     <a className="text-sm text-neonPurple hover:underline" href='#'>Create An Account</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//         )
//     }
// }

// export default Login

// ED: Needed to setup login for authorization tests
// import React, { Component } from 'react';
// import cityscapeImage from '../images/sky.webp';
// import { Link } from 'react-router-dom';

// export class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//             error: '',
//             success: ''
//         };
//     }

//     handleInputChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value });
//     }

//     handleLogin = async (e) => {
//         e.preventDefault();

//         const { username, password } = this.state;

//         try {
//             const response = await fetch('/api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 this.setState({ success: data.message, error: '' });
//                 localStorage.setItem('token', data.token);  // Save JWT token to localStorage
//             } else {
//                 this.setState({ error: data.error, success: '' });
//             }
//         } catch (error) {
//             this.setState({ error: 'An error occurred during login', success: '' });
//         }
//     }

//     render() {
//         const { username, password, error, success } = this.state;

//         const backgroundStyle = {
//             backgroundImage: `url(${cityscapeImage})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             height: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//         };

//         return (
//             <section style={backgroundStyle}>
//                 <div className="max-w-md mx-auto bg-neutral-800 rounded-bl-3xl rounded-tr-3xl border border-white p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg shadow-white">
//                     <h1 className="text-xl font-bold text-white md:text-6xl text-center">Login</h1>
//                     <form className="space-y-4 md:space-y-2 text-center" onSubmit={this.handleLogin}>
//                         <div className="mt-12">
//                             <label htmlFor="username" className="block text-xl text-neonPurple">Username</label>
//                             <input
//                                 id="username"
//                                 name="username"
//                                 type="text"
//                                 value={username}
//                                 onChange={this.handleInputChange}
//                                 className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="block text-xl text-neonPurple">Password</label>
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 value={password}
//                                 onChange={this.handleInputChange}
//                                 className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                             />
//                             <div className="mt-3 flex-row">
//                                 <input
//                                     id="checkbox"
//                                     type="checkbox"
//                                     className="appearance-none bg-gray-400 w-4 h-4 rounded-bl-sm rounded-tr-sm"
//                                 />
//                                 <label htmlFor="checkbox" className="text-sm text-neonBlue ml-3">Remember me</label>
//                                 <div className="mt-12">
//                                     <p className="text-sm text-neonPurple">New here?</p>
//                                     <Link to='/register' className="text-sm text-neonPurple hover:underline">Create an account</Link>
//                                 </div>
//                             </div>
//                         </div>

//                         {error && <p style={{ color: 'red' }}>{error}</p>}
//                         {success && <p style={{ color: 'green' }}>{success}</p>}

//                         <button type="submit" className="mt-4 bg-neonPurple text-white rounded-lg p-2">Login</button>
//                     </form>
//                 </div>
//             </section>
//         );
//     }
// }

// export default Login;



////////


// import React, { Component } from 'react';
// import cityscapeImage from '../images/sky.webp';
// import { Link, useNavigate } from 'react-router-dom';

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',
//             error: '',
//             success: ''
//         };
//     }

//     handleInputChange = (e) => {
//         this.setState({ [e.target.name]: e.target.value });
//     }

//     handleLogin = async (e) => {
//         e.preventDefault();

//         const { username, password } = this.state;

//         try {
//             const response = await fetch('/api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 this.setState({ success: data.message, error: '' });
//                 localStorage.setItem('token', data.token);  // Save token
//                 localStorage.setItem('role', data.role);  // Save user role
//                 this.redirectToDashboard(data.role);  // Redirect user based on role
//             } else {
//                 this.setState({ error: data.error, success: '' });
//             }
//         } catch (error) {
//             this.setState({ error: 'An error occurred during login', success: '' });
//         }
//     }

//     redirectToDashboard = (role) => {
//         const navigate = useNavigate();
//         if (role === 'admin') {
//             navigate('/admin-dashboard');  // Redirect to admin dashboard
//         } else if (role === 'employee') {
//             navigate('/employee-dashboard');  // Redirect to employee dashboard
//         }
//     }

//     render() {
//         const { username, password, error, success } = this.state;

//         const backgroundStyle = {
//             backgroundImage: `url(${cityscapeImage})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             height: '100vh',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//         };

//         return (
//             <section style={backgroundStyle}>
//                 <div className="max-w-md mx-auto bg-neutral-800 rounded-bl-3xl rounded-tr-3xl border border-white p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg shadow-white">
//                     <h1 className="text-xl font-bold text-white md:text-6xl text-center">Login</h1>
//                     <form className="space-y-4 md:space-y-2 text-center" onSubmit={this.handleLogin}>
//                         <div className="mt-12">
//                             <label htmlFor="username" className="block text-xl text-neonPurple">Username</label>
//                             <input
//                                 id="username"
//                                 name="username"
//                                 type="text"
//                                 value={username}
//                                 onChange={this.handleInputChange}
//                                 className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="block text-xl text-neonPurple">Password</label>
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 value={password}
//                                 onChange={this.handleInputChange}
//                                 className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                             />
//                             <div className="mt-3 flex-row">
//                                 <input
//                                     id="checkbox"
//                                     type="checkbox"
//                                     className="appearance-none bg-gray-400 w-4 h-4 rounded-bl-sm rounded-tr-sm"
//                                 />
//                                 <label htmlFor="checkbox" className="text-sm text-neonBlue ml-3">Remember me</label>
//                                 <div className="mt-12">
//                                     <p className="text-sm text-neonPurple">New here?</p>
//                                     <Link to='/register' className="text-sm text-neonPurple hover:underline">Create an account</Link>
//                                 </div>
//                             </div>
//                         </div>

//                         {error && <p style={{ color: 'red' }}>{error}</p>}
//                         {success && <p style={{ color: 'green' }}>{success}</p>}

//                         <button type="submit" className="mt-4 bg-neonPurple text-white rounded-lg p-2">Login</button>
//                     </form>
//                 </div>
//             </section>
//         );
//     }
// }

// export default Login;



/////////////

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cityscapeImage from '../images/sky.webp';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook here

    // Function to decode the JWT manually
    function parseJwt(token) {
        const base64Url = token.split('.')[1]; // Get the payload part of the token
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        navigate('/main');
        /*
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message);
                setError('');
                localStorage.setItem('token', data.token);  // Save token in localStorage

                // Decode the JWT token manually
                const decoded = parseJwt(data.token);
                const role = decoded.role;
                console.log('User role: ', role);

                // Redirect user based on role
                if (role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (role === 'employee') {
                    navigate('/employee-dashboard');
                } else if (role === 'event_manager') {
                    navigate('/event-manager-dashboard');
                } else {
                    setError('User role not recognized');
                }
            } else {
                setError(data.error || 'An error occurred during login');
                setSuccess('');
            }
        } catch (error) {
            setError('An error occurred during login');
            setSuccess('');
        }
        */
    };

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
                <form className="space-y-4 md:space-y-2 text-center" onSubmit={handleLogin}>
                    <div className="mt-12">
                        <label htmlFor="username" className="block text-xl text-neonPurple">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
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
};

export default Login;

