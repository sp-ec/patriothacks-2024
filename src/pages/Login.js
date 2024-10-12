import React, { Component } from 'react'

export class Login extends Component {
    render() {
        return (
            <section >
                <div className="max-w-md mx-auto bg-black rounded-lg border border-white p-6 space-y-4 md:space-y-6 sm:p-8 mt-64 shadow-lg shadow-white">
                    <h1 className="text-xl font-bold text-white md:text-6xl text-center">Login</h1>
                    <form className="space-y-4 md:space-y-2 text-center">
                        <div className="mt-10">
                            <label for="username" className="block text-xl text-purple-500">name</label>
                            <input id="username" class="bg-gray-400 rounded-sm"></input>
                        </div>
                        <div>
                            <label for="password" type="text" className="block text-xl text-purple-500">password</label>
                            <input id="password" class="bg-gray-400 rounded-sm"></input>

                            <div className="mt-3 flex-row">
                                <input type="checkbox" className="appearance-none bg-gray-400 w-4 h-4 rounded-sm"></input>
                                <label type="text" className="text-sm text-blue-400 ml-3">remember me</label>

                                <div className="mt-8">
                                    <p className="text-sm text-purple-500">new here?</p>
                                    <a className="text-sm text-purple-500 hover:underline" href='#'>create an account</a>
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