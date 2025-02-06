import { RiArrowDropDownLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { Button } from "@repo/ui/button";
import { FaRegStar } from "react-icons/fa";
import Link from "next/link";


const Navbar = () => {
  return (
    <div className="w-full p-5 fixed top-0 flex pr-14 items-center justify-between bg-white bg-opacity-80">
      <div className=" items-center flex">
        <div>
          <img className="cursor-pointer" src="https://plus.excalidraw.com/images/logo.svg" alt="" />
        </div>
        <div className="flex ml-16 gap-14">
          <h1 className="flex p-1 px-2 rounded-lg hover:bg-[#efe9e5] cursor-pointer  items-center gap-1">Services</h1>
          <h1 className="flex p-1 px-2 rounded-lg hover:bg-[#efe9e5] cursor-pointer  items-center gap-1">Contact Us</h1>
          <h1 className="flex p-1 px-2 rounded-lg hover:bg-[#efe9e5] cursor-pointer  items-center gap-1">
            <span>Resources</span>
            <span className="text-xl">
              <RiArrowDropDownLine />
            </span>
          </h1>
        </div>
      </div>
      <div className="w-30 flex items-center gap-6 ">
        <div className="flex p-1 px-2 rounded-lg hover:bg-[#efe9e5] cursor-pointer  items-center gap-1">
          <FaGithub />1.1k
        </div>
        <div>
          <Link href={'/signin'}>
            <Button className="border-2 py-2 px-3 rounded-xl border-[#efe9e5] hover:bg-[#f9dcc8] ">
              Sign In
            </Button>{" "}
          </Link>
        </div>
        <div>
          <Button className="border-2 py-2 px-3 rounded-xl bg-[#FFBC85] border-[#FFBC85] hover:bg-[#f5ab79fa] ">
            Free Board
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
