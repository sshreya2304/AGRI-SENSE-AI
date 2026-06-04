import { useState } from "react";

export default function ChatBot() {

 const [message,setMessage] = useState("");

 return (

  <div className="p-8">

   <h1 className="text-3xl">
    Farmer AI Assistant
   </h1>

   <textarea
    className="border w-full mt-5 p-3"
    rows="4"
    onChange={(e)=>setMessage(e.target.value)}
   />

   <button
    className="bg-green-700 text-white px-5 py-2 mt-4"
   >
    Send
   </button>

  </div>

 );

}