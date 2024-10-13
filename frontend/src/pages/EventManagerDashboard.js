import React, { useState, useEffect } from 'react';

const EventManagerDashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/api/employees', {
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

    const handleAssignTask = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/assign-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    employeeId: selectedEmployee,
                    taskName,
                    taskDescription,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message);
                setError('');
            } else {
                setError(data.error);
                setSuccess('');
            }
        } catch (error) {
            setError('An error occurred while assigning the task');
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-10">
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
                    <label htmlFor="employee" className="block text-lg mb-2">
                        Assign to Employee
                    </label>
                    <select
                        id="employee"
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        className="bg-neutral-700 p-2 rounded-lg w-full"
                    >
                        <option value="">Select an employee</option>
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
    );
};

export default EventManagerDashboard;









// import React, { useState, useEffect } from 'react';

// const EventManagerDashboard = () => {
//     const [tasks, setTasks] = useState([]);
//     const [newTask, setNewTask] = useState({ taskName: '', description: '', assigned_user_id: '' });
//     const [employees, setEmployees] = useState([]);
//     const [success, setSuccess] = useState('');
//     const [error, setError] = useState('');

//     // Fetch employees and tasks for this company
//     useEffect(() => {
//         fetch('/api/event-manager/employees')
//             .then(res => res.json())
//             .then(data => setEmployees(data))
//             .catch(err => setError('Error fetching employees'));

//         fetch('/api/event-manager/tasks')
//             .then(res => res.json())
//             .then(data => setTasks(data))
//             .catch(err => setError('Error fetching tasks'));
//     }, []);

//     const handleCreateTask = async () => {
//         try {
//             const response = await fetch('/api/create-task', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newTask),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setSuccess('Task created successfully!');
//                 setError('');
//                 setNewTask({ taskName: '', description: '', assigned_user_id: '' });
//                 setTasks([...tasks, data.task]);
//             } else {
//                 setError(data.error);
//             }
//         } catch (error) {
//             setError('Error creating task');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-neutral-900 text-white p-10">
//             <div className="flex">
//                 {/* Side Panel for Employee List */}
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

//                 {/* Main Content for Task Creation and Task List */}
//                 <div className="w-3/4 ml-10">
//                     <h1 className="text-4xl mb-8">Event Manager Dashboard</h1>

//                     {/* Task Creation Section */}
//                     <div className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-8">
//                         <h2 className="text-2xl mb-4">Create New Task</h2>
//                         <input
//                             type="text"
//                             placeholder="Task Name"
//                             value={newTask.taskName}
//                             onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
//                             className="bg-neutral-700 p-2 w-full mb-4 text-white rounded"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Description"
//                             value={newTask.description}
//                             onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//                             className="bg-neutral-700 p-2 w-full mb-4 text-white rounded"
//                         />
//                         <select
//                             value={newTask.assigned_user_id}
//                             onChange={(e) => setNewTask({ ...newTask, assigned_user_id: e.target.value })}
//                             className="bg-neutral-700 p-2 w-full mb-4 text-white rounded"
//                         >
//                             <option value="">Select Employee</option>
//                             {employees.map(employee => (
//                                 <option key={employee.id} value={employee.id}>
//                                     {employee.first_name} {employee.last_name}
//                                 </option>
//                             ))}
//                         </select>
//                         <button
//                             onClick={handleCreateTask}
//                             className="bg-neonPurple p-2 rounded-lg hover:bg-neonPurple-dark text-white"
//                         >
//                             Create Task
//                         </button>

//                         {success && <p className="text-green-500 mt-4">{success}</p>}
//                         {error && <p className="text-red-500 mt-4">{error}</p>}
//                     </div>

//                     {/* Task List Section */}
//                     <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
//                         <h2 className="text-2xl mb-4">Tasks for Company</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                             {tasks.map(task => (
//                                 <div key={task.id} className="bg-neutral-700 p-4 rounded-lg">
//                                     <h3 className="text-xl text-neonPurple">{task.taskName}</h3>
//                                     <p className="text-sm text-gray-400">{task.description}</p>
//                                     <p className="text-sm text-gray-400">Assigned to: {task.assigned_user_id}</p>
//                                     <p className="text-sm text-gray-400">Status: {task.status}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EventManagerDashboard;





