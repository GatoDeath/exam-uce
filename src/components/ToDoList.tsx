import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Check } from "lucide-react";

export default function ToDoList() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<
    Array<{ id: number; text: string; completed: boolean }>
  >([]);
  const [task, setTask] = useState("");

  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: task.trim(),
          completed: false,
        },
      ]);
      setTask("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with nav*/}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">To Do List</h1>
            <button
              onClick={() => navigate("/main")}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al Dashboard
            </button>
          </div>
        </div>
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter a task"
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addTask}
                  disabled={!task.trim()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className={`p-1 rounded-full border ${
                          task.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "border-gray-300 text-transparent"
                        }`}
                      >
                        <Check size={16} />
                      </button>
                      <span
                        className={`${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                      aria-label="Delete task"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>

              {tasks.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  No tasks yet. Add some tasks to get started!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
