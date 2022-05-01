import React, {useState, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    } 

    return(
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            buttonText= "Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input 
                id="name" 
                name="name" 
                type="text" 
                value={name || ''}
                onChange={(e) => setName(e.target.value)} 
                className="popup__input popup__input_type_name" 
                required 
                placeholder="Имя" 
                minLength="2" 
                maxLength="40" 
                autoComplete="off"/>
            <span className="error" id="name-error"/>
            <input 
                id="job" 
                name="job" 
                type="text" 
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)} 
                className="popup__input popup__input_type_job" 
                required 
                placeholder="О себе" 
                minLength="2" 
                maxLength="200" 
                autoComplete="off"/>
            <span className="error" id="job-error"/>
        </PopupWithForm>
    );
}


export default EditProfilePopup;