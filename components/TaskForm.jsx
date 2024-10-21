import React, { useState } from 'react'
import { X } from 'lucide-react'

const TAGS = ['Important', 'Urgent', 'Later']

export default function TaskForm({ onSave, onCancel }) {
  const [task, setTask] = useState({
    title: '',
    details: '',
    date: new Date().toISOString().split('T')[0],
    tags: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTask(prevTask => ({ ...prevTask, [name]: value }))
  }

  const handleTagToggle = (tag) => {
    setTask(prevTask => ({
      ...prevTask,
      tags: prevTask.tags.includes(tag)
        ? prevTask.tags.filter(t => t !== tag)
        : [...prevTask.tags, tag]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...task,
      date: new Date(task.date).toLocaleDateString('en-GB')
    })
  }

  return (
    <div className="w-1/2 p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Add New Task</h2>
        <button onClick={onCancel} className="p-2 rounded-full hover:bg-gray-100">
          <X className="w-6 h-6" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="details" className="block mb-1 font-medium">Details</label>
          <textarea
            id="details"
            name="details"
            value={task.details}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label htmlFor="date" className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={task.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <div className="flex space-x-2">
            {TAGS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded ${
                  task.tags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save Task
        </button>
      </form>
    </div>
  )
}