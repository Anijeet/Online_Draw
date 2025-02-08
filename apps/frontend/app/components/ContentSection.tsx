import { Card } from "@repo/ui/card";
import Link from "next/link";


const ContentSection = () => {
  
  return (
    <div className="p-3 mt-5 w-full pl-32 flex ">
      <h2 className="bg-[#c76727]   w-2 h-[800px] rounded-3xl"></h2>
      <div>
      <div className="flex flex-col ">
        <img
          className="w-10 h-10 -mt-10 -ml-6"
          src="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/bulb_icon.svg"
          alt=""
        />
        <div>
          <h2 className="text-3xl font-semibold ml-10">Create</h2>
          <p className="text-lg ml-10 m-4">
            Simply designed to create perfect results fast. Elementary tools,
            advanced features and unlimited options with an infinite canvas.
          </p>
        </div>
        <div className="flex gap-10">
          <Card
            className="border-2 m-2 ml-10 w-80 p-3"
            titleClassName="text-base font-mono pl-6"
            textClassName="text-lg font-medium"
            title="✏️ Simple"
            children="Zero Learning"
          />
          <Card
            className="border-2 m-2 ml-10 w-80 p-3"
            titleClassName="text-base font-mono pl-6"
            textClassName="text-lg font-medium"
            title="📖 Libaries"
            children="Ready to sketch."
          />
          <Card
            className="border-2 m-2 ml-10 w-80 p-3"
            titleClassName="text-base font-mono pl-6"
            textClassName="text-lg font-medium"
            title="✨Generative AI Simple"
            children="Inhance your capability"
          />
        </div>
      </div>
      <div className="flex flex-col mt-5 ">
        <img
          className="w-10 h-10 -mt-10 -ml-6"
          src="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/collaborate_arrows_icon.svg"
          alt=""
        />
        <div>
          <h2 className="text-3xl font-semibold ml-10">Collaborate</h2>
          <p className="text-lg ml-10 m-4">
          Send link, get feedback and finish the idea together.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <Card
            className="border-2 m-2 ml-10 w-88 p-3"
            titleClassName="text-base font-mono pl-6"
            textClassName="text-lg font-medium"
            title="🔗 Shareable link"
            children="Share to those user to edit and contriute."
          />
          <Card
            className="border-2 m-2 ml-10 w-88 p-3"
            titleClassName="text-base font-mono pl-6"
            textClassName="text-lg font-medium"
            title="🔏 Read Only Link"
            children="Share just content to the user."
          />
        </div>
      </div>
      <div className="flex flex-col mt-5 ">
        <img
          className="w-10 h-10 -mt-10 -ml-6"
          src="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/hand_easy_icon.svg"
          alt=""
        />
        <div>
          <h2 className="text-3xl font-semibold ml-10">The easiest way to get your thoughts on screen
          </h2>
          <p className="text-lg ml-10 m-4">
          Quick drawings and mockups with a unique aesthetic. It's dead simple. We help you with intuitive shortcuts & command palette.

          </p>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <Card
            className="border-2 m-2 ml-10 w-88 p-3"
            titleClassName="text-base font-mono pl-6"
            textClassName="text-lg font-medium"
            title="👤 John Doe"
            children="LOVE Excalidraw. Diagramming made simple. With an AI integration that’s actually useful!."
          />
        </div>
      </div>
      <div className="flex flex-col mt-5 ">
        <img
          className="w-10 h-10 -mt-10 -ml-6"
          src="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/excalidraw_logo_icon.svg"
          alt=""
        />
        <div>
          <h2 className="text-3xl font-semibold ml-10">Online Thoughts.
          </h2>
          <p className="text-lg ml-10 m-4">
          Something on your mind? Simply start drawing!

          </p>
        </div>
        <div className="flex gap-10">
        <Link href={'/signin'}  className="bg-[#ea8a4a] border-2 border-[#c76727] p-2 px-10 ml-10 rounded-lg hover:bg-transparent transition-all duration-300" >Draw now</Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ContentSection;
