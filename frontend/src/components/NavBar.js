import React from 'react';

const NavBar = () => {
    return (
        <nav className="bg-neutral-900 text-white p-6 fixed w-full top-0 z-50 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-4xl font-extrabold glow-text">Status Now</div>
                <ul className="flex space-x-8 text-lg">
                    <li><a href="/dashboard" className="hover:text-neonPurple">Dashboard</a></li>
                    <li><a href="/profile" className="hover:text-neonPurple">Profile</a></li>
                    <li><a href="/logout" className="hover:text-neonPurple">Logout</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
