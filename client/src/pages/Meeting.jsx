import React,{useEffect,useRef} from "react";
import {useParams,useNavigate} from "react-router-dom";
import {io} from "socket.io-client";

export default function Meeting(){
    const { roomId }=useParams();
    const localVideoRef=useRef(null);
    const navigate=useNavigate();

    const [socket,setSocket]=useState(null);

    useEffect(()=>{
        const newSocket=io("http://localhost:5000");
        setSocket(newSocket);

        const userId=Math.floor(Math.random()*10000);
        newSocket.emit("join-room",{roomId,userId});

        newSocket.on("user-connected",({userId})=>{
            console.log(`User connected: ${userId}`);
        });

        newSocket.on("user disconnected",({userId})=>{
            console.log(`user disconnected: ${userId}`);
        });

        return ()=>{
            newSocket.disconnect();
        };
    },[roomId]);
    
    const leaveMeeting=()=>{
        if(localVideoRef.current && localVideoRef.current.srcObject){
            const tracks=localVideoRef.current.srcObject.getTracks();
            tracks.forEach((track)=>track.stop());
        }
        navigate("/join");
    };
    useEffect(()=>{
        navigator.mediaDevices
            .getUserMedia({video:true,audio:true})
            .then((stream)=>{
                if(localVideoRef.current){
                    localVideoRef.current.srcObject=stream;
                }
            })
            .catch((err)=>{
                console.error("Error accessing caera/mic",err);
                alert("could ot access camera/mmicrophone");
            });
    },[]);
    return(
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-2xl font-bold mb-4">Meeting Room:{roomId}</h1>
            <div className="mb-4">
                <video ref={localVideoRef} autoPlay muted  className="w-80 h-60 bg-black rounded"></video>
            </div>
            <button onClick={leaveMeeting} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Leave Meeting</button>
            <div className="mt-6 w-full grid grid-cols-2 gap-4">
                <div className="w-full h-40 bg-gray-800 rounded flex items-center justify-center text-gray-400">Remote Participant 1</div>
                <div className="w-full h-40 bg-gray-800 rounded flex items-center justify-center text-gray-400">Remote Participant 2</div>
            </div>
        </div>
    );
}