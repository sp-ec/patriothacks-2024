import React, { Component } from 'react'

export class Login extends Component {
    render() {
        return (
            <section class="bg-neutral-800">
                <body >
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8 mt-72">
                        <h1 class="text-xl font-bold text-white md:text-4xl">Login</h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <p class="text-purple-500">name</p>
                            <p class="text-purple-500">password</p>
                        </form>
                    </div>
                </body>
            </section>
        )
    }
}

export default Login