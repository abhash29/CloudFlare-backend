import { useState, useEffect } from "react";
import Details from "./Details";
import InputBox from "./InputBox";


function UpdatePage({componentId}) {
    const [work, setWork] = useState("");
    const [time, setTime] = useState("");

    // Fetch single todo
    useEffect(() => {
    if (!componentId) return;

    const fetchOneTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/todos/${componentId}`);
        setDisplayWork(res.data.work);
        setDisplayTime(res.data.time);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOneTodo();
  }, [componentId]);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Update Page
        </h1>

        <div className="border border-gray-200 rounded-lg p-4">
          <InputBox />
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <Details work={work} time={time} />
        </div>

      </div>
    </div>
  );
}

export default UpdatePage;
