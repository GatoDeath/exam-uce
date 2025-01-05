import { Link } from 'react-router-dom';

export default function PrincipalPage() {
  return (
    <div className="text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <div className="space-x-4">
        <Link to="/todo">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Go to ToDoList
          </button>
        </Link>
        <Link to="/fechapi">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Go to FechApi
          </button>
        </Link>
      </div>
    </div>
  );
}
