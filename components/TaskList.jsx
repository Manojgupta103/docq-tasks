import React from 'react'
import { Plus, Filter, HelpCircle, ChevronDown, Star } from 'lucide-react'

export default function TaskList({ tasks, onSelectTask, onAddTask, onFilter, onHelp }) {
  return (
    <div className="w-1/2 p-6 bg-white border-r">
      <div className="text-sm text-gray-500 mb-4">Tasks &gt; Task</div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="font-semibold mr-2">To be completed</span>
          <ChevronDown className="w-4 h-4" />
          <span className="ml-2 text-gray-500">{tasks.length}</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={onAddTask} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <button onClick={onFilter} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button onClick={onHelp} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => onSelectTask(task)}>
            <div className="flex items-center mb-2">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="font-semibold">{task.completed ? 'Completed' : 'New'}</span>
            </div>
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}