import React from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup(props) {

    const [link, setLink] = React.useState('');
    const [name, setName] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: name,
            link: link
        })
    }

    return (
        <PopupWithForm buttonText="Сохранить" name='add' title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input value={name || ''} onChange={handleChangeName} type="text" placeholder="Название" name="name" minLength="2" required className="popup__text popup__text_type_place" id="place-card" />
            <span id="place-card-error" className="error"></span>
            <input value={link || ''} onChange={handleChangeLink} type="url" placeholder="Ссылка на картинку" name="link" required className="popup__text popup__text_type_url" id="url-card" />
            <span id="url-card-error" className="error"></span>
        </PopupWithForm>
    )
}
export default AddPlacePopup;