import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="mt-28">
      <div className=" text-black ">
        <div className="w-full flex justify-between p-5 px-80">
          <img
            className="w-60 h-60"
            src="https://thumbs.dreamstime.com/b/simple-doodle-drawing-equipment-hand-drawn-59163146.jpg"
            alt=""
          />
          <img
            className="w-60 h-60"
            src="https://i.pinimg.com/736x/a5/0b/c8/a50bc8dc45bee65f4144796ddbb7f884.jpg"
            alt=""
          />
        </div>
        <div className="w-full flex justify-center text-[#c76727] gap-1 text-4xl font-bold">
          Online
          <span className="px-2 p-1 font-mono rounded-xl bg-[#ebf46a] ">
            {" "}
            Thoughts{" "}
          </span>
          made simple
        </div>
        <div className="w-full flex justify-center -ml-6 mt-2 text-[#693918]">
          Idea, Collaborate and Share with OnlineDraw
        </div>
        <div className="flex flex-col  mt-14">
          <h1 className="text-lg w-full justify-center flex font-bold">
            Let's Share your thoughts
          </h1>
          <Link href={"/signup"}>
            <button className="border-2 px-2 py-2 mx-[700px] mt-3 text-lg rounded-xl bg-[#FFBC85] border-[#FFBC85] hover:bg-[#f5ab79fa] ">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
