import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#e6802d]">
      <h1 className="w-full mt-4 pt-10 p-5 text-5xl flex justify-center font-semibold">
        Contact Us
      </h1>
      <div className="flex p-20 px-60 gap-40 w-full">
        <a href="mailto:anijeetmani18@gmail.com" className="flex text-md gap-1 hover:bg-[#f89442] p-1 rounded cursor-pointer items-center">
          <MdEmail /> anijeetmani18@gmail.com
        </a>
        <a href="tel:+919046290691" className="flex text-md gap-1 hover:bg-[#f89442] p-1 rounded cursor-pointer items-center">
          <FaPhoneAlt /> +91 9046290691
        </a>
        <a href="https://www.linkedin.com/in/anijeet-mani-557225262/"
        target="_blank"
        rel="noopener noreferrer" className="flex text-md gap-1 hover:bg-[#f89442] p-1 rounded cursor-pointer items-center">
          <FaLinkedin />
          Linked In
        </a>
        <a href="https://github.com/Anijeet/Online_Draw"
        target="_blank"
        rel="noopener noreferrer" className="flex text-md gap-1 hover:bg-[#f89442] p-1 rounded cursor-pointer items-center">
          <FaGithub />
          Github
        </a>
      </div>
    </div>
  );
};

export default Footer;
