const Task = (props) => {
    return (
        <div>
            <div className='flex flex-row bg-white bg-opacity-25 p-4 m-4 rounded-bl-3xl rounded-tr-3xl border-2 border-neonPurple'>
                <div className='flex flex-col'>
                    <h1 className='text-white text-2xl'>{props.name}</h1>
                    <p className='text-white mt-1'>{props.description}</p>
                </div>
                <div className='flex flex-col ml-auto'>

                </div>
            </div>
        </div>
    )
}

export default Task