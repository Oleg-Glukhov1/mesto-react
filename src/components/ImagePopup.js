import React from 'react'
function ImagePopup(props) {
    
    return (
        <section className={`popup popup__type_img ${props.isOpen ? 'popup_opened' : ''}`} >
        <div className="popup__container_img">
            <button onClick={props.onClose} className="popup__close popup__close_img" type="button"></button>
            <img className="popup__photo" src={props.image.link} alt={props.image.name} />
            <p className="popup__caption">{props.image.name}</p>
        </div>
    </section>
    )
}
export default ImagePopup;

