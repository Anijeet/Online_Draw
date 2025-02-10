"use client"

import { FaPencilRuler } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";


const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const router=useRouter()
  
    useEffect(() => {
      return () => {
        document.body.classList.remove("cursor-wait"); 
      };
    }, []);

    const handleClick = () => {
      setLoading(true);
      document.body.classList.add("cursor-wait"); 
  
   
      setTimeout(() => {
        document.body.classList.remove("cursor-wait");
        setLoading(false);
      }, 1000); 
    };
  return (
    <div className="w-full p-5 fixed top-0 flex pr-14 items-center justify-between bg-white bg-opacity-80">
      <div className=" items-center flex">
        <div className="text-3xl flex gap-1 items-center cursor-pointer font-serif text-[#DB611A] " onClick={()=>{router.push('/')}}>
          <FaPencilRuler/>Online_Draw
        </div>
        <div className="flex ml-16 gap-14">
          <h1 onClick={()=>{router.push('/service')}} className="flex p-1 px-2 rounded-lg hover:bg-[#efe9e5] cursor-pointer  items-center gap-1">Services</h1>
          <h1 className="flex p-1 px-2 rounded-lg hover:bg-[#efe9e5] cursor-pointer  items-center gap-1">Contact Us</h1>
          <h1 className="flex p-1 px-2 rounded-lg hover:bg-[#efe9e5] cursor-pointer  items-center gap-1">
            <span>Resources</span>
          </h1>
        </div>
      </div>
      <div className="w-30 flex items-center gap-6 ">
        <a href="https://github.com/Anijeet/Online_Draw"
        target="_blank"
        rel="noopener noreferrer" className="flex p-1 px-2 rounded-lg hover:bg-[#efe9e5] cursor-pointer  items-center gap-1">
          <FaGithub />1.1k
        </a>
        <div>
          <Link href={'/signin'} onClick={handleClick}>
            <Button className={`border-2 py-2 px-3 rounded-xl border-[#efe9e5] hover:bg-[#f9dcc8] ${
                loading ? "cursor-wait" : ""}`}>
              {loading ? "Loading..." : "Sign In"}
            </Button>{" "}
          </Link>
        </div>
        <div>
          <Link href={'/signin'} className="border-2 py-2 px-3 rounded-xl bg-[#FFBC85] border-[#FFBC85] hover:bg-[#f5ab79fa] ">
            Free Board
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
