import { NextResponse } from 'next/server'

let tasks = [
  {
    id: 1,
    title: 'Set up afternoon meeting',
    details: 'Set up a virtual meeting for all consultants by afternoon. Link must be communicated to everyone before 1pm.',
    date: '24 Oct 2022',
    tags: ['Urgent'],
    createdBy: 'John Doe',
    createdDate: '25 Oct'
  }
]

export async function GET() {
  return NextResponse.json(tasks)
}

export async function POST(request) {
  const newTask = await request.json()
  newTask.id = tasks.length + 1
  tasks.push(newTask)
  return NextResponse.json(newTask, { status: 201 })
}

export async function PUT(request) {
  const updatedTask = await request.json()
  const index = tasks.findIndex(task => task.id === updatedTask.id)
  if (index !== -1) {
    tasks[index] = updatedTask
    return NextResponse.json(updatedTask)
  }
  return NextResponse.json({ error: 'Task not found' }, { status: 404 })
}

export async function DELETE(request) {
  const { id } = await request.json()
  const index = tasks.findIndex(task => task.id === id)
  if (index !== -1) {
    tasks.splice(index, 1)
    return NextResponse.json({ message: 'Task deleted successfully' })
  }
  return NextResponse.json({ error: 'Task not found' }, { status: 404 })
}