import React, { useState, useEffect } from 'react';

const EmployeeDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    // Fetch tasks and employees from the same company
    useEffect(() => {
        fetch('/api/employee/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
            .catch(err => setError('Error fetching tasks'));

        fetch('/api/employee/employees')
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => setError('Error fetching employees'));
    }, []);

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-10">
            <div className="flex">
                {/* Side Panel for Employee List */}
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

                {/* Task List */}
                <div className="w-3/4 ml-10">
                    <h1 className="text-4xl mb-8">Employee Dashboard</h1>

                    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl mb-4">Your Tasks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tasks.map(task => (
                                <div key={task.id} className="bg-neutral-700 p-4 rounded-lg">
                                    <h3 className="text-xl text-neonPurple">{task.taskName}</h3>
                                    <p className="text-sm text-gray-400">{task.description}</p>
                                    <p className="text-sm text-gray-400">Status: {task.status}</p>
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










// import React, { useState, useEffect } from 'react';

// const EmployeeDashboard = () => {
//     const [tasks, setTasks] = useState([]);

//     // Fetch tasks assigned to the logged-in employee
//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const response = await fetch('/api/tasks/my-tasks', {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Include JWT token
//                     }
//                 });
//                 const data = await response.json();
//                 setTasks(data);  // Store the tasks in state
//             } catch (error) {
//                 console.error('Error fetching tasks:', error);
//             }
//         };

//         fetchTasks();
//     }, []);

//     // Optional: Handle task status update (e.g., mark task as completed)
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
//                 alert('Task status updated!');
//                 // Optionally refetch tasks to update the list
//                 const updatedTasks = tasks.map(task =>
//                     task.id === taskId ? { ...task, status: newStatus } : task
//                 );
//                 setTasks(updatedTasks);  // Update the tasks state with the new status
//             } else {
//                 alert('Error updating task status');
//             }
//         } catch (error) {
//             console.error('Error updating task status:', error);
//         }
//     };

//     return (
//         <div className="employee-dashboard">
//             <h1>Employee Dashboard</h1>

//             {/* List of Tasks */}
//             <h2>Your Tasks</h2>
//             <ul>
//                 {tasks.map((task) => (
//                     <li key={task.id}>
//                         <strong>{task.taskName}</strong>: {task.description}
//                         <div>
//                             <p>Status: {task.status}</p>
//                             {/* Optional: Dropdown to update task status */}
//                             <select
//                                 value={task.status}
//                                 onChange={(e) => updateTaskStatus(task.id, e.target.value)}
//                             >
//                                 <option value="pending">Pending</option>
//                                 <option value="in-progress">In Progress</option>
//                                 <option value="completed">Completed</option>
//                             </select>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default EmployeeDashboard;
