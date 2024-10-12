import React, { Component } from 'react'
import cityscapeImage from '../images/sky.webp';
import '../App.css';

export class Login extends Component {
    render() {
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
                <div className="max-w-md min-w-[350px] mx-auto bg-neutral-800 rounded-bl-3xl rounded-tr-3xl border border-white p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg shadow-white">
                    <h1 className="glitch text-xl font-bold text-white md:text-6xl text-center">Login</h1>
                    <form className="space-y-4 md:space-y-2 text-center">
                        <div className="mt-12">
                            <label for="username" className="block text-xl text-neonPurple">name</label>
                            <input id="username" className="bg-gray-400 rounded-bl-lg rounded-tr-lg"></input>
                        </div>
                        <div>
                            <label for="password" type="password" className="block text-xl text-neonPurple">password</label>
                            <input id="password" className="bg-gray-400 rounded-bl-lg rounded-tr-lg"></input>

                            <div className="mt-3 flex-row">
                                <input id="checkbox" type="checkbox" value="" className="appearance-none bg-gray-400 w-4 h-4 rounded-bl-sm rounded-tr-sm"></input>
                                <label for="checkbox" type="text" className="text-sm text-neonBlue ml-3">remember me</label>

                                <div className="mt-6">
                                    <button type="submit" className="w-3xl min-w-[200px] bg-neutral-600 text-neonBlue rounded-bl-lg rounded-tr-lg py-1 hover:bg-neonPurple">Login</button>
                                </div>
                                <div className="mt-6">
                                    <p className="text-sm text-neonPurple">new here?</p>
                                    <a className="text-sm text-neonPurple hover:underline" href='#'>create an account</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}

export default Login