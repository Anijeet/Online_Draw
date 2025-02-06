"use client"

import { HTTP_BACKEND } from "@/config";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter, usePathname } from 'next/navigation'
import { MdOutlineDelete } from "react-icons/md";

const Dashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [id, setId] = useState([]);
    const [name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[isHover,setIsHover]=useState(false)
    const[loading,setLoading]=useState(false)
    const [roomName, setRoomName] = useState("");
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
                // router.push(`/canvas/`+ roomId)
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

    const deleteRoom= async (roomId:number)=>{
        await axios.delete(`${HTTP_BACKEND}/room/delete/${roomId}`)
        fetchRooms()
    }

    const logout = ()=>{
        localStorage.removeItem('token')
        router.push('/')
    }
  return (
    <div>
      <div className="fixed top-0 p-5 w-screen h-[80px] flex justify-between items-center bg-slate-200 shadow-md rounded shadow-slate-500">
        <div>
          <img
            className="cursor-pointer"
            src="https://plus.excalidraw.com/images/logo.svg"
            alt=""
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={logout} className="border-2 py-2 px-3 font-semibold rounded-xl bg-[#FFBC85] border-[#FFBC85] hover:bg-[#f5ab79fa] ">
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
      <div className="grid grid-cols-4 p-20 gap-10">

      {rooms.map((room) => (
          <Card 
          onClick={()=>{
            //@ts-ignore
            router.push(`/canvas/`+room.id)
            
          }}
          deleteIcons={<MdOutlineDelete/>}
          //@ts-ignore
          deleteClick={() => deleteRoom(parseInt(room.id))}
          //@ts-ignore
           title={room.slug} textClassName="font-bold text-gray-300  capitalize text-2xl" className="card w-[230px] h-[200px] flex justify-center cursor-pointer items-center "/>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
