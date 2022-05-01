import React from 'react';
import CurrentUserContext from '../context/CurrentUserContext';
import Card from "./Card";


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardDelete, onCardLike}) {
    const currentUser = React.useContext(CurrentUserContext);

    return(
    <main className="main">
        <section className="profile page__profile">
            <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
                <img src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>
            </div>
            <div className="profile__info">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button type="button" className="profile__edit-btn" onClick={onEditProfile}/>
            </div>
            <p className="profile__description">{currentUser.about}</p>
            <button type="button" className="profile__add-btn"onClick={onAddPlace}/>
        </section>
        <section className="photo page__photo">
            <ul className="photo__items">
            {cards.map((card) => (
            <Card 
                key={card._id}
                card={card} 
                onCardClick={onCardClick} 
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
            />))}
            </ul>
        </section>
    </main>
    );
}

export default Main;
