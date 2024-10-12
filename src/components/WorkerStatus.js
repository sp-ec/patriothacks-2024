import LocationIcon from '../icons/LocationIcon'
import ClockIcon from '../icons/ClockIcon'

const WorkerStatus = (props) => {
    return (
        <div className={props.bg}>
            <div className='flex flex-row p-4 m-4 rounded'>
                <div className='flex flex-row basis-1/3'>
                    <img src={require('../images/template_profile.png')} alt='Template profile picture' className='h-16 mr-6'></img>
                    <div className='flex flex-col mt-2'>
                        <h1 className='text-white text-2xl'>{props.name}</h1>
                        <div className='flex flex-row'>
                            <div className='w-3 h-3 bg-green-500 rounded-full mt-1.5'></div>
                            <p className='text-white ml-3'>{props.status}</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-start basis-1/5'>
                    <div className='flex flex-row mt-2'>
                        <LocationIcon />
                        <p className='text-white ml-3 line-clamp-1'>{props.location}</p>
                    </div>
                    <div className='flex flex-row mt-3'>
                        <ClockIcon />
                        <p className='text-white ml-3 line-clamp-1'>{props.endTime}</p>
                    </div>
                </div>

                <div className='flex basis-1/2 mr-8'>
                    <p className='text-white ml-3'>{props.activity}</p>
                </div>

            </div>
        </div>
    )
}

export default WorkerStatus