import { Field, ErrorMessage } from 'formik';
import styles from '../CartForm.module.scss';
import PropTypes from 'prop-types';

export const FormikInputBlock = ({ id, name, placeholder, type, label }) => {
    return <div key={id} className={styles.fieldContainer}>
        <label className={`${styles.orderLabel} dark:text-white`} htmlFor={name}>{label}</label>
        <Field className={`${styles.orderInput} rounded-lg dark:bg-neutral-800 dark:border-neutral-800 dark:text-white`}
            key={id}
            name={name}
            placeholder={placeholder}
            type={type} />
        <ErrorMessage component="p" className={styles.fieldError} name={name} />
    </div>
}

FormikInputBlock.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
};

FormikInputBlock.defaultProps = {
    placeholder: '',
    type: 'text',
    id: '',
};
