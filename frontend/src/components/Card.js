import React from "react";
import CurrentUserContext from '../context/CurrentUserContext';

function Card({card, onCardLike, onCardDelete, onCardClick}) {

    const handleClick = () => onCardClick(card);
    const handleCardDelete = () => onCardDelete(card);
    const handleCardLike = () => onCardLike(card);

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;

    const cardDeleteButtonClassName = (
        `${isOwn ? 'photo-card__delete-btn' : 'photo-card__delete-btn_hidden'}`
    );

    const isLiked = card.likes.some(i => i === currentUser._id);
    //То есть если среди лайков карточки есть лайк
    //сделанный пользователем, у которого id совпадает с id из контекста.

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `photo-card__like-btn ${isLiked ? 'photo-card__like-btn_active' : ''}`; 

    return(
        <li className="photo-card">
            <img src={card.link} alt={card.name} className="photo-card__img" onClick={handleClick}/>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}/>
            <div className="photo-card__innerwrap">
                <p className="photo-card__text">{card.name}</p>
                <div className="photo-card__like-area">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}/>
                    <span className="photo-card__like-numbers">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}


export default Card;