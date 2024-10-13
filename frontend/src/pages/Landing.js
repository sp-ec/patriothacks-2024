import React from 'react';
import { useEffect } from 'react';

const LandingPage = () => {
    // Add animation class after page load
    useEffect(() => {
        const elements = document.querySelectorAll('.slide-in');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 200); // Delay for each letter
        });
    }, []);

    return (
        <div className="font-sans text-white">
            {/* Navbar */}
            <nav className="bg-neutral-900 text-white p-6 fixed w-full top-0 z-50 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-4xl font-extrabold glow-text">Coordin8</div>
                    <ul className="flex space-x-8 text-lg">
                        <li><a href="#home" className="hover:text-neonPurple">Home</a></li>
                        <li><a href="#features" className="hover:text-neonPurple">Features</a></li>
                        <li><a href="#about" className="hover:text-neonPurple">About Us</a></li>
                        <li><a href="#contact" className="hover:text-neonPurple">Contact</a></li>
                    </ul>
                    <div>
                        <a href="/login" className="hover:bg-neonPurple glow-button py-2 px-4 rounded-lg transition-all">Login</a>
                        <a href="/register" className="hover:bg-neonPurple glow-button py-2 px-4 ml-4 rounded-lg transition-all">Sign Up</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative h-screen bg-cover bg-center text-white" style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/08/10/03/47/people-2613263_960_720.jpg)' }}>
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 slide-in hidden">Coordin8</h1>
                    <p className="text-2xl md:text-3xl mb-8 slide-in hidden">Making Event Planning Effortless</p>
                    <a href="/register" className="glow-button hover:bg-neonPurple py-3 px-6 rounded-lg text-xl font-bold transition-all">Get Started</a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-neutral-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12 slide-in hidden">Why Coordin8?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow glow-box">
                            <img src="https://cdn.pixabay.com/photo/2016/11/29/09/32/event-1867329_960_720.jpg" alt="Streamlined Events" className="rounded-md w-full mb-6" />
                            <h3 className="text-2xl font-semibold mb-4">Streamlined Event Planning</h3>
                            <p>Manage every aspect of your event from planning to execution effortlessly.</p>
                        </div>
                        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow glow-box">
                            <img src="https://cdn.pixabay.com/photo/2016/11/23/15/00/decor-1853220_960_720.jpg" alt="Collaborate Seamlessly" className="rounded-md w-full mb-6" />
                            <h3 className="text-2xl font-semibold mb-4">Collaborate Seamlessly</h3>
                            <p>Work with your team in real-time and keep everyone updated instantly.</p>
                        </div>
                        <div className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow glow-box">
                            <img src="https://cdn.pixabay.com/photo/2017/01/20/00/30/concert-1998201_960_720.jpg" alt="Track and Assign Tasks" className="rounded-md w-full mb-6" />
                            <h3 className="text-2xl font-semibold mb-4">Task Management Simplified</h3>
                            <p>Assign, track, and manage tasks with ease, making event planning stress-free.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section id="about" className="bg-neutral-900 text-white py-24">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12 slide-in hidden">About Coordin8</h2>
                    <p className="max-w-4xl mx-auto text-xl">
                        Coordin8 is the ultimate event management platform, created to make event planning easy, collaborative, and efficient. 
                        Whether you're hosting a small gathering or a large corporate event, our platform empowers you to handle every detail.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-neutral-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12 slide-in hidden">Contact Us</h2>
                    <p className="max-w-4xl mx-auto text-xl mb-6">We'd love to hear from you! Whether you're curious about features, pricing, or anything else, our team is here to help.</p>
                    <a href="mailto:contact@coordin8.com" className="glow-button hover:bg-neonPurple py-3 px-8 rounded-lg text-lg transition-all">Get In Touch</a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900 text-white py-8">
                <div className="container mx-auto flex justify-between items-center">
                    <p>&copy; 2024 Coordin8. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="hover:text-neonPurple">Facebook</a>
                        <a href="https://twitter.com" className="hover:text-neonPurple">Twitter</a>
                        <a href="https://linkedin.com" className="hover:text-neonPurple">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
