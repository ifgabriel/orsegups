import { FileWarningIcon, XIcon } from 'lucide-react';
import styles from './styles.module.css';

interface ExceptionStateProps {
  title: string,
  description: string,
  type: 'ERROR' | 'EMPTY'
}

const ExceptionState = ({ title, description, type }: ExceptionStateProps) => (
  <div className={styles.ExceptionState}>
    <div className={styles.Icon}>
      {type === 'ERROR'
        ? <XIcon data-testid='error-icon' />
        : <FileWarningIcon data-testid='empty-icon' />
      }
    </div>
    <div>
      <h3>
        {title}
      </h3>
      <span>
        {description}
      </span>
    </div>
  </div>
)

export default ExceptionState
