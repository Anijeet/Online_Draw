import express from "express"
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from "@repo/common/text";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt"
import cors from "cors"
4
const app=express()
app.use(express.json())
app.use(cors())

app.post('/signup',async (req,res)=>{

    const parsedData=CreateUserSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(501).json({
            message:"Incorrect inputs"
        })
        return;
    }

    try {

        const hashedpassword = await bcrypt.hash(parsedData.data.password,10)
        const user = await prismaClient.user.create({
            data:{
                email:parsedData.data?.username,
                password:hashedpassword,
                name:parsedData.data.name
            }
        })

        res.json({
            userid:user.id
        })
    } catch (e) {
        res.status(411).json({
            message:"Email already exist"
        })
    }

})

//@ts-ignore
app.post('/signin', async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    
    if (!parsedData.success) {
        return res.status(400).json({ message: "Incorrect inputs" });
    }

    try {
        const user = await prismaClient.user.findFirst({
            where: { email: parsedData.data.username }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" }); 
        }

        const passwordMatch = await bcrypt.compare(parsedData.data.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" }); 
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return res.json({ token, userid: user.id });

    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
});

app.get('/check-roomsid/:roomId',async(req,res)=>{
    //@ts-ignore
    const roomId=parseInt(req.params.roomId)
    const response = await prismaClient.room.findFirst({where:{id:roomId}})
    if(response){
        res.status(200).json({
            response,
            msg:"Id exist"
        })
    }else{
        res.status(404).json({
            msg:"Id doesn't exist"
        })
    }
})





app.post('/room',middleware,async (req,res)=>{
    const parsedData=CreateRoomSchema.safeParse(req.body)
    
    if(!parsedData.success){
        res.json({
            message:"Incorrect inputs"
        })
        return;
    }

    const userId=req.userId

    try{
   const room = await prismaClient.room.create({
        //@ts-ignore
        data:{
            slug: parsedData.data.name,
            adminId: userId
        }
    })
    res.json({
        roodmid:room.id
    })
}catch(e){
    res.status(411).json({
        message:"Room already exists"
    })
}
})

app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
    }
    
})

app.get('/room/:slug', async (req,res)=>{
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where:{
            slug
        }
    });

    res.json({
        room
    })
})

app.get('/rooms/:id', async (req,res)=>{
    const adminId = req.params.id;
    const room = await prismaClient.room.findMany({
        where:{
            adminId
        }
    });

    res.json({
        room
    })
})

app.get('/user/:id', async (req,res)=>{
    const id = req.params.id;
    const user = await prismaClient.user.findUnique({
        where:{
            id
        }
    });

    res.json({
        user
    })
})

//@ts-ignore
app.post("/chats/delete-shape", async (req, res) => {
    
    try {
        const {message} = req.body ;
        const shapeId=message.shape.id
        console.log(shapeId)
        //@ts-ignore
        const existingShape = await prismaClient.chat.findFirst({
            where: {
                message: {
                    contains: `"id":${shapeId}`, // Finds JSON objects containing this ID
                },
            },
        });
        console.log(existingShape)
        if (!existingShape) {
            return res.status(401).json({ message: "Shape not found" });
        }
        console.log(existingShape)
        // Delete the chat entry containing the shape
        const deletedShape = await prismaClient.chat.delete({
            where: { id: existingShape.id }, // Delete using the main ID
        });
        res.status(200).json({ message: "Shape deleted successfully" });
    } catch (error) {
        console.error("Error deleting shape:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.delete('/room/delete/:id',async (req,res)=>{
    const id = parseInt(req.params.id);
    await prismaClient.chat.deleteMany({where:{roomId:id}})
     await prismaClient.room.delete({where:{id}})
    res.json({
        msg:`Deleted room of id ${id}`
    })
})

app.delete('/delete-shape/:id',async(req,res)=>{
    const id = parseInt(req.params.id);
    await prismaClient.chat.deleteMany({where:{roomId:id}})
    res.json({msg:`Chats deleted`})
})

app.listen(3001)