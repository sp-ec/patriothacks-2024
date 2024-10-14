// import React, { useState, useEffect } from 'react';

// const EmployeeDashboard = () => {
//     const [tasks, setTasks] = useState([]); // Tasks assigned to the employee
//     const [unassignedTasks, setUnassignedTasks] = useState([]); // Unassigned tasks
//     const [employees, setEmployees] = useState([]); // All company employees
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchTasks(); 
//         fetchUnassignedTasks(); 
//         fetchEmployees(); 
//     }, []);
    

// // Fetch tasks assigned to the logged-in employee
// const fetchTasks = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/api/tasks/my-tasks', {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//         });
//         const data = await response.json();
//         if (response.ok) {
//             setTasks(data);
//         } else {
//             setError('Error fetching your tasks');
//         }
//     } catch (error) {
//         setError('Error fetching your tasks');
//     }
// };

// // Fetch all unassigned tasks
// const fetchUnassignedTasks = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/api/tasks/unassigned-tasks', {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//         });
//         const data = await response.json();
//         if (response.ok) {
//             setUnassignedTasks(data);
//         } else {
//             setError('Error fetching unassigned tasks');
//         }
//     } catch (error) {
//         setError('Error fetching unassigned tasks');
//     }
// };


//     // Fetch all employees from the same company
//     const fetchEmployees = async () => {
//         try {
//             const response = await fetch('/api/teams/employees', {
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

//     return (
//         <div className="min-h-screen bg-neutral-900 text-white p-10 flex">
//             {/* Left Sidebar - Company Employees */}
//             <div className="w-1/4 bg-neutral-800 p-6 rounded-lg shadow-lg">
//                 <h2 className="text-2xl mb-4 text-neonPurple">Company Employees</h2>
//                 <ul className="space-y-4">
//                     {employees.map(employee => (
//                         <li key={employee.id} className="flex items-center">
//                             <img
//                                 src={employee.imageUrl || '/default-avatar.png'}
//                                 alt="Employee"
//                                 className="w-10 h-10 rounded-full mr-4"
//                             />
//                             <div>
//                                 <p>{employee.first_name} {employee.last_name}</p>
//                                 <p className="text-sm text-gray-400">{employee.role}</p>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             {/* Main Section - Employee Tasks */}
//             <div className="w-2/4 ml-10">
//                 <h1 className="text-4xl mb-8">Employee Dashboard</h1>

//                 <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
//                     <h2 className="text-2xl mb-4">Your Tasks</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {tasks.map(task => (
//                             <div key={task.id} className="bg-neutral-700 p-4 rounded-lg">
//                                 <h3 className="text-xl text-neonPurple">{task.task_name}</h3>
//                                 <p className="text-sm text-gray-400">{task.task_description}</p>
//                                 <p className="text-sm text-gray-400">Status: {task.status}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>

//             {/* Right Sidebar - Unassigned Tasks */}
//             <div className="w-1/4 pl-8">
//                 <h2 className="text-2xl font-bold mb-4">Unassigned Tasks</h2>
//                 <div className="space-y-4">
//                     {unassignedTasks.map(task => (
//                         <div key={task.id} className="bg-neutral-700 p-4 rounded-lg shadow-lg">
//                             <h3 className="text-xl text-neonPurple">{task.task_name}</h3>
//                             <p className="text-sm text-gray-400">{task.task_description}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EmployeeDashboard;


//////////////////////////



// import React, { useState, useEffect } from 'react';

// const EmployeeDashboard = () => {
//     const [tasks, setTasks] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchTasks();
//         fetchEmployees();
//     }, []);

//     const fetchTasks = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/tasks/my-tasks', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
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
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
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

//     // Update task status
//     const updateTaskStatus = async (taskId, newStatus) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/tasks/${taskId}/status`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//                 body: JSON.stringify({ status: newStatus }),
//             });

//             if (response.ok) {
//                 fetchTasks(); // Refetch tasks after update
//             } else {
//                 setError('Error updating task status');
//             }
//         } catch (error) {
//             setError('Error updating task status');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-neutral-900 text-white p-10">
//             <div className="flex">
//                 <div className="w-1/4 bg-neutral-800 p-6 rounded-lg shadow-lg">
//                     <h2 className="text-2xl mb-4 text-neonPurple">Company Employees</h2>
//                     <ul className="space-y-4">
//                         {employees.map(employee => (
//                             <li key={employee.id} className="flex items-center">
//                                 <img
//                                     src={employee.imageUrl || '/default-avatar.png'}
//                                     alt="Employee"
//                                     className="w-10 h-10 rounded-full mr-4"
//                                 />
//                                 <div>
//                                     <p>{employee.first_name} {employee.last_name}</p>
//                                     <p className="text-sm text-gray-400">{employee.role}</p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 <div className="w-3/4 ml-10">
//                     <h1 className="text-4xl mb-8">Employee Dashboard</h1>

//                     <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
//                         <h2 className="text-2xl mb-4">Your Tasks</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {tasks.map(task => (
//                                 <div key={task.id} className="bg-neutral-700 p-4 rounded-lg">
//                                     <h3 className="text-xl text-neonPurple">{task.task_name}</h3>
//                                     <p className="text-sm text-gray-400">{task.task_description}</p>
//                                     <p className="text-sm text-gray-400">Status: {task.status}</p>

//                                     {/* Dropdown to update task status */}
//                                     <select
//                                         value={task.status}
//                                         onChange={(e) => updateTaskStatus(task.id, e.target.value)}
//                                         className="bg-neutral-600 text-white p-2 rounded-lg mt-2"
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

const EmployeeDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const [location, setLocation] = useState(''); // To store employee's location
    const [availability, setAvailability] = useState('free'); // Default availability
    const [currentPosition, setCurrentPosition] = useState({}); // Google Maps coordinates

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
        getCurrentLocation(); // Get current location on component mount
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

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({ lat: latitude, lng: longitude });
                setLocation(`${latitude}, ${longitude}`); // Save coordinates as location
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
                alert('Task status updated!');
                const updatedTasks = tasks.map(task =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                );
                setTasks(updatedTasks);
            } else {
                alert('Error updating task status');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleAvailabilityChange = (e) => {
        setAvailability(e.target.value);
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-10">
            <div className="flex">
                {/* Sidebar: Company Employees */}
                <div className="w-1/4 bg-neutral-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl mb-4 text-neonPurple">Company Employees</h2>
                    <ul className="space-y-4">
                        {employees.map(employee => (
                            <li key={employee.id} className="flex items-center">
                                <img
                                    src={employee.imageUrl || '/default-avatar.png'}
                                    alt="Employee"
                                    className="w-10 h-10 rounded-full mr-4"
                                />
                                <div>
                                    <p>{employee.first_name} {employee.last_name}</p>
                                    <p className="text-sm text-gray-400">{employee.role}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content: Employee Tasks and Details */}
                <div className="w-3/4 ml-10">
                    <h1 className="text-4xl mb-8">Employee Dashboard</h1>

                    {/* Employee Details */}
                    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-8">
                        <h2 className="text-2xl mb-4">Your Details</h2>
                        <p><strong>Availability: </strong>
                            <select value={availability} onChange={handleAvailabilityChange}>
                                <option value="free">Free</option>
                                <option value="busy">Busy</option>
                                <option value="away">Away</option>
                            </select>
                        </p>
                        <p><strong>Location: </strong>{location}</p>

                        {/* Google Maps integration */}
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

                    {/* Your Tasks */}
                    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">Your Tasks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map(task => (
                                <div key={task.id} className="bg-neutral-700 p-4 rounded-lg">
                                    <h3 className="text-xl text-neonPurple">{task.task_name}</h3>
                                    <p className="text-sm text-gray-400">{task.task_description}</p>
                                    <p className="text-sm text-gray-400">Status: {task.status}</p>

                                    {/* Dropdown to update task status */}
                                    <select
                                        value={task.status}
                                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                        className="bg-neutral-600 p-2 rounded-lg mt-2"
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

