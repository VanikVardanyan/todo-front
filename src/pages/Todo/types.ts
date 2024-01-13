export interface ITodos {
    completed: boolean
    createdAt: string
    description: string
    _id: string
}

export interface ITaskItemProps {
    task: ITodos;
    handleCompleteTask: (taskId: string) => void;
}