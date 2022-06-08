import React from 'react';

const Popup = (props) => {
    return (
        <>
            <login></login>
            <div className='popup-box'>
                <div className='box'>
                    <span className='close-icon' onClick={props.handleClose}>
                        x
                    </span>
                    hola
                    {props.content}
                </div>
            </div>
        </>
    );
};

export default Popup;
