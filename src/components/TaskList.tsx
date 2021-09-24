import React, { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
    id: number
    title: string
    isCompleted: boolean
}

export function TaskList () {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTaskTitle, setNewTaskTitle] = useState('')

    function handleCreateTask() {
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
    
    function handleToglleTask(id: number) {
        const handledToggledTasks: Task[] = tasks.map((task) => {
            if(task.id === id) task.isCompleted = !task.isCompleted;
      
            return task;
          }) 
        
        setTasks(handledToggledTasks);
    }
    
    function handleRemoveTask(id: number) {
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
                        placeholder="Add new task"
                        data-testid="add-new-task"
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        value={newTaskTitle}
                    />
                    <button type="button" data-testid="add-task-button" onClick={() => handleCreateTask()}>
                        <FiCheckSquare size={16} color="#fff" />
                    </button>
                </div>
            </header>

            <main>
                <ul>
                    {tasks.map(({id, title, isCompleted}) => (
                        <li key={id}>
                            <div className={isCompleted ? 'completed' : ''} data-testid="task">
                                <label className="checkbox-container">
                                    <input 
                                        type="checkbox"
                                        readOnly
                                        checked={isCompleted}
                                        onClick={() => handleToglleTask(id)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <p>{title}</p>
                            </div>

                            <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(id)}>
                                <FiTrash size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
        </section>
    )
}