import React, { useState } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import CurrentTask from './CurrentTask'

import '../../styles/tasklist.scss'

interface Task {
    id: number
    title: string
    isCompleted: boolean
}

export default function TaskList () {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState('')

    function createTask() {
        if(newTaskTitle === '') return;

        setTasks([
            ...tasks,
            {
                id: Math.random(),
                title: newTaskTitle,
                isCompleted: false,
            },
        ])

        setNewTaskTitle('');
    }
    
    function toggleTask(id: number) {
        const handledToggledTasks: Task[] = tasks.map((task) => {
            if(task.id === id) task.isCompleted = !task.isCompleted;
      
            return task;
          }) 
        
        setTasks(handledToggledTasks);
    }
    
    function removeTask(id: number) {
        const handledRemovedTasks: Task[] = tasks.filter(
            ({ id: taskId }) => taskId !== id
        )

        setTasks(handledRemovedTasks);
    }

    return (
        <section className="task-list container">
            <header>
                <h2>Tasks</h2>

                <div className="input-group">
                    <input 
                        type="text"
                        placeholder="Finish homework..."
                        data-testid="new-task-input"
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        value={newTaskTitle}
                    />
                    <button type="button" data-testid="add-task-button" onClick={() => createTask()}>
                        <FiCheckSquare size={16} color="#fff" />
                    </button>
                </div>
            </header>

            <main>
                <ul>
                    {tasks.map(task => (
                        <CurrentTask 
                            key={task.id} 
                            task={task}
                            handleToglleTask={(id: number) => toggleTask(id)} 
                            handleRemoveTask={(id: number) => removeTask(id)} 
                        />
                    ))}
                </ul>
            </main>
        </section>
    )
}