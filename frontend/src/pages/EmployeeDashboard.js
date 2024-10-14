// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
// import NavBar from '../components/NavBar';  // Ensure NavBar component is imported

// const EmployeeDashboard = () => {
//     const [tasks, setTasks] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [error, setError] = useState('');
//     const [userInfo, setUserInfo] = useState({});
//     const [availability, setAvailability] = useState('free');
//     const [currentPosition, setCurrentPosition] = useState({});

//     useEffect(() => {
//         fetchTasks();
//         fetchEmployees();
//         fetchUserInfo();
//         getCurrentLocation();
//     }, []);

//     const fetchTasks = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/tasks/my-tasks', {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setTasks(data);
//             } else {
//                 setError('Error fetching tasks');
//             }
//         } catch (error) {
//             setError('Error fetching tasks');
//         }
//     };

//     const fetchEmployees = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/teams/employees', {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setEmployees(data);
//             } else {
//                 setError('Error fetching employees');
//             }
//         } catch (error) {
//             setError('Error fetching employees');
//         }
//     };

//     const fetchUserInfo = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/profile', {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setUserInfo(data);
//                 setAvailability(data.availability || 'free');
//             }
//         } catch (error) {
//             setError('Error fetching user info');
//         }
//     };

//     const getCurrentLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const { latitude, longitude } = position.coords;
//                 setCurrentPosition({ lat: latitude, lng: longitude });
//             });
//         } else {
//             setError('Geolocation is not supported by this browser.');
//         }
//     };

//     const updateTaskStatus = async (taskId, newStatus) => {
//         try {
//             const response = await fetch(`/api/tasks/${taskId}/status`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });

//             if (response.ok) {
//                 const updatedTasks = tasks.map(task =>
//                     task.id === taskId ? { ...task, status: newStatus } : task
//                 );
//                 setTasks(updatedTasks);
//             } else {
//                 setError('Error updating task status');
//             }
//         } catch (error) {
//             setError('Error updating task status');
//         }
//     };

//     const handleAvailabilityChange = async (e) => {
//         const newAvailability = e.target.value;
//         setAvailability(newAvailability);
//         try {
//             await fetch('http://localhost:5000/api/update-availability', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({ availability: newAvailability }),
//             });
//         } catch (error) {
//             setError('Error updating availability');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-neutral-900 text-white">
//             <NavBar /> {/* Added NavBar component */}
//             <div className="p-10 flex">
//                 <div className="w-1/4 bg-neutral-800 p-6 rounded-lg shadow-lg">
//                     <h2 className="text-2xl mb-4 text-neonPurple">Company Employees</h2>
//                     <ul className="space-y-4">
//                         {employees.map(employee => (
//                             <li key={employee.id} className="bg-neutral-700 p-4 rounded-lg">
//                                 <p className="font-bold text-neonPurple">{employee.first_name} {employee.last_name}</p>
//                                 <p className="text-sm text-gray-400">Availability: {employee.availability || 'Unknown'}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Main Content: Employee Tasks and Details */}
//                 <div className="w-3/4 ml-10">
//                     <h1 className="text-4xl mb-8">{userInfo.first_name}'s Dashboard</h1>

//                     <div className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-8">
//                         <h2 className="text-2xl mb-4">Your Details</h2>
//                         <p><strong>Availability: </strong>
//                             <select value={availability} onChange={handleAvailabilityChange} className="bg-neutral-700 p-2 rounded-lg">
//                                 <option value="free">Free</option>
//                                 <option value="busy">Busy</option>
//                                 <option value="away">Away</option>
//                             </select>
//                         </p>

//                         <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//                             <GoogleMap
//                                 mapContainerStyle={{ height: "300px", width: "100%" }}
//                                 zoom={15}
//                                 center={currentPosition}
//                             >
//                                 {currentPosition.lat && (
//                                     <Marker position={currentPosition} />
//                                 )}
//                             </GoogleMap>
//                         </LoadScript>
//                     </div>

//                     <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
//                         <h2 className="text-2xl mb-4">Your Tasks</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {tasks.map(task => (
//                                 <div key={task.id} className="bg-neutral-700 p-4 rounded-lg">
//                                     <h3 className="text-xl text-neonPurple">{task.task_name}</h3>
//                                     <p className="text-sm text-gray-400">{task.task_description}</p>
//                                     <p className="text-sm text-gray-400">Status: {task.status}</p>

//                                     <select
//                                         value={task.status}
//                                         onChange={(e) => updateTaskStatus(task.id, e.target.value)}
//                                         className="bg-neutral-600 p-2 rounded-lg mt-2 w-full"
//                                     >
//                                         <option value="in_progress">In Progress</option>
//                                         <option value="completed">Completed</option>
//                                     </select>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EmployeeDashboard;




import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import NavBar from '../components/NavBar';  // Ensure NavBar component is imported

const EmployeeDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [availability, setAvailability] = useState('free');
    const [currentPosition, setCurrentPosition] = useState({});

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
        fetchUserInfo();
        getCurrentLocation();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks/my-tasks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setTasks(data);
            } else {
                setError('Error fetching tasks');
            }
        } catch (error) {
            setError('Error fetching tasks');
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/teams/employees', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setEmployees(data);
            } else {
                setError('Error fetching employees');
            }
        } catch (error) {
            setError('Error fetching employees');
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUserInfo(data);
                setAvailability(data.availability || 'free');
            }
        } catch (error) {
            setError('Error fetching user info');
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const updatedTasks = tasks.map(task =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                );
                setTasks(updatedTasks);
            } else {
                setError('Error updating task status');
            }
        } catch (error) {
            setError('Error updating task status');
        }
    };

    const handleAvailabilityChange = async (e) => {
        const newAvailability = e.target.value;
        setAvailability(newAvailability);
        try {
            await fetch('http://localhost:5000/api/update-availability', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ availability: newAvailability }),
            });
        } catch (error) {
            setError('Error updating availability');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <NavBar /> {/* Adding the NavBar to the page */}
            <div className="p-10 flex">
                <div className="w-1/4 bg-neutral-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl mb-4 text-neonPurple">Company Employees</h2>
                    <ul className="space-y-4">
                        {employees.map(employee => (
                            <li key={employee.id} className="bg-neutral-700 p-4 rounded-lg">
                                <p className="font-bold text-neonPurple">{employee.first_name} {employee.last_name}</p>
                                <p className="text-sm text-gray-400">Availability: {employee.availability || 'Unknown'}</p> {/* Displaying availability */}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content: Employee Tasks and Details */}
                <div className="w-3/4 ml-10">
                    <h1 className="text-4xl mb-8">{userInfo.first_name}'s Dashboard</h1>

                    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-8">
                        <h2 className="text-2xl mb-4">Your Details</h2>
                        <p><strong>Availability: </strong>
                            <select value={availability} onChange={handleAvailabilityChange} className="bg-neutral-700 p-2 rounded-lg">
                                <option value="free">Free</option>
                                <option value="busy">Busy</option>
                                <option value="away">Away</option>
                            </select>
                        </p>

                        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                            <GoogleMap
                                mapContainerStyle={{ height: "300px", width: "100%" }}
                                zoom={15}
                                center={currentPosition}
                            >
                                {currentPosition.lat && (
                                    <Marker position={currentPosition} />
                                )}
                            </GoogleMap>
                        </LoadScript>
                    </div>

                    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">Your Tasks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map(task => (
                                <div key={task.id} className="bg-neutral-700 p-4 rounded-lg">
                                    <h3 className="text-xl text-neonPurple">{task.task_name}</h3>
                                    <p className="text-sm text-gray-400">{task.task_description}</p>
                                    <p className="text-sm text-gray-400">Status: {task.status}</p>

                                    <select
                                        value={task.status}
                                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                        className="bg-neutral-600 p-2 rounded-lg mt-2 w-full"
                                    >
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
