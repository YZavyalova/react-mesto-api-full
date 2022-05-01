import React from 'react';

function PopupWithForm(props) {
    return(
        <div 
            className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}
        >
            <div className="popup__container">
                <button type="button" className="popup__close-btn" onClick={props.onClose}/>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={`popup-form_${props.name}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__button popup__save-btn">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;