import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const Modal = ({ isShown, header, text, actions, closeButton, closeModalHandler }) => {
    const classHide = !isShown ? styles.hide : '';
    return (
        <> <div className={`${styles.modalBox} ${isShown ? '' : styles.hide} dark:bg-[#241e63] dark:text-white`}>
            <div className={`${styles.header} dark:bg-[#312a86]`}>
                <h2 className={`${styles.headerTitle} dark:bg-[#312a86]`}>{header}</h2>
                <button onClick={() => { closeModalHandler() }} className={closeButton ? styles.closeBtn : ''}></button>
            </div>
            <p className={styles.text}>{text}</p>
            <div className={styles.btnBox}>
                {actions}
            </div>
        </div>
            <div onClick={() => { closeModalHandler() }} className={`${styles.overlay} ${classHide}`}></div>
        </>
    );
};

Modal.propTypes = {
    isShown: PropTypes.bool,
    header: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    actions: PropTypes.node,
    closeButton: PropTypes.bool,
    closeModalHandler: PropTypes.func.isRequired,
};
Modal.defaultProps = {
    actions: null,
    isShown: false,
    closeButton: true
}

export default Modal;
