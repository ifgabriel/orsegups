import { FileWarningIcon, XIcon } from 'lucide-react';
import styles from './styles.module.css';

interface ExceptionStateProps {
  title: string,
  description: string,
  type: 'ERROR' | 'EMPTY'
}

const ExceptionState = ({ title, description, type }: ExceptionStateProps) => (
  <div className={styles.Container}>
    {type === 'ERROR'
      ? <XIcon />
      : <FileWarningIcon />
    }
    <h2>
      {title}
    </h2>
    <span>
      {description}
    </span>
  </div>
)

export default ExceptionState
