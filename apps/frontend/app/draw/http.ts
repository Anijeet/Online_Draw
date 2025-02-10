import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
}

export async function deleteShapeFromDB( shape: any) {
    console.log("shape",shape.id)
    try {
        const response = await fetch(`${HTTP_BACKEND}/chats/delete-shape`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: { shape } }), // Send ID inside shape.message
        });

        console.log("response",response)

        if (response.status !== 200) {
            throw new Error("Failed to delete shape");
        }

        console.log(`Shape ${shape.id} deleted successfully`);
    } catch (error) {
        console.error("Error deleting shape:", error);
    }
}


export async function chatId(roomId:string){
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    const deleteShape = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.id;
    })

    return deleteShape;
}
