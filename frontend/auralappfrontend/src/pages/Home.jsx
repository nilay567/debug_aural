import React, {useState,useEffect} from "react";
import Button from '../components/Button'
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {

    const [featuredCourses, setFeaturedCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/getCourse')
            .then(async (res) => {
                console.log(res.data.data);
                setFeaturedCourses(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    
    return(
        <>
             {/* Hero Section */}
             <header className="text-center p-8 mt-16">
                <h1 className="m-4 text-3xl md:text-4xl font-bold">Welcome to AuralApp!</h1>
                <p className="mb-4 text-sm md:text-base">Empowering deaf students through education</p>
                {/* <button className="bg-black text-white py-4 px-8 md:py-3 md:px-10 rounded">Get Started</button> */}
                <Button/>

            </header>

            {/* Main Content Section */}
            <main className="text-center my-8 md:my-12">
                <section className="what-we-offer container mx-auto mt-8 md:mt-12 p-6 md:p-10 rounded-md md:m-1/4">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">What we Offer</h2>
                        {/* Education Section  */}
                        <div className="flex items-center rounded-md border border-gray-500 p-2 md:p-4 mb-4 hover:transform hover:scale-105">
                            <img src={logo} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 mr-4" />
                            <div>
                                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-left transition-transform">Education</h3>
                                <p className="text-xs md:text-sm transition-transform">Access comprehensive educational resources and courses</p>
                            </div>
                        </div>

                        {/* Skills Section  */}
                        <div className="flex items-center rounded-md border border-gray-500 p-2 md:p-4 mb-4 hover:transform hover:scale-105">
                            <img src={logo} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 mr-4" />
                            <div>
                                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-left">Skills</h3>
                                <p className="text-xs md:text-sm">Access comprehensive educational resources and courses</p>
                            </div>
                        </div>
                        {/* Exposure Section  */}
                        <div className="flex items-center rounded-md border border-gray-500 p-2 md:p-4 mb-4 hover:transform hover:scale-105">
                            <img src={logo} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 mr-4" />
                            <div>
                                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-left">Exposure</h3>
                                <p className="text-xs md:text-sm">Access comprehensive educational resources and courses</p>
                            </div>
                        </div>
                        {/* Explore Section  */}
                        <div className="flex items-center rounded-md border border-gray-500 p-2 md:p-4 mb-4 hover:transform hover:scale-105">
                            <img src={logo} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 mr-4" />
                            <div>
                                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-left">Explore</h3>
                                <p className="text-xs md:text-sm">Access comprehensive educational resources and courses</p>
                            </div>
                        </div>
                        {/* Donation Section  */}
                        <div className="flex items-center rounded-md border border-gray-500 p-2 md:p-4 mb-4 hover:transform hover:scale-105">
                            <img src={logo} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 mr-4" />
                            <div>
                                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-left">Donation</h3>
                                <p className="text-xs md:text-sm">Access comprehensive educational resources and courses</p>
                            </div>
                        </div>
                        {/* Experts Section  */}
                        <div className="flex items-center rounded-md border border-gray-500 p-2 md:p-4 mb-4 hover:transform hover:scale-105">
                            <img src={logo} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 mr-4" />
                            <div>
                                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-left">Experts</h3>
                                <p className="text-xs md:text-sm">Access comprehensive educational resources and courses</p>
                            </div>
                        </div>
                        {/* Sucess Stories Section  */}
                        <div className="flex items-center rounded-md border border-gray-500 p-2 md:p-4 mb-4 hover:transform hover:scale-105">
                            <img src={logo} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 mr-4" />
                            <div>
                                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 text-left">Sucess Stories</h3>
                                <p className="text-xs md:text-sm">Access comprehensive educational resources and courses</p>
                            </div>
                        </div>
                </section>

                {/* Featured Courses */}

                <section className="featured-courses p-4 md:p-16">
                    <h2 className="text-4xl font-bold mb-6">Featured Courses</h2>
                    <p className="mb-6">Explore our popular courses</p>
                    <div className="container flex items-center justify-center flex-wrap mx-auto">
                        {featuredCourses.slice(0,3).map((course, index) => (
                            <div key={index} className="our__courses_card border rounded-md overflow-hidden border-gray-300 transition-transform hover:scale-105 m-12">
                                {/* Extracting the video URL for the first lecture of each subject */}
                                <iframe
                                    title={`course ${index + 1}`}
                                    width="100%"
                                    height="250"
                                    src={course.levels[0].lectures[0].videourl}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                    className="w-full h-44 object-cover object-center"
                                ></iframe>
                                <div className="our_content p-2 bg-gray-300 text-left">
                                    <p className="text-sm ">{course.name}</p>
                                    <h2 className="text-lg font-semibold">{course.description}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {/*Student Reviews*/}

                <section className="flex items-center justify-center flex-col md:flex-row mt-6">
                    <div className="flex-1 pr-4">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-5">What Our Students Say</h2>
                    </div>
                    <div className="flex-1 pl-4 flex flex-col md:flex-row gap-4 ">
                        <div className="w-full md:w-60 bg-gray-200 p-4 rounded-lg shadow-lg mb-5 md:mb-0 transition-transform hover:scale-105">
                            <h3 className="text-base md:text-sm font-semibold mb-2">John Doe</h3>
                            <p className="text-sm font-normal mb-4 md:text-base md:mb-0 text-left">
                                I had an amazing experience with this program.
                            </p>
                        </div>
                        <div className="w-full md:w-60 bg-gray-200 p-4 rounded-lg shadow-lg mb-6 md:mb-0 transition-transform hover:scale-105">
                            <h3 className="text-base md:text-sm font-semibold mb-2">Jane Smith</h3>
                            <p className="text-sm font-normal mb-4 md:text-base md:mb-0 text-left">
                                Nice course! Would suggest others to join it.
                            </p>
                        </div>
                    </div>
                </section>

            {/* Discover More */}
                <section className="featured-courses p-4 md:p-16">
                    <h2 className="text-4xl font-bold mb-6 mt-6">Discover More</h2>

                    <div className="flex flex-wrap justify-center">
                        <div className="our__courses_card border rounded-md overflow-hidden transition-transform hover:scale-105 m-12">
                            <img src={"https://shorturl.at/gvxQ3"} alt="item 1 offer card" className="w-32 h-32 object-cover mx-auto rounded-full"/>
                            <div className="our__courses_content text-center mt-2">
                                <p className="text-lg font-bold mb-2">Education</p>
                                <h2 className="text-sm mb-2">Expand your knowledge</h2>
                                <h2 className="text-xl font-bold mb-2 ">Educational resources</h2>
                            </div>
                        </div>

                        <div className="our__courses_card border rounded-md overflow-hidden transition-transform hover:scale-105 m-12">
                            <img src={"https://shorturl.at/gvxQ3"} alt="item 1 offer card" className="w-32 h-32 object-cover mx-auto rounded-full"/>
                            <div className="our__courses_content text-center mt-2">
                                <p className="text-lg font-bold mb-2">Skills</p>
                                <h2 className="text-sm mb-2">Develop your abilities</h2>
                                <h2 className="text-xl font-bold mb-2">Skill-based courses</h2>
                            </div>
                        </div>

                        <div className="our__courses_card border rounded-md overflow-hidden transition-transform hover:scale-105 m-12">
                            <img src={"https://shorturl.at/gvxQ3"} alt="item 1 offer card" className="w-32 h-32 object-cover mx-auto rounded-full"/>
                            <div className="our__courses_content text-center mt-2">
                                <p className="text-lg font-bold mb-2">Exposure</p>
                                <h2 className="text-sm mb-2">Gain practical Experience</h2>
                                <h2 className="text-xl font-bold mb-2">Internship opportunities</h2>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Student profile */}
                
                    <section className="student-profile flex items-center justify-left ml-16">
                        <div className="logo-container">
                            <img src={"https://shorturl.at/gvxQ3"} alt="item 1 offer card" className="w-20 h-24 md:w-26 md:h-26 object-cover mx-auto rounded-full sm:w-24 sm:h-24 hover:transform hover:scale-105" />
                        </div>
                        <div className="content-container ml-4">
                            <h2 className="mb-2 text-left text-lg sm:text-xl md:text-2xl">John Doe</h2>
                            <div className="flex mb-2">
                                <p className="inline-block px-2 py-1 border border-gray-400 bg-gray-200 mr-2 rounded text-sm sm:text-sm md:text-base">Student</p>
                                <p className="inline-block px-2 py-1 border border-gray-400 bg-gray-200 rounded text-sm sm:text-sm md:text-base">Explorer</p>
                            </div>
                            <p className="mb-2 text-left text-1xl sm:text-base md:text-base">Passionate about learning and exploring new opportunities</p>
                        </div>
                    </section>

                {/*Latest updates*/}

                <section className="flex items-center justify-center flex-col md:flex-row mt-6">
                    <div className="flex-1 pr-4">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-5">Latest Update</h2>
                    </div>
                    <div className="flex-1 pl-4 flex flex-col md:flex-row gap-4">
                        <div className="our__courses_card border rounded-md overflow-hidden border-gray-300 transition-transform hover:scale-105 m-6 w-48 sm:w-48 md:w-64">
                            <img
                                src={"https://shorturl.at/gvxQ3"}
                                alt="item 1 offer card"
                                className="w-full h-48 md:h-40 object-cover object-center"
                            />
                            <div className="our_content p-2">
                                <p className="text-sm md:text-lg text-base font-normal text-left mb-2">
                                    Excited to announce our upcoming Webinar!
                                </p>
                                <div className="flex space-x-2 mb-2">
                                    <div className="text-xs md:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">Webinar</div>
                                    <div className="text-xs md:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">Education</div>
                                </div>
                                <div className="pl-0 pr-4 text-sm font-bold text-left">Jane Smith</div>
                            </div>
                        </div>

                        <div className="our__courses_card border rounded-md overflow-hidden border-gray-300 transition-transform hover:scale-105 m-6 w-48 sm:w-48 md:w-64">
                            <img
                                src={"https://shorturl.at/gvxQ3"}
                                alt="item 1 offer card"
                                className="w-full h-48 md:h-40 object-cover object-center"
                            />
                            <div className="our_content p-2">
                                <p className="text-sm md:text-lg text-base font-normal text-left mb-2">
                                    Excited to announce our upcoming Webinar!
                                </p>
                                <div className="flex space-x-2 mb-2">
                                    <div className="text-xs md:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">Success</div>
                                    <div className="text-xs md:text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded">Inspiration</div>
                                </div>
                                <div className="pl-0 pr-4 text-sm font-bold text-left">John Doe</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Performance metrics */}
                <section className="performance_metrics p-4 md:p-16">
                    <h2 className="text-4xl font-bold mb-12">Performance Metrics</h2>
                    <div className="flex justify-center">
                        <div className="w-1/2 mr-4 mb-2 ml-auto">
                            <h3 className="mb-2 text-gray-500">Courses Complete</h3>
                            <p className="text-xl font-bold mb-2">5</p>
                            <p>+50%</p>
                        </div>
                        <div className="w-1/2 mb-2 mr-auto">
                            <h3 className="mb-2 text-gray-500">Skills points earned</h3>
                            <p className="text-xl font-bold mb-2">4500</p>
                            <p>+25%</p>
                        </div>
                    </div>
                </section>

                <footer>
                    <div className="flex justify-center">
                        <Link to="/about-us" className="mr-4 text-xl-2 md:text-m">
                        About us
                        </Link>
                        <Link to="/contact-us" className="mr-4 text-xl-2 md:text-m">
                        Contact us
                        </Link>
                        <Link to="/privacy-policy" className="text-xl-2 md:text-m">
                        Privacy Policy
                        </Link>
                    </div>
                </footer>
                
            </main>
        </>
    )
}

export default Home;