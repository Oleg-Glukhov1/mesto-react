import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function Card(props) {
    const { card, onCardClick, onCardLike, onCardDelete } = props;

    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__delete element__delete_active' : 'element__delete'}`
    );
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`${isLiked ? 'element__like element__like_active' : 'element__like '}`);
    function handleClick() {
        onCardClick(card);
    }
    function handleLike() {
        onCardLike(card);
    }
    function handleDelete() {
        onCardDelete(card)
    }


    return (
        <div className="element">
            <button onClick={handleDelete} className={cardDeleteButtonClassName} type="button"></button>
            <img onClick={handleClick} className="element__img" alt={card.name} src={card.link} />
            <div className="element__cell">
                <p className="element__title">{card.name}</p>
                <div className="element__likes">
                    <button onClick={handleLike} className={cardLikeButtonClassName} type="submit"></button>
                    <p className="element__like_length">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}
export default Card