import { useState, useEffect } from "react";
import axios from "axios";
import Details from './Details';
import { useNavigate } from "react-router-dom";

function List(){
    const [todos, setTodos] = useState([]);
    const [componentId, setComponentId] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [done, setDone] = useState(false);
    const [displayWork, setDisplayWork] = useState("");
    const [displayTime, setDisplayTime] = useState("");
    const [work, setWork] = useState("");
    const [time, setTime] = useState("");

    const navigate = useNavigate();

    // Fetch all todos (runs on refresh)
    useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get('http://localhost:3000/todos');
      setTodos(res.data);
    };
    fetchTodos();
  }, [refresh]);

    // Update todo
    function handleUpdate(componentId){
      navigate("/updatePage", {componentId: componentId})
    }

    // Delete todo
      async function handleDelete(id) {
        try {
          await axios.delete(`http://localhost:3000/todos/${id}`);
          setRefresh(prev => !prev);
        } catch (error) {
          console.log(error);
        }
      }
    
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
        <div className="border p-3 rounded-md text-center text-lg font-medium">
        <div>List</div>

        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center justify-between gap-4 border border-gray-300 p-3 rounded-lg mb-2 shadow-sm hover:bg-gray-100 transition-colors"
            onClick={() => setComponentId(todo._id)}
          >
            <div className="font-medium text-gray-800">{todo.work} at:</div>
            <div className="text-sm text-gray-600">{todo.time}</div>

            <button
              className="text-green-500 hover:text-white hover:bg-green-500 px-2 py-1 rounded"
              onClick={handleUpdate(todo._id)}
            >
              Update
            </button>

            <button
              className="text-red-500 hover:text-white hover:bg-red-500 px-2 py-1 rounded"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo._id);
              }}
            >
              Delete
            </button>

            <label>
              <input
                type="checkbox"
                className="mr-2"
                checked={done}
                onChange={() => setDone(prev => !prev)}
              />
              Mark as done
            </label>
          </div>
        ))}

         {componentId && (
        <Details work={displayWork} time={displayTime} />
      )}
      </div>
    )
}
export default List;