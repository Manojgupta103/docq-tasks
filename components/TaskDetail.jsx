import React, { useState, useEffect } from 'react'
import { Check, RefreshCw, Pencil, Trash, Clock, Tag } from 'lucide-react'

export default function TaskDetail({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  useEffect(() => {
    setEditedTask(task)
    setIsEditing(false)
  }, [task])

  if (!task) return <div className="w-1/2 p-6 bg-white">No task selected</div>

  const handleEdit = () => {
    if (isEditing) {
      onUpdate(editedTask)
      setIsEditing(false)
    } else {
      setIsEditing(true)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedTask({ ...editedTask, [name]: value })
  }

  const handleTagToggle = (tag) => {
    setEditedTask(prevTask => ({
      ...prevTask,
      tags: prevTask.tags.includes(tag)
        ? prevTask.tags.filter(t => t !== tag)
        : [...prevTask.tags, tag]
    }))
  }

  const handleMarkCompleted = () => {
    onUpdate({ ...task, completed: !task.completed })
  }

  return (
    <div className="w-1/2 p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="font-semibold mr-2">Task #{task.id}</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleMarkCompleted} className={`p-2 rounded-full transition-colors ${task.completed ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
            <Check className="w-5 h-5" />
          </button>
          <button onClick={() => setEditedTask(task)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
          <button onClick={handleEdit} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Pencil className="w-5 h-5" />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <Trash className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="details"
            value={editedTask.details}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
          <input
            type="date"
            name="date"
            value={editedTask.date.split('/').reverse().join('-')}
            onChange={(e) => handleInputChange({
              target: {
                name: 'date',
                value: new Date(e.target.value).toLocaleDateString('en-GB')
              }
            })}
            className="w-full p-2 border rounded"
          />
          <div>
            <label className="block mb-1 font-medium">Tags</label>
            <div className="flex space-x-2">
              {['Important', 'Urgent', 'Later'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded ${
                    editedTask.tags.includes(tag) ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
          <p className="mb-4">{task.details}</p>
        </>
      )}
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 mr-2 text-gray-500" />
        <span>{task.date}</span>
      </div>
      <div className="flex items-center mb-4">
        {task.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm mr-2">
            <Tag className="w-4 h-4 inline mr-1" />
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-500">
        {task.createdBy} created a task. {task.createdDate}
      </div>
    </div>
  )
}