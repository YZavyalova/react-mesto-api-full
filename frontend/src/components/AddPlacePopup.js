import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [name, setName] = useState(null);
    const [link, setLink] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    } 

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return(
        <PopupWithForm
            name="card" 
            title="Новое место" 
            buttonText= "Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input 
                id="card-name" 
                name="name" 
                type="text" 
                className="popup__input popup__input_type_card-name" 
                required 
                placeholder="Название" 
                minLength="2" 
                maxLength="30" 
                autoComplete="off"
                value={name || ''}
                onChange={e => setName(e.target.value)}
            />
            <span className="error" id="card-name-error"/>
            <input 
                id="card-src" 
                name="link" 
                type="url" 
                className="popup__input popup__input_type_card-src" 
                required 
                placeholder="Ссылка на картинку"
                value={link || ''}
                onChange={e => setLink(e.target.value)}
            />
            <span className="error" id="card-src-error"/>
        </PopupWithForm>
    );
}


export default AddPlacePopup;