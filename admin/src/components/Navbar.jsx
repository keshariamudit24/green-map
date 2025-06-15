import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="bg-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/admin-logo.png" 
              alt="Green Map Admin" 
              className="h-8 w-auto mr-3"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-logo.svg";
              }}
            />
            <h1 className="text-xl font-bold text-white">Green Map Admin</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/events')}
              className="text-white hover:text-green-200"
            >
              Events
            </button>
            <button
              onClick={logout}
              className="bg-green-800 hover:bg-green-900 text-white text-sm px-3 py-1 rounded flex items-center"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
