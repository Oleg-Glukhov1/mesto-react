import React from 'react';
import api from '../utils/Api';
import Card from './Card';

const Main = (props) => {

    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        function userInfo(user) {
            setUserName(user.name);
            setUserDescription(user.about);
            setUserAvatar(user.avatar);
        }
        api.getUserInfo()
            .then((user) => {
                userInfo(user)
            })
            .catch((err) => {
                 console.log(err);
               });
        api.getInitialCards()
            .then((cards) => {
                setCards(cards)
            })
            .catch((err) => {
                console.log(err);
              });
    }, [])
    return (
        <main className="content">
            <section className="profile">

                <button className="profile__avatar_button" typt='button' onClick={props.onEditAvatar} aria-label="Редактировать аватар">
                    <img src={userAvatar} className="profile__avatar" alt="Аватар" />
                </button>

                <div className="profile__info">
                    <div className="profile__info-name">
                        <h1 className="profile__info-author">{userName}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__info-profession">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
            {cards && cards.map((card) => (
              <Card key={card._id} card={card} onCardClick={props.clickImages} />
            ))}

            </section>
            <section className="popups">
  
            </section>

        </main>

    )

}

export default Main