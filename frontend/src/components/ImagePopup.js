import React from "react";

function ImagePopup({card, onClose}) {
    return(
        <div className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}>
            <div className="popup__content">
                <button type="button" className="popup__close-btn popup__close-btn_image" onClick={onClose}/>
                <figure className="popup__figure">
                    <img src={card.link} alt={card.name} className="popup__pic"/>
                    <figcaption className="popup__figcaption">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}


export default ImagePopup;