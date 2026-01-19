import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import JoinMeeting from "./pages/JoinMeeting";
import Navbar from "./components/Navbar";
import Meeting from "./pages/Meeting";

function App(){
  return(
    <div className="min-h-screen bg-gray-900">
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinMeeting />}/>
        <Route path="/meeting/:roomId" element={<Meeting/>} />
      </Routes>
    </div>
    
  );
}
export default App;