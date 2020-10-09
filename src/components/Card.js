import React from 'react';
function Card(props){
    const {card, onCardClick} = props;
    function handleClick() {
        onCardClick(card);
      }
    return (
        <div className="element">
            <button className="element__delete" type="button"></button>
            <img onClick={handleClick} className="element__img" alt={card.name} src={card.link}/>
            <div className="element__cell">
                <p className="element__title">{card.name}</p>
                <div className="element__likes">
                    <button className="element__like" type="submit"></button>
                    <p className="element__like_length">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}
export default Card