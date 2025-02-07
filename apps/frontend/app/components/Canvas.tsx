import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import IconsButtons from "./IconsButtons";
import { RiRectangleLine } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdStraight } from "react-icons/md";
import { MdOutlinePanTool } from "react-icons/md";
import { LuEraser } from "react-icons/lu";

import { Game } from "../draw/Game";
import { useRouter } from "next/navigation";


export type Tool = "circle" | "rect" | "line" | "panTool" | "pencil" | "eraser";

export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) {
    

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("rect")
    const [grabbing, setGrabbing] = useState(false)
    const router = useRouter();
    const [shouldRender, setShouldRender] = useState(false);
    const[colorPanel,setColorPanel]=useState(false)
    const[red,setRed]=useState(false)
    const[blue,setBlue]=useState(false)
    const[yellow,setYellow]=useState(false)
    const[purple,setPurple]=useState(false)
    const[green,setGreen]=useState(false)
    const[pink,setPink]=useState(false)
    const[white,setWhite]=useState(false)
    const[gray,setGray]=useState(false)
    const[orange,setOrange]=useState(false)
    

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket,red,blue,green,gray,pink,white,orange,yellow,purple);
            setGame(g);

           

            if(selectedTool === "panTool"){
                const handleGrab = () => {
                    setGrabbing((prev)=> !prev)
                }

                document.addEventListener("mousedown", handleGrab)
                document.addEventListener("mouseup", handleGrab)

                return () =>{
                    document.removeEventListener("mousedown", handleGrab)
                    document.removeEventListener("mouseup", handleGrab)
                }

            }



        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "1":
                    setSelectedTool("rect");
                    break;
                case "2":
                    setSelectedTool("circle");
                    break;
                case "3":
                    setSelectedTool("line");
                    break;
                case "4":
                    setSelectedTool("pencil");
                    break;
                case "5":
                    setSelectedTool("panTool");
                    break;
                case "6":
                    setSelectedTool("eraser");
                    break;
            }
        };
        
        document.addEventListener("keydown", handleKeyDown);
    

            return () => {
                g.destroy();
                document.removeEventListener("keydown", handleKeyDown)
            }
        }



    }, [canvasRef,red,blue,green,pink,white,purple,yellow,pink,orange]);
    
  
    return <div className="w-screen overflow-hidden h-screen relative">
        <canvas onClick={()=>{
            setColorPanel(false)
        }} className={`h-screen overflow-hidden bg-black
    ${(selectedTool === "panTool") ? 
    (grabbing ? "cursor-grabbing" : "cursor-grab") : 
    "cursor-crosshair"} ` }
     style={{ cursor: selectedTool === "rect" ? "crosshair" :  selectedTool === "circle" ? "crosshair" :  selectedTool === "line" ? "crosshair": selectedTool === "panTool" ? "grab" : selectedTool==="pencil" ? "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"26\" height=\"26\"><path d=\"M4 20h16v2H4v-2zm16.586-11.414l-2.172-2.172a1.5 1.5 0 0 0-2.121 0L4.414 16.293l-.707 4.242 4.242-.707L20.586 8.586a1.5 1.5 0 0 0 0-2.121z\" fill=\"%23FFFFFF\"/></svg>') 6 20, auto" : selectedTool === "eraser" ? "url('https://img.icons8.com/?size=20&id=98412&format=png&color=FFFFFF' ),auto"  : "default"  }} 
     ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <Topbar setBlue={setBlue} setGray={setGray} setGreen={setGreen} setOrange={setOrange} setPink={setPink} setPurple={setPurple} setRed={setRed} setWhite={setWhite} setYellow={setYellow} colorPanel={colorPanel} setSelectedTool={setSelectedTool} selectedTool={selectedTool} setColorPanel={setColorPanel} />
    </div>
}

function Topbar({selectedTool, setSelectedTool, setColorPanel,colorPanel,setRed,setBlue,setGray,setGreen,setOrange,setWhite,setPink,setYellow,setPurple}: {
    selectedTool: Tool,
    colorPanel:boolean,
    setRed: (value: boolean) => void,
    setBlue: (value: boolean) => void,
    setYellow: (value: boolean) => void,
    setGreen:(value: boolean) => void,
    setGray:(value: boolean) => void,
    setOrange:(value: boolean) => void,
    setWhite:(value: boolean) => void,
    setPink:(value: boolean) => void,
    setPurple: (value: boolean) => void,
    setColorPanel: (value: boolean) => void,
    setSelectedTool: (s: Tool) => void
}) {
    return <div> 
        <div className="drawing-container fixed items-center text-center h-[40px] flex top-8 left-[650px] bg-slate-900 p-2  px-10 gap-5 rounded-lg" style={{ cursor: selectedTool === "rect" ? "crosshair" : "default" }}>
        <IconsButtons shortKey={1}
        onClick={()=>{
            setSelectedTool('rect')
            setColorPanel(true)
         }}
         activated={selectedTool==="rect"} icon={<RiRectangleLine className={`h-5 w-5  `  }/>} />
        <IconsButtons shortKey={2}
         onClick={()=>{
            setSelectedTool('circle') 
            setColorPanel(true)}}
         activated={selectedTool==="circle"} icon={<FaRegCircle />}  />
        <IconsButtons  shortKey={3}
        onClick={()=>{setSelectedTool('line')
            setColorPanel(true)
        }}
        activated={selectedTool==="line"} icon={<MdStraight />}  />
         <IconsButtons shortKey={4}
        onClick={()=>{setSelectedTool('panTool')
        }}
        activated={selectedTool==="panTool"} icon={<MdOutlinePanTool />}  />
        <IconsButtons shortKey={5}
        onClick={()=>{setSelectedTool('pencil')
            setColorPanel(true)
        }}
        activated={selectedTool==="pencil"} icon={<FaPencilAlt />}  />
        <IconsButtons shortKey={6}
        onClick={()=>{setSelectedTool('eraser')}}
        activated={selectedTool==="eraser"} icon={<LuEraser />}  />
        </div>
       {colorPanel? <div className="flex flex-col h-[320px] w-[200px] rounded-xl bg-slate-800 fixed top-[200px] left-0">
            <h1 className=" text-lg font-bold text-white p-3  flex justify-center">Colors</h1>
            <div className="h-full w-full justify-center ml-5 grid grid-cols-3 p-3">
                <button
                   onClick={()=>{
                    setBlue(false)
                    setGray(false)
                    setGreen(false)
                    setOrange(false)
                    setPink(false)
                    setPurple(false)
                    setRed(true)
                    setWhite(false)
                    setYellow(false)
                    
                }} 
                  className={`bg-red-600 rounded-full h-8 w-8 border-2 `}></button>
                <button 
                onClick={()=>{
                    setBlue(true)
                    setGray(false)
                    setGreen(false)
                    setOrange(false)
                    setPink(false)
                    setPurple(false)
                    setRed(false)
                    setWhite(false)
                    setYellow(false)
                }} className={`bg-blue-600 rounded-full h-8 w-8 border-2 `}></button>
                <button 
                onClick={()=>{
                    setBlue(false)
                    setGray(false)
                    setGreen(false)
                    setOrange(false)
                    setPink(false)
                    setPurple(false)
                    setRed(false)
                    setWhite(false)
                    setYellow(true)
                }}  className={`bg-yellow-600 rounded-full h-8 w-8 border-2 `}></button>
                <button 
                onClick={()=>{
                    setBlue(false)
                    setGray(false)
                    setGreen(true)
                    setOrange(false)
                    setPink(false)
                    setPurple(false)
                    setRed(false)
                    setWhite(false)
                    setYellow(false)
                }}  className={`bg-green-600 rounded-full h-8 w-8 border-2 `}></button>
                <button 
                onClick={()=>{
                    setBlue(false)
                    setGray(false)
                    setGreen(false)
                    setOrange(false)
                    setPink(false)
                    setPurple(true)
                    setRed(false)
                    setWhite(false)
                    setYellow(false)
                }}  className={`bg-purple-600 rounded-full h-8 w-8 border-2 `}></button>
                <button 
                onClick={()=>{
                    setBlue(false)
                    setGray(false)
                    setGreen(false)
                    setOrange(true)
                    setPink(false)
                    setPurple(false)
                    setRed(false)
                    setWhite(false)
                    setYellow(false)
                }}  className={`bg-orange-600 rounded-full h-8 w-8 border-2 `}></button>
                <button 
                onClick={()=>{
                    setBlue(false)
                    setGray(true)
                    setGreen(false)
                    setOrange(false)
                    setPink(false)
                    setPurple(false)
                    setRed(false)
                    setWhite(false)
                    setYellow(false)
                }}  className={`bg-gray-600 rounded-full h-8 w-8 border-2 `}></button>
                <button 
                onClick={()=>{
                    setBlue(false)
                    setGray(false)
                    setGreen(false)
                    setOrange(false)
                    setPink(true)
                    setPurple(false)
                    setRed(false)
                    setWhite(false)
                    setYellow(false)
                }}  className={`bg-pink-600 rounded-full h-8 w-8 border-2 `}></button>
                <button onClick={()=>{
                    setBlue(false)
                    setGray(false)
                    setGreen(false)
                    setOrange(false)
                    setPink(false)
                    setPurple(false)
                    setRed(false)
                    setWhite(true)
                    setYellow(false)
                }}  className={`bg-white rounded-full h-8 w-8 border-2 `}></button>
            </div>
        </div> : ""}
    </div>
}