import { useState } from "react";
import axios from "axios";

function InputBox(){
    const [work, setWork] = useState("");
    const [time, setTime] = useState("");
    const [refresh, setRefresh] = useState(false);

    function handleChange(e) {
    setWork(e.target.value);
    }
    function handleChange2(e) {
    setTime(e.target.value);
    }

    // Submit todo
  async function handleSubmit() {
    try {
      await axios.post("http://localhost:3000/todos", {
        work,
        time,
      });
      setWork("");
      setTime("");
      setRefresh(prev => !prev);
    } catch (error) {
      console.log(error);
        }
    }

    return (
        <>
        <div className="flex items-center gap-3 border p-3 rounded-md">
        <input
          type="text"
          placeholder="Work"
          className="border px-2 py-1 rounded-md w-full"
          value={work}
          onChange={handleChange}
        />

        <input
          type="time"
          className="border px-2 py-1 rounded-md"
          value={time}
          onChange={handleChange2}
        />

        <button
          className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="h-px bg-black my-3"></div>
        </>
    )
}
export default InputBox;