import React, { Component } from 'react'

export class Login extends Component {
    render() {
        return (
            <section class="bg-neutral-800">
                <body >
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 mt-72">
                        <h1 class="text-xl font-bold text-white md:text-4xl text-center">Login</h1>
                        <form class="space-y-4 md:space-y-2 text-center">
                            <div>
                                <label for="username" class="block text-md text-purple-500">name</label>
                                <input class="bg-gray-400 rounded-sm"></input>
                            </div>
                            <div>
                                <label for="username" class="block text-md text-purple-500">password</label>
                                <input class="bg-gray-400 rounded-sm"></input>
                            </div>
                            <div class="flex-row">
                                    <input type="checkbox" class="appearance-none bg-gray-400 w-4 h-4 rounded-sm"></input>
                                    <label class="text-sm text-blue-400 ml-3">remember me</label>
                            </div>
                        </form>
                    </div>
                </body>
            </section>
        )
    }
}

export default Login