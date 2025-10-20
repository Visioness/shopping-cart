import { DiamondMinus, DiamondPlus } from 'lucide-react';
import styles from './QuantitySelector.module.css';
import PropTypes from 'prop-types';

function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className={styles.quantitySelector}>
      <button
        type='button'
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label='Decrease quantity'>
        <DiamondMinus size={24} color='black' strokeWidth={2} />
      </button>
      <span className={styles.value} aria-live='polite'>
        {value}
      </span>
      <button
        type='button'
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label='Increase quantity'>
        <DiamondPlus size={24} color='black' strokeWidth={2} />
      </button>
    </div>
  );
}

export default QuantitySelector;

QuantitySelector.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};
