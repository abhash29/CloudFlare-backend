import { useNavigate } from 'react-router-dom';
function Header(){
    const navigate = useNavigate();
    return (
        <>
        <div className="">
            <button onClick={() => navigate('/login')} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-md">Login</button>
        </div>
            <div className="text-4xl font-bold text-center mb-2">Todo App</div>
            <div className="h-px bg-black my-3"></div>
        </>
    )
}
export default Header;