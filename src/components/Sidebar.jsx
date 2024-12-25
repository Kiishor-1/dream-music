import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Sidebar({ toggleSidebar }) {
    const navLinks = [
        {
            title: 'Home',
            icon: './images/home.png',
            to: '/',
        },
        {
            title: 'Trends',
            icon: './images/trends.png',
            to: '/trends',
        },
        {
            title: 'Library',
            icon: './images/library.png',
            to: '/library',
        },
        {
            title: 'Discorver',
            icon: './images/discover.png',
            to: '/discover',
        },
    ]
    return (
        <div className='flex flex-col items-center px-10 py-4 w-[350px] h-full bg-black text-white'>
            <div className="flex w-full relative">
                <img className='w-[64px] h-[64px]' src="./images/logo.png" alt="" />
                <h1 className='flex items-center text-[32px] leading-[54px] font-semibold'>
                    <span className='text-[#FF5656]'>Dream</span>
                    Music
                </h1>
                <FaTimes
                    className='cursor-pointer hover:text-gray-400 lg:hidden block text-[1.2rem] absolute top-0 right-[-1.5rem]'
                    onClick={toggleSidebar}
                />
            </div>
            <section className='mt-8 w-full'>
                <h2 className='text-[12px] leading-[21px] font-semibold mb-4'>Menu</h2>
                <ul className='flex flex-col gap-4'>
                    {
                        navLinks.map((link, id) => (
                            <Link to={link.to} key={id} className='flex items-center gap-6'>
                                <img className='w-[20px]' src={link.icon} alt="" />
                                <span className='text-[18px] leading-[27px]'>{link.title}</span>
                            </Link>
                        ))
                    }
                </ul>
            </section>
            <section className='mt-auto w-full space-y-4'>
                <h2 className='text-[12px] leading-[21px] font-semibold mb-4'>General</h2>
                <p className='flex items-center gap-6'>
                    <img className='w-[20px]' src="./images/settings.png" alt="" />
                    <span>Settings</span>
                </p>
                <p className='flex items-center gap-6'>
                    <img className='w-[20px]' src="./images/logout.png" alt="" />
                    <span>Logout</span>
                </p>
            </section>
        </div>
    )
}
