import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskList } from '../../components/TaskList'

describe('<TaskList />', () => {
    it('should be able to add a task', async () => {
        render(<TaskList />)

        const taskInput = screen.getByTestId('add-new-task')
        const addTaskButton = screen.getByTestId('add-task-button')
        const mockedTaskTitle = 'First task title'

        fireEvent.change(taskInput, { 
            target: {
                value: mockedTaskTitle
            }
        })

        fireEvent.click(addTaskButton)

        const addedFirstTaskTitle = screen.getByText(mockedTaskTitle)

        expect(addedFirstTaskTitle).toBeInTheDocument();
        expect(addedFirstTaskTitle).toHaveTextContent(mockedTaskTitle)
        expect(addedFirstTaskTitle.parentElement).not.toHaveClass('completed')
    })

    it('should not be able to add a task with a empty title', async () => {
        render(<TaskList />)

        const addTaskButton = screen.getByTestId('add-task-button')

        fireEvent.click(addTaskButton)

        expect(screen.queryByTestId('task')).not.toBeInTheDocument()
    })

    it('should be able to remove a task', async () => {
        render(<TaskList />)

        const taskInput = screen.getByTestId('add-new-task')
        const addTaskButton = screen.getByTestId('add-task-button')
        const mockedTaskTitle = 'Removable task title'

        fireEvent.change(taskInput, {
            target: {
                value: mockedTaskTitle
            }
        })
        fireEvent.click(addTaskButton)

        const addedRemovableTaskTitle = screen.getByText(mockedTaskTitle)
        expect(addedRemovableTaskTitle).toBeInTheDocument()

        const removeTaskButton = screen.getByTestId('remove-task-button')
        fireEvent.click(removeTaskButton)
        expect(addedRemovableTaskTitle).not.toBeInTheDocument()
    })

    it('should be able to check a task', async () => {
        render(<TaskList />)

        const taskInput = screen.getByTestId('add-new-task')
        const addTaskButton = screen.getByTestId('add-task-button')
        const mockedTaskTitle = 'Checkable task title'

        fireEvent.change(taskInput, {
            target: {
                value: mockedTaskTitle
            }
        })
        fireEvent.click(addTaskButton)

        const addedCheckableTask = screen.getByTestId('task')
        
        if(addedCheckableTask.firstChild) 
            fireEvent.click(addedCheckableTask.firstChild)

        expect(addedCheckableTask).toBeInTheDocument()
        expect(addedCheckableTask).toHaveClass('completed')
    })
})