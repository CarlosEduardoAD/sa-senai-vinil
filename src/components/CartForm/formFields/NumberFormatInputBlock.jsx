import { ErrorMessage, useField } from 'formik';
import styles from '../CartForm.module.scss';
import NumberFormat from "react-number-format";
import PropTypes from 'prop-types';

export const NumberFormatInputBlock = ({ name, label, id, placeholder, type }) => {
    const [field] = useField(name);

    return <div key={id} className={styles.fieldContainer}>
        <label className={`${styles.orderLabel} dark:text-white`} htmlFor={name}>{label}</label>
        <NumberFormat
            {...field}
            className={`${styles.orderInput} rounded-lg dark:bg-neutral-800 dark:border-neutral-800 dark:text-white`}
            format={"+55 (##) #####-####"}
            allowEmptyFormatting mask="_"
            name={name}
            placeholder={placeholder}
            type={type}
        />
        <ErrorMessage component="p" className={styles.fieldError} name={name} />
    </div>
}

NumberFormatInputBlock.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
}

NumberFormatInputBlock.defaultProps = {
    placeholder: '',
    type: 'text',
    id: '',
}
