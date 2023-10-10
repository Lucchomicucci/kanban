import { DeleteOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { IList, Move } from "../../interfaces/interfaces"
import styles from './styles.module.css'
import { Popconfirm } from "antd"

interface Props {
  task: IList
  handleDelete: (task: IList) => void
  handleMove: (move: Move, task: IList) => void
}

const Card: React.FC<Props> = ({ task, handleDelete, handleMove }) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{task.title}</p>
      {task.state !== 'todo' && <ArrowLeftOutlined className={styles.icon} onClick={() => handleMove('left', task)}/>}
      <Popconfirm
        title="Eliminar"
        description="Estas seguro de eliminar esta tarea?"
        onConfirm={() => handleDelete(task)}
        okText="Si"
        cancelText="No"
      >
        <DeleteOutlined className={styles.icon} />
      </Popconfirm>
      {task.state !== 'done' && <ArrowRightOutlined className={styles.icon} onClick={() => handleMove('right', task)}/>}
    </div>
  )
}

export default Card