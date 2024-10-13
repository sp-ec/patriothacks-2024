import React, { Component } from 'react'
import cityscapeImage from '../images/sky.webp';
import '../App.css';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            rememberMe: false
        };
    }

    handleCheckboxChange = (event) => {
        this.setState(prevState => ({ rememberMe: !prevState.rememberMe, }));
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
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
                <div className="max-w-md min-w-[350px] mx-auto bg-neutral-800 rounded-bl-3xl rounded-tr-3xl border border-white p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg shadow-white">
                    <h1 className="glitch font-bold text-white text-6xl text-center">Login</h1>
                    <form className="space-y-4 md:space-y-2 text-center">
                        <div className="mt-12">
                            <label for="username" className="block text-xl text-neonPurple">Username</label>
                            <input id="username" name="username" value={this.state.username} onChange={this.handleInputChange} className="bg-gray-400 rounded-bl-lg rounded-tr-lg"></input>
                        </div>
                        <div>
                            <label for="password" type="password" className="block text-xl text-neonPurple">Password</label>
                            <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} className="bg-gray-400 rounded-bl-lg rounded-tr-lg"></input>

                            <div className="mt-3 flex-row">
                                <input id="checkbox" type="checkbox" value="" checked={this.state.rememberMe} onChange={this.handleCheckboxChange} className="appearance-none bg-gray-400 w-4 h-4 rounded-bl-sm rounded-tr-sm"></input>
                                <label htmlFor="checkbox" type="text" className="text-sm text-neonBlue ml-3">Remember Me</label>

                                <div className="mt-6">
                                    <button type="submit" className="w-3xl min-w-[200px] bg-neutral-700 text-neonBlue rounded-bl-lg rounded-tr-lg py-1 hover:bg-neonPurple">Login</button>
                                </div>
                                <div className="mt-6">
                                    <p className="text-sm text-neonPurple">New Here?</p>
                                    <a className="text-sm text-neonPurple hover:underline" href='#'>Create An Account</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default Login

//ED: Needed to setup login for authorization tests
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

