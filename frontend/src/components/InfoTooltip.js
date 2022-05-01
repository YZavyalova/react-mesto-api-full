import React from "react";
import authDone from '../images/authDone.svg'
import authFailed from '../images/authFailed.svg'

const InfoTooltip = ({isOpen, onClose, isAuthDone}) => {
    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="infoTooltip__content">
                <button type="button" className="popup__close-btn" onClick={onClose}/>
                { isAuthDone ? (
                    <div className="infoTooltip__wrapper">
                        <img className="infoTooltip__img" src={authDone} alt="Вы успешно зарегистрировались!" />
                        <p className="infoTooltip__text">Вы успешно зарегистрировались!</p>
                    </div>
                    ) : (
                    <div className="infoTooltip__wrapper">
                        <img className="infoTooltip__img" src={authFailed} alt="Что-то пошло не так! Попробуйте ещё раз." />
                        <p className="infoTooltip__text">Что-то пошло не так! Попробуйте ещё раз.</p>
                    </div>
                    )
                }
            </div>
        </div>
    )
}


export default InfoTooltip;