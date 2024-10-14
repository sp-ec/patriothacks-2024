// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import cityscapeImage from '../images/sky.webp';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const navigate = useNavigate(); 


//     function parseJwt(token) {
//         const base64Url = token.split('.')[1]; 
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));

//         return JSON.parse(jsonPayload);
//     }

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         navigate('/main');
        
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
//                 setSuccess(data.message);
//                 setError('');
//                 localStorage.setItem('token', data.token);  // Save token in localStorage

//                 // Decode the JWT token manually
//                 const decoded = parseJwt(data.token);
//                 const role = decoded.role;
//                 console.log('User role: ', role);

//                 // Redirect user based on role
//                 if (role === 'admin') {
//                     navigate('/admin-dashboard');
//                 } else if (role === 'employee') {
//                     navigate('/employee-dashboard');
//                 } else if (role === 'event_manager') {
//                     navigate('/event-manager-dashboard');
//                 } else {
//                     setError('User role not recognized');
//                 }
//             } else {
//                 setError(data.error || 'An error occurred during login');
//                 setSuccess('');
//             }
//         } catch (error) {
//             setError('An error occurred during login');
//             setSuccess('');
//         }
//     };

//     const backgroundStyle = {
//         backgroundImage: `url(${cityscapeImage})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//     };

//     return (
//         <section style={backgroundStyle}>
//             <div className="max-w-md mx-auto bg-neutral-800 rounded-bl-3xl rounded-tr-3xl border border-white p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg shadow-white">
//                 <h1 className="glitch font-bold text-white md:text-6xl text-center">Login</h1>
//                 <form className="space-y-4 md:space-y-2 text-center" onSubmit={handleLogin}>
//                     <div className="mt-12">
//                         <label htmlFor="username" className="block text-xl text-neonPurple">Username</label>
//                         <input
//                             id="username"
//                             name="username"
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="password" className="block text-xl text-neonPurple">Password</label>
//                         <input
//                             id="password"
//                             name="password"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                         />
//                         <div className="mt-3 flex-row">
//                             <input
//                                 id="checkbox"
//                                 type="checkbox"
//                                 className="appearance-none bg-gray-400 w-4 h-4 rounded-bl-sm rounded-tr-sm"
//                             />
//                             <label htmlFor="checkbox" className="text-sm text-neonBlue ml-3">Remember me</label>
//                             <div className="mt-12">
//                                 <p className="text-sm text-neonPurple">New here?</p>
//                                 <Link to='/register' className="text-sm text-neonPurple hover:underline">Create an account</Link>
//                             </div>
//                         </div>
//                     </div>

//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     {success && <p style={{ color: 'green' }}>{success}</p>}

//                     <button type="submit" className="mt-4 bg-neonPurple text-white rounded-lg p-2">Login</button>
//                 </form>
//             </div>
//         </section>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import cityscapeImage from '../images/sky.webp';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();  // useNavigate hook for redirection

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

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
                localStorage.setItem('token', data.token);  // Save token
                localStorage.setItem('role', data.role);    // Save user role
                redirectToDashboard(data.role);  // Redirect based on role
            } else {
                setError(data.error);
                setSuccess('');
            }
        } catch (error) {
            setError('An error occurred during login');
            setSuccess('');
        }
    };

    const redirectToDashboard = (role) => {
        if (role === 'admin') {
            navigate('/admin-dashboard');  // Redirect to admin dashboard
        } else if (role === 'employee') {
            navigate('/employee-dashboard');  // Redirect to employee dashboard
        } else if (role === 'event_manager') {
            navigate('/event-manager-dashboard');  // Redirect to event manager dashboard
        }
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
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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

export default Login;
