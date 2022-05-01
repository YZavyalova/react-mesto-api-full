import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const textInput = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: textInput.current.value,
        });
    }

    return(
        <PopupWithForm
            name="avatar" 
            title="Обновить аватар" 
            buttonText= "Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input 
                id="avatar-src" 
                name="link-avatar" 
                type="url" 
                className="popup__input popup__input_type_avatar-src" 
                required 
                placeholder="Ссылка на картинку"
                ref={textInput}
            />
            <span className="error" id="avatar-src-error"/>
        </PopupWithForm>
    );
}


export default EditAvatarPopup;