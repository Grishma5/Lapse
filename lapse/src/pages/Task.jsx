import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  Calendar, 
  User, 
  ChevronDown, 
  X, 
  Save,
  GripVertical,
  CheckCircle,
  Circle,
  AlertCircle
} from 'lucide-react';
import { createTaskApi, updateTaskApi, deleteTaskApi, getTasksApi } from '../Api/Api';

const TaskManager = ({ isDarkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  });
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  const columns = [
    { id: 'To-Do', title: 'To Do', color: isDarkMode ? 'from-gray-700 to-gray-600' : 'from-pink-400 to-rose-400' },
    { id: 'In-Progress', title: 'In Progress', color: isDarkMode ? 'from-gray-600 to-gray-500' : 'from-purple-400 to-violet-400' },
    { id: 'Done', title: 'Done', color: isDarkMode ? 'from-gray-500 to-gray-400' : 'from-indigo-400 to-blue-400' }
  ];

  const priorityColors = {
    Low: isDarkMode ? 'bg-gray-700 text-gray-200 border-gray-600' : 'bg-pink-100 text-pink-800 border-pink-200',
    Medium: isDarkMode ? 'bg-gray-600 text-gray-200 border-gray-500' : 'bg-purple-100 text-purple-800 border-purple-200',
    High: isDarkMode ? 'bg-gray-500 text-gray-200 border-gray-400' : 'bg-rose-100 text-rose-800 border-rose-200'
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    if (!localStorage.getItem('token')) {
      toast.error('Please log in');
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await getTasksApi();
      if (response?.data?.success) {
        setTasks(response.data.tasks);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch tasks');
      }
    } catch (error) {
      toast.error('Error fetching tasks');
      console.error('Fetch tasks error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: ''
    });
    setEditingTask(null);
  };

  const openModal = (task = null) => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.due_date ? task.due_date.split('T')[0] : ''
      });
      setEditingTask(task);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) return;

    try {
      if (editingTask) {
        const response = await updateTaskApi(editingTask.id, formData);
        if (response?.data?.success) {
          setTasks(tasks.map(task => task.id === editingTask.id ? response.data.task : task));
          toast.success('Task updated');
        }
      } else {
        const response = await createTaskApi(formData);
        if (response?.data?.success) {
          setTasks([...tasks, response.data.task]);
          toast.success('Task created');
        }
      }
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving task');
      console.error('Save task error:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await deleteTaskApi(taskId);
      if (response?.data?.success) {
        setTasks(tasks.filter(task => task.id !== taskId));
        toast.success('Task deleted');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting task');
      console.error('Delete task error:', error);
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      try {
        const updatedTask = { ...draggedTask, status: newStatus };
        const response = await updateTaskApi(draggedTask.id, updatedTask);
        if (response?.data?.success) {
          setTasks(tasks.map(task =>
            task.id === draggedTask.id ? response.data.task : task
          ));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error updating task status');
        console.error('Update status error:', error);
      }
      setDraggedTask(null);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 text-[#4B0082]'} p-6 mt-14`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-1 font-cute`}>{greeting}</h2>
              <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} mb-2 font-cute`}>
                Task <span className={isDarkMode ? 'bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent' : 'bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'}>Board</span>
              </h1>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-cute>Organize and track your tasks with ease</p>
            </div>
            <button
              onClick={() => openModal()}
              className={`inline-flex items-center px-6 py-3 ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'} rounded-full hover:${isDarkMode ? 'bg-gray-600' : 'from-pink-500 to-purple-500'} transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-cute`}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <div
              key={column.id}
              className={`bg-${isDarkMode ? 'gray-800/80' : 'white/80'} backdrop-blur-sm rounded-2xl shadow-sm ${isDarkMode ? 'border-gray-700/50' : 'border border-pink-100'} overflow-hidden`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className={`bg-${column.color} p-4`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold text-lg font-cute">{column.title}</h3>
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm font-medium font-cute">
                    {getTasksByStatus(column.id).length}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-4 min-h-[500px]">
                {getTasksByStatus(column.id).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className={`bg-${isDarkMode ? 'gray-800/80' : 'gradient-to-br from-pink-50 to-purple-50'} rounded-xl p-4 cursor-move hover:shadow-lg transition-all duration-200 ${isDarkMode ? 'border-gray-700/50' : 'border border-pink-100'} hover:${isDarkMode ? 'border-gray-600' : 'border-purple-200'} group`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <GripVertical className="w-4 h-4 text-gray-400 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className={`font-semibold text-${isDarkMode ? 'gray-300' : 'gray-800'} text-sm leading-tight font-cute`}>{task.title}</h4>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openModal(task)}
                          className={`p-1 text-${isDarkMode ? 'gray-400' : 'gray-400'} hover:${isDarkMode ? 'text-gray-300' : 'text-purple-400'} transition-colors`}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className={`p-1 text-${isDarkMode ? 'gray-400' : 'gray-400'} hover:${isDarkMode ? 'text-gray-300' : 'text-rose-400'} transition-colors`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {task.description && (
                      <p className={`text-${isDarkMode ? 'gray-400' : 'gray-600'} text-sm mb-3 line-clamp-2 font-cute`}>{task.description}</p>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                        {task.status === 'Done' && (
                          <CheckCircle className="w-4 h-4 text-indigo-400" />
                        )}
                      </div>

                      {task.due_date && (
                        <div className={`flex items-center text-xs text-${isDarkMode ? 'gray-500' : 'gray-500'} ${isOverdue(task.due_date) ? 'text-rose-400' : ''}`}>
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(task.due_date)}
                          {isOverdue(task.due_date) && <AlertCircle className="w-3 h-3 ml-1" />}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {getTasksByStatus(column.id).length === 0 && (
                  <div className="text-center py-12">
                    <Circle className={`w-12 h-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-200'} mx-auto mb-3`} />
                    <p className={`text-${isDarkMode ? 'gray-500' : 'gray-400'} text-sm font-cute`}>No tasks yet</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`bg-${isDarkMode ? 'gray-800/80' : 'white/80'} backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md ${isDarkMode ? 'border-gray-700/50' : 'border border-pink-100'}`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'} font-cute`}>
                    {editingTask ? 'Edit Task' : 'Create New Task'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className={`p-2 text-${isDarkMode ? 'gray-400' : 'gray-400'} hover:${isDarkMode ? 'text-gray-300' : 'text-purple-400'} transition-colors`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-2 font-cute`}>
                      Task Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-200' : 'border-pink-200'} rounded-xl focus:ring-2 focus:ring-${isDarkMode ? 'gray-600' : 'purple-400'} focus:border-transparent transition-all font-cute`}
                      placeholder="Enter task title..."
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-2 font-cute`}>
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-200' : 'border-pink-200'} rounded-xl focus:ring-2 focus:ring-${isDarkMode ? 'gray-600' : 'purple-400'} focus:border-transparent transition-all resize-none font-cute`}
                      rows="3"
                      placeholder="Enter task description..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-2 font-cute`}>
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-200' : 'border-pink-200'} rounded-xl focus:ring-2 focus:ring-${isDarkMode ? 'gray-600' : 'purple-400'} focus:border-transparent transition-all font-cute`}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-2 font-cute`}>
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                        className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-200' : 'border-pink-200'} rounded-xl focus:ring-2 focus:ring-${isDarkMode ? 'gray-600' : 'purple-400'} focus:border-transparent transition-all font-cute`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4">
                    <button
                      onClick={closeModal}
                      className={`px-6 py-2 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-purple-400'} transition-colors font-cute`}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className={`inline-flex items-center px-6 py-2 ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white'} rounded-full hover:${isDarkMode ? 'bg-gray-600' : 'from-pink-500 to-purple-500'} transition-all duration-300 shadow-lg font-cute`}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingTask ? 'Update' : 'Create'} Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;