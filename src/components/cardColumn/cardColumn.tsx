import styles from './styles.module.css'
import { IList, Move } from "../../interfaces/interfaces"
import Card from "../card/card"

interface Props {
  list: IList[]
  title: string
  handleDelete: (task: IList) => void
  handleMove: (move: Move, task: IList) => void
}
const CardColumn: React.FC<Props> = ({ list, title, handleDelete, handleMove }) => {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.column}>
        {list.length > 0 ? (
          <>
            {list.map((el, index) => <Card task={el} key={index} handleDelete={handleDelete} handleMove={handleMove} />)}
          </>
        ) : (
          <p>Aún no hay tarjetas creadas</p>
        )}
      </div>
    </div>
  )
}

export default CardColumn