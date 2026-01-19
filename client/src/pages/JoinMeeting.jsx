import React,{useState} from "react";
import { useNavigate } from "react-router-dom";


export default function JoinMeeting(){
    const [roomId,setRoomId]=useState("");
    const navigate=useNavigate();
    const handleJoin=()=>{
        if(!roomId){
            alert("please enter a room Id or generate one!");
            return;
        }
        navigate(`/meeting/${roomId}`);
    }
    const handleGenerate=()=>{
        const newRoom=Math.random().toString(36).substring(2,8);
        setRoomId(newRoom)
    }
    return(
        <div className="flex flex-col items-center justify-center h-screen text-white bg-gray-900">
            <h1 className="text-3xl font-bold mb-4">Join a meeting</h1>
            <input type="text" placeholder="Enter Room ID" value={roomId} 
            onChange={(e)=>setRoomId(e.target.value)} className="p-2 mb-4 rounded text-black w-64"
            />
            <div className="flex space-x-4">
                <button onClick={handleJoin} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Join</button>
                <button onClick={handleGenerate} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">Generate Room</button>
            </div>
        </div>
    );
}