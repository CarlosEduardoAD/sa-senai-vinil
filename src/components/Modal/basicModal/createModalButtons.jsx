import modalStyles from './Modal.module.scss';
import Button from '../../Button/Button';
import PropTypes from 'prop-types';
import axios from 'axios'
import Cookies from 'js-cookie';

const createModalButtons = (text1, text2, okBtnFunc, cancelBtnFunc, currentArticul) => {
    return (
        <>
            <Button
                onClickHandler={() => { okBtnFunc(currentArticul)
                if(text1 == 'Delete'){
                    return
                }
                axios.defaults.withCredentials = true;
                axios.post('http://localhost:3000/insertPurchase', {withCredentials : true})
                console.log(console.log(Cookies.get('acess_token')))
                console.log("Worked")}}
                className={`${modalStyles.btn} ${modalStyles.okBtn}`}
                text={text1}
            />
            <Button
                onClickHandler={() => { cancelBtnFunc() }}
                className={`${modalStyles.btn} ${modalStyles.cancelBtn}`}
                text={text2}
            />
        </>
    )
}

createModalButtons.propTypes = {
    text1: PropTypes.string,
    text2: PropTypes.string,
    okBtnFunc: PropTypes.func.isRequired,
    cancelBtnFunc: PropTypes.func.isRequired,
    currentArticul: PropTypes.string.isRequired,
}

createModalButtons.defaultProps = {
    text1: 'Ok',
    text2: 'Cancel'
}


export default createModalButtons;
