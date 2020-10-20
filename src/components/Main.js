import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = (props) => {
    const currentUser = React.useContext(CurrentUserContext)
    const newLocal = props.clickImages;

    return (
        <main className="content">
            <section className="profile">

                <button className="profile__avatar_button" typt='button' onClick={props.onEditAvatar} aria-label="Редактировать аватар">
                    <img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
                </button>

                <div className="profile__info">
                    <div className="profile__info-name">
                        <h1 className="profile__info-author">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__info-profession">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
            {props.cards && props.cards.map((card) => (
              <Card key={card._id} 
              card={card} 
              onCardClick={newLocal}
              onCardLike={props.onCardLike} 
              onCardDelete={props.onCardDelete}/>
            ))}

            </section>
            <section className="popups">
  
            </section>

        </main>
        

    )

}

export default Main