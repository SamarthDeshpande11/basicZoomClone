import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            
            <div className="text-white font-bold text-xl">Zoom AI Clone</div>
            
            <div className="flex space-x-4">
                
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                <Link to="/join" className="text-gray-300 hover:text-white">Join Meeting</Link>
            </div>
        </nav>
    );
}