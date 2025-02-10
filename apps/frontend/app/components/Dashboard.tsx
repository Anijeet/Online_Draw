"use client"

import { HTTP_BACKEND } from "@/config";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, usePathname } from 'next/navigation'
import { MdOutlineDelete } from "react-icons/md";
import { FaPencilRuler } from "react-icons/fa";

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [id, setId] = useState([]);
    const [name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[joinloading,setJoinLoading]=useState(false)
    const[loading,setLoading]=useState(false)
    const[deleteloading,setDeleteLoading]=useState(false)
    const[cursorLoading,setCursorLoading]=useState(false)
    const [canvasLoading, setCanvasLoading] = useState(false);
    const [roomName, setRoomName] = useState("");
    const[roomID,setRoomID]=useState("")
    const [roomId, setRoomId] = useState(null);
    const adminId=localStorage.getItem("adminId")
    const token =localStorage.getItem('token')
    const router = useRouter()
    const pathname = usePathname()
    

    const fetchRooms = async () => {
        try {
            const response = await axios.get(`${HTTP_BACKEND}/rooms/${adminId}`);
            //@ts-ignore
            setRooms(response.data.room);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    

    useEffect(() => {
        fetchRooms(); // Fetch rooms when page loads

        // Re-fetch rooms when user navigates back OR when page is focused
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                fetchRooms();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [pathname]);
    

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${HTTP_BACKEND}/user/${adminId}`);
           setName(response.data.user.name[0] )
           setEmail(response.data.user.email)
        };
        fetchData();
    }, [])

    const handleCreateRoom = async () => {
        if (!roomName.trim()) {
            toast.error("Room name is required!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                `${HTTP_BACKEND}/room`, 
                { name: roomName },
                { headers: { Authorization: token } } 
                
            );

            if (response.data.roodmid) {
                setRoomId(response.data.roodmid);
                toast.success("Room created successfully!");
                fetchRooms()
                
            } else {
                toast.error("Failed to create room!");
            }
        } catch (error:any) {
            console.error("Error:", error);
            toast.error(error.response?.data?.message || "Room already exists!");
        } finally {
            setLoading(false);
        }
    };

    const joinRoom=()=>{
      async function Join(){
        try {
          setJoinLoading(true)
          const input = roomID; 
          const matchResult = input.match(/\d+/);
          if (!matchResult) {
            throw new Error("Invalid room ID format");
          }
          const numberPart = matchResult[0];
          const alphabetMatch = input.match(/[A-Za-z]+/);
          const alphabetPart = alphabetMatch ? alphabetMatch[0] : "";
          localStorage.setItem("roomcode",alphabetPart)
          const seprateroomId = parseInt(numberPart, 10)
        const response = await axios.get(`${HTTP_BACKEND}/check-roomsid/${seprateroomId}`)
        
        if(response.status===200){
          router.push(`/canvas/${seprateroomId}`)
          
        }
        } catch (error) {
          toast.error("Room not found")
          setJoinLoading(false)
        }
      }

      Join()
    }
    const deleteRoom= async (roomId:number)=>{
      setDeleteLoading(true)
      document.body.classList.add("cursor-wait");
        await axios.delete(`${HTTP_BACKEND}/room/delete/${roomId}`)
        document.body.classList.remove("cursor-wait");
      setDeleteLoading(false);
        fetchRooms()
    }

    const logout = ()=>{
      setCursorLoading(true)
      document.body.classList.add("cursor-wait");
        localStorage.removeItem('token')
        router.push('/')
        document.body.classList.remove("cursor-wait");
        setCursorLoading(false)
    }
    
  return (
    <div>
      <div className="fixed top-0 p-5 w-screen h-[80px] flex justify-between items-center bg-slate-200 shadow-md rounded shadow-slate-500">
        <div className="text-3xl flex gap-1 items-center cursor-pointer font-serif text-[#DB611A] " onClick={()=>{router.push('/')}}>
                  <FaPencilRuler/>Online_Draw
                </div>
        <div className="flex gap-2">
          <Button onClick={logout} className={`border-2 py-2 px-3 font-semibold rounded-xl bg-[#FFBC85] border-[#FFBC85] hover:bg-[#f5ab79fa]  ${cursorLoading ? "cursor-wait" : ""}`} >
            Log Out
          </Button>
          <h1 className="bg-orange-500 rounded-full p-3 px-5 cursor-pointer capitalize ">{name}</h1>
        </div>
      </div>
      <div className="w-full justify-center flex mt-28">
        <h1 className="text-3xl font-serif">Welcome, To your thoughts!</h1>
      </div>
      <div className="w-full justify-center flex mt-10 gap-3" >
        <input value={roomName}
         onChange={(e)=>{
            setRoomName(e.target.value);
        }} className="pr-20 pl-2 rounded-lg border-2 border-black" type="text" placeholder="Room name"/>
        <Button onClick={handleCreateRoom}  className="border-2 py-2 px-3 font-semibold rounded-xl bg-[#FFBC85] border-[#FFBC85] hover:bg-[#f5ab79fa]">{loading ? "Creating..." : "Create Room"}</Button>
      </div>
      <div className="text-3xl font-bold w-full justify-center flex mt-5">Or</div>
      <div className="w-full justify-center flex mt-10 gap-3" >
        <input value={roomID}
         onChange={(e)=>{
            setRoomID(e.target.value);
        }} className="pr-20 pl-2 rounded-lg border-2 border-black" type="text" placeholder="Room Id"/>
        <Button onClick={joinRoom}  className="border-2 py-2 px-3 font-semibold rounded-xl bg-[#FFBC85] border-[#FFBC85] hover:bg-[#f5ab79fa]">{joinloading ? "Joining..." : "Join Room"}</Button>
      </div>
      <div  className="grid grid-cols-4 p-20 gap-10">

      {rooms.map((room,index) => (
          <Card key={index}
          onClick={()=>{
            setCanvasLoading(true);
            document.body.classList.add("cursor-wait");
            //@ts-ignore
            router.push(`/canvas/`+room.id)
            
            setTimeout(() => {
              document.body.classList.remove("cursor-wait");
              setCanvasLoading(false);
            }, 5000);
            
          }}
          deleteIcons={<MdOutlineDelete/>}
          //@ts-ignore
          deleteClick={() => deleteRoom(parseInt(room.id))}
          deleteClassName={`px-3 py-5 flex h-[20px] items-center gap-1 ${deleteloading ? "cursor-wait" : ""}`}
          DeleteName="Detele"
          //@ts-ignore
           title={room.slug} textClassName="font-bold text-gray-300  capitalize text-2xl" className={`card w-[230px] h-[200px] flex justify-center cursor-pointer items-center ${canvasLoading ? "cursor-wait" : ""}`}/>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
