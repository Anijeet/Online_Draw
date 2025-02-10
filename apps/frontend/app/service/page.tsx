import React from 'react'
import Navbar from '../components/Navbar'
import { CiCircleChevRight } from "react-icons/ci";

const page = () => {
  return (
    <div className='flex flex-col'>
        <div><Navbar/></div>
        <div className='mt-40 text-6xl text-[#ae7447] w-full justify-center flex  gap-4'>Service <span className='font-mono text-3xl bg-[#f4b27c] text-white py-1 flex items-center px-1 rounded '>price</span> simple</div>
        <div className='w-full gap-5 grid grid-cols-2 px-80'>
            <div className='mt-8 border-2 rounded-xl p-10 flex flex-col justify-center items-center border-[#643f21]'>
                <h1 className='text-2xl text-[#613919]'>Free</h1>
                <button className='bg-[#f4b27c] border-2 hover:bg-transparent transition-all duration-300  p-1 rounded-lg m-3 mt-8 text-xl font-semibold'>Draw now</button>
                <div className='list-none flex flex-col justify-center ml-20 mt-10 gap-5'>
                    <li className='flex text-[#613919] items-center gap-1'><CiCircleChevRight/> Full editor functions</li>
                    <li className='flex text-[#613919] items-center gap-1'><CiCircleChevRight/> 1 infinite scene</li>
                    <li className='flex text-[#613919] items-center gap-1'><CiCircleChevRight/> Unlimited collaborations</li>
                    <li className='flex text-[#613919] items-center gap-1'><CiCircleChevRight/> Export to .png, .svg etc.</li>
                    <li className='flex text-[#613919] items-center gap-1'><CiCircleChevRight/> Open source software for devs.</li>
                </div>
            </div>
            <div className='mt-8 border-2 rounded-xl p-10 flex flex-col justify-center items-center border-[#156126]'>
                <h1 className='text-md text-red-500'>*In Developing Phase*</h1>
                <h1 className='text-2xl text-[#156716]'>Plus</h1>
                <button className='bg-[#7cf4ae] border-2 hover:bg-transparent transition-all duration-300 p-1 rounded-lg m-3 mt-8 text-xl font-semibold'>Try Plus</button>
                <div className='list-none flex flex-col justify-center ml-20 mt-10 gap-5'>
                    <li className='flex text-[#156716] items-center gap-1'><CiCircleChevRight/> Unlimited folders</li>
                    <li className='flex text-[#156716] items-center gap-1'><CiCircleChevRight/> Many infinite scene</li>
                    <li className='flex text-[#156716] items-center gap-1'><CiCircleChevRight/> AI integration</li>
                    <li className='flex text-[#156716] items-center gap-1'><CiCircleChevRight/> Voice hangouts and Screen sharing</li>
                    <li className='flex text-[#156716] items-center gap-1'><CiCircleChevRight/> Cloud management.</li>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page