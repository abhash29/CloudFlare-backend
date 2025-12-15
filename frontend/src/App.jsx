
import './App.css'

function App() {
  
  return (
    <div className="h-auto w-auto border-4 border-black bg-white p-4 rounded-lg shadow-md">
  <div className="text-4xl font-bold text-center mb-2">
    Todo App
  </div>

  <div className="h-px bg-black my-3"></div>

  <div className="flex items-center gap-3 border p-3 rounded-md">
    <input
      type="text"
      placeholder="Work"
      className="border px-2 py-1 rounded-md w-full"
    />

    <input
      type="time"
      className="border px-2 py-1 rounded-md"
    />

    <button className="bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800">
      Submit
    </button>
  </div>

  <div className="h-px bg-black my-3"></div>

  <div className="border p-3 rounded-md text-center text-lg font-medium">
    <div>List</div>
   <div className="flex items-center gap-2">
    <input type="checkbox" />
    <label>Mark as done</label>
</div>
  </div>
</div>

  )
}

export default App
