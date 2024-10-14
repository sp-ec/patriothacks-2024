import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';  // Import NavBar

const EventManagerDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [tasks, setTasks] = useState([]); // For storing tasks
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLocation, setTaskLocation] = useState(''); // Track task location
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchEmployees();
        fetchTasks(); // Fetch tasks on component mount
    }, []);

    // Fetch all employees
    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/teams/employees', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
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

    // Fetch all tasks
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setTasks(data); // Store tasks in state
            } else {
                setError('Error fetching tasks');
            }
        } catch (error) {
            setError('Error fetching tasks');
        }
    };


    const handleAssignTask = async (e) => {
        e.preventDefault();
    
        const assignedUserId = selectedEmployee === 'unassigned' ? null : selectedEmployee; // Handle unassigned
    
        try {
            const response = await fetch('http://localhost:5000/api/tasks/assign-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    employeeId: assignedUserId,
                    taskName,
                    taskDescription,
                    taskLocation, // Ensure the location is passed here
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSuccess(data.message);
                setError('');
                fetchTasks(); // Fetch updated tasks after assignment
            } else {
                setError(data.error);
                setSuccess('');
            }
        } catch (error) {
            setError('An error occurred while assigning the task');
        }
    };
    
    // Helper to render task bubbles by status
    const renderTaskBubbles = (status) => {
        return tasks
            .filter(task => task.status === status)
            .map(task => {
                const firstName = employees.find(emp => emp.id === task.assigned_user_id)?.first_name || 'Unassigned';
                const lastName = employees.find(emp => emp.id === task.assigned_user_id)?.last_name || '';
    
                return (
                    <div key={task.id} className="bg-neutral-800 text-white p-4 mb-2 rounded-lg shadow-lg">
                        <h4 className="text-lg font-bold">{task.task_name}</h4>
                        <p>{task.task_description}</p>
                        <p className="text-sm text-gray-400">
                            Assigned to: {`${firstName} ${lastName}`}
                        </p>
                        <p className="text-sm text-gray-400">Location: {task.location || ''}</p>
                    </div>
                );
            });
    };
    



    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            <NavBar /> 
            <div className="p-10 mt-16 flex"> {/* Added mt-16 for top margin */}
                <div className="w-3/4">
                    <h1 className="text-4xl mb-8">Event Manager Dashboard</h1>
    
                    <form onSubmit={handleAssignTask}>
                        <div className="mb-4">
                            <label htmlFor="taskName" className="block text-lg mb-2">
                                Task Name
                            </label>
                            <input
                                type="text"
                                id="taskName"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className="bg-neutral-700 p-2 rounded-lg w-full"
                            />
                        </div>
    
                        <div className="mb-4">
                            <label htmlFor="taskDescription" className="block text-lg mb-2">
                                Task Description
                            </label>
                            <textarea
                                id="taskDescription"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                className="bg-neutral-700 p-2 rounded-lg w-full"
                            />
                        </div>
    
                        <div className="mb-4">
                             <label htmlFor="taskLocation" className="block text-lg mb-2">
                                  Task Location
                             </label>
                            <input
                                type="text"
                                id="taskLocation"
                                value={taskLocation}
                                onChange={(e) => setTaskLocation(e.target.value)}
                                className="bg-neutral-700 p-2 rounded-lg w-full"
                            />
                        </div>
    
                        <div className="mb-4">
                            <label htmlFor="employee" className="block text-lg mb-2">
                                Assign to Employee
                            </label>
                            <select
                                id="employee"
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                className="bg-neutral-700 p-2 rounded-lg w-full"
                            >
                                <option value="unassigned">Unassigned</option>
                                {employees.map(employee => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.first_name} {employee.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
    
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
    
                        <button type="submit" className="bg-neonPurple p-2 rounded-lg mt-4">
                            Assign Task
                        </button>
                    </form>
                </div>
    
                {/* Sidebar for Tasks */}
                <div className="w-1/4 pl-8">
                    <h2 className="text-2xl font-bold mb-4">Tasks</h2>
                    <h3 className="text-xl font-semibold mb-2">Pending</h3>
                    {renderTaskBubbles('pending')}
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">In Progress</h3>
                    {renderTaskBubbles('in_progress')}
                    
                    <h3 className="text-xl font-semibold mt-6 mb-2">Completed</h3>
                    {renderTaskBubbles('completed')}
                </div>
            </div>
        </div>
    );
};

export default EventManagerDashboard;
