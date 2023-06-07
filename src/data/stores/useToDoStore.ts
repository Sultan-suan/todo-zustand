import create from 'zustand'
import {generateId} from "./helper";
import { persist } from "zustand/middleware";


interface Task {
    id: string;
    title: string;
    createdAt: number;
}

export interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void
    removeTask: (id: string) => void;
}

function isTodoStore(object: any): object is ToDoStore {
    return 'task' in object
}




export const useToDoStore = create()(persist((set) => ({
    tasks: [],
    createTask: (title) => {
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        };
        set((state)=> ({
            tasks: [newTask, ...state.tasks],
        }))
    },
    updateTask: (id: string, title: string) => {

        set((state) => ({
            tasks: state.tasks.map((task) => ({
                ...task,
                title: task.id === id ? title: task.title,
            }))
        }))
    },
    removeTask: (id: string) => {

        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id)
        }))
    },
}),{name: ''})) ;