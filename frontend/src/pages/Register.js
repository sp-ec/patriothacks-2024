import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import cityscapeImage from '../images/sky.webp';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('employee'); // Default role
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate(); // <-- useNavigate hook for redirect

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    role,
                    company
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message);
                setError('');

                // Redirect to login after successful registration
                setTimeout(() => {
                    navigate('/login'); // <-- Redirect to login page
                }, 2000); // 2 second delay before redirect
            } else {
                setError(data.error);
                setSuccess('');
            }
        } catch (error) {
            setError('An error occurred during registration');
            setSuccess('');
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
                <h1 className="text-xl font-bold text-white md:text-6xl text-center">Create an Account</h1>
                <form className="space-y-4 md:space-y-2 text-center" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="username" className="block text-xl text-neonPurple">Username</label>
                        <input
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xl text-neonPurple">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    </div>
                    <div>
                        <label htmlFor="firstName" className="block text-xl text-neonPurple">First Name</label>
                        <input
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-xl text-neonPurple">Last Name</label>
                        <input
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-xl text-neonPurple">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
                        >
                            <option value="employee">Employee</option>
                            <option value="event_manager">Event Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-xl text-neonPurple">Company (optional)</label>
                        <input
                            id="company"
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
                        />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}

                    <button type="submit" className="mt-4 bg-neonPurple text-white rounded-lg p-2">Register</button>
                </form>
            </div>
        </section>
    );
};

export default Register;



// import React, { useState } from 'react';
// import cityscapeImage from '../images/sky.webp';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [role, setRole] = useState('employee'); // Default role
//     const [company, setCompany] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username,
//                     email,
//                     password,
//                     first_name: firstName,
//                     last_name: lastName,
//                     role,
//                     company
//                 }), // Send registration details to the backend
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setSuccess(data.message);
//                 setError('');
//             } else {
//                 setError(data.error);
//                 setSuccess('');
//             }
//         } catch (error) {
//             setError('An error occurred during registration');
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
//                 <h1 className="text-xl font-bold text-white md:text-6xl text-center">Create an Account</h1>
//                 <form className="space-y-4 md:space-y-2 text-center" onSubmit={handleRegister}>
//                     <div>
//                         <label htmlFor="username" className="block text-xl text-neonPurple">Username</label>
//                         <input
//                             id="username"
//                             name="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="block text-xl text-neonPurple">Email</label>
//                         <input
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
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
//                     </div>
//                     <div>
//                         <label htmlFor="firstName" className="block text-xl text-neonPurple">First Name</label>
//                         <input
//                             id="firstName"
//                             name="firstName"
//                             value={firstName}
//                             onChange={(e) => setFirstName(e.target.value)}
//                             className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="lastName" className="block text-xl text-neonPurple">Last Name</label>
//                         <input
//                             id="lastName"
//                             name="lastName"
//                             value={lastName}
//                             onChange={(e) => setLastName(e.target.value)}
//                             className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="role" className="block text-xl text-neonPurple">Role</label>
//                         <select
//                             id="role"
//                             name="role"
//                             value={role}
//                             onChange={(e) => setRole(e.target.value)}
//                             className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                         >
//                             <option value="employee">Employee</option>
//                             <option value="event_manager">Event Manager</option>
//                             <option value="admin">Admin</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label htmlFor="company" className="block text-xl text-neonPurple">Company (optional)</label>
//                         <input
//                             id="company"
//                             name="company"
//                             value={company}
//                             onChange={(e) => setCompany(e.target.value)}
//                             className="bg-gray-400 rounded-bl-lg rounded-tr-lg"
//                         />
//                     </div>

//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     {success && <p style={{ color: 'green' }}>{success}</p>}

//                     <button type="submit" className="mt-4 bg-neonPurple text-white rounded-lg p-2">Register</button>
//                 </form>
//             </div>
//         </section>
//     );
// };

// export default Register;
