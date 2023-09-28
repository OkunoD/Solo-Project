import React from 'react';
import { useSelector, connect } from 'react-redux';
import { openAlert, closeAlert } from '../actions/actions';
// import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

const mapDispatchToProps = (dispatch) => ({
    closeAlert : () => dispatch(closeAlert()),
});

const Alert = ({ message, closeAlert }) => {
    const isAlertOn = useSelector(state=>state.isAlertOn);
    const alertColor = useSelector(state=>state.alertColor);

    return (
        <div className={`alert${isAlertOn ? `-${alertColor}` : ' hidden'}`}
        onTransitionEnd={()=>{
            console.log('hit onTransitionEnd');
            closeAlert();
        }
        }>
            <div className="alert-content">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default connect(null, mapDispatchToProps) (Alert);
