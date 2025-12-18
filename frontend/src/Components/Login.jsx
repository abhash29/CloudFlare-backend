function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-gray-300 p-6 rounded-xl shadow-md bg-white w-80">
        <div className="text-2xl font-bold text-center mb-4">
          Login
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="email"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="password"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
