import React, { Component } from 'react'
import Dropdown from './Dropdown'

export class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'Available',
        };
    }

    handleStatusChange = (newStatus) => {
        this.setState({status: newStatus});
    }

    render() {
        return (
            <>
                <div className='flex flex-row'>
                    <img src={require('../images/template_profile.png')} alt='Template' className='h-20'></img>
                    <div className='flex flex-col mt-1 ml-8'>
                        <h1 className='text-3xl text-white'>Your Name</h1>
                        <div className='flex flex-row mt-2'>
                            <div className={`w-3 h-3 rounded-full mt-1.5 ${this.state.status === 'Available' ? 'bg-green-500' : 
                                this.state.status === 'Busy' ? 'bg-yellow-500' : 
                                this.state.status === 'Unavailable' ? 'bg-red-500' : 'bg-gray-500'}`}>
                            </div>
                            <div className="ml-3">
                            <Dropdown onStatusChange={this.handleStatusChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProfileHeader