import React from 'react'
import { FiTrash } from 'react-icons/fi'

interface TaskProps {
    task: {
        id: number
        title: string
        isCompleted: boolean
    },
    handleToglleTask: (id: number) => void,
    handleRemoveTask: (id: number) => void
}

export default function CurrentTask ({task, handleToglleTask, handleRemoveTask}: TaskProps){
    return (
        <li>
            <div className={task.isCompleted ? 'completed' : ''} data-testid="task">
                <label className="checkbox-container">
                    <input 
                        type="checkbox"
                        readOnly
                        checked={task.isCompleted}
                        onClick={() => handleToglleTask(task.id)}
                    />
                    <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
            </div>

            <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
            </button>
        </li>
    )
}