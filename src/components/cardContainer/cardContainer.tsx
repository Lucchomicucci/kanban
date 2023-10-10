import React, { useState } from "react"
import { IList, Move, State } from "../../interfaces/interfaces"
import styles from './styles.module.css'
import CardColumn from "../cardColumn/cardColumn"
import ModalAdd from "../modalAdd/modalAdd"

const CardContainer: React.FC = () => {
    const [toDoList, setToDoList] = useState<IList[]>([])
    const [doingList, setDoingList] = useState<IList[]>([])
    const [doneList, setDoneList] = useState<IList[]>([])


    const handleCreate = (task: IList, state: State) => {
        if (state == 'todo') {
            setToDoList([...toDoList, task])
        } else if (state == 'doing') {
            setDoingList([...doingList, task])
        } else {
            setDoneList([...doneList, task])
        }
    }

    const handleDelete = (task: IList) => {
        if (task.state == 'todo') {
            setToDoList(toDoList.filter(t => t.id !== task.id))
        } else if (task.state == 'doing') {
            setDoingList(doingList.filter(t => t.id !== task.id))
        } else {
            setDoneList(doneList.filter(t => t.id !== task.id))
        }
    }

    const handleMove = (move: Move, task: IList) => {
        const updatedTask: IList = { ...task, state: 'doing' };
        const removeTaskFromList = (list: IList[]) => list.filter(t => t.id !== task.id);
        const addTaskToList = (list: IList[], updatedTask: IList) => [...list, updatedTask];

        switch (task.state) {
            case 'todo':
                setToDoList(removeTaskFromList(toDoList));
                setDoingList(addTaskToList(doingList, updatedTask));
                break;
            case 'done':
                setDoneList(removeTaskFromList(doneList));
                setDoingList(addTaskToList(doingList, updatedTask));
                break;
            default:
                setDoingList(removeTaskFromList(doingList));
                if (move === 'left') {
                    setToDoList(addTaskToList(toDoList, { ...updatedTask, state: 'todo' }));
                } else {
                    setDoneList(addTaskToList(doneList, { ...updatedTask, state: 'done' }));
                }
        }
    }

    return (
        <>
            <div className={styles.container}>
                <CardColumn title="TO DO" list={toDoList} handleDelete={handleDelete} handleMove={handleMove} />
                <CardColumn title="DOING" list={doingList} handleDelete={handleDelete} handleMove={handleMove} />
                <CardColumn title="DONE" list={doneList} handleDelete={handleDelete} handleMove={handleMove} />
            </div>
            <ModalAdd handleCreate={handleCreate} />
        </>
    )
}

export default CardContainer