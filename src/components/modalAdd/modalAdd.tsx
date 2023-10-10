import React, { useRef, useState } from 'react';
import { Button, Input, Modal, Select } from 'antd';
import { IList, State } from '../../interfaces/interfaces';

interface Props {
    handleCreate: (arg0: IList, arg1: State) => void
}

const ModalAdd: React.FC<Props> = ({handleCreate}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState<State>('todo');
    const [title, setTitle] = useState<string>('');

    const idRef = useRef(0)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        createTask()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (state: State) => {
        setState(state)
    }

    const createTask = () => {
        const id = idRef.current
        const newTask = {
            title,
            id,
            state
        }
        handleCreate(newTask, state)
        idRef.current += 1
        setState('todo')
        setTitle('')
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Nueva tarea +
            </Button>
            <Modal title="Nueva tarea" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="Titulo" onChange={(e) => setTitle(e.target.value)} value={title} />
                <Select
                    style={{ width: '100%', marginTop: 10 }}
                    onChange={handleChange}
                    value={state}
                    options={[
                        { value: 'todo', label: 'To do' },
                        { value: 'doing', label: 'Doing' },
                        { value: 'done', label: 'Done' }
                    ]}
                />
            </Modal>
        </>
    );
};

export default ModalAdd;