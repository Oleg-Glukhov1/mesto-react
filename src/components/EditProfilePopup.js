import React from "react";
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser])
    function handleChangeName(e) {
        setName(e.target.value)
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
        
    }
    return (
        <PopupWithForm onSubmit={handleSubmit} buttonText="Сохранить" name='edit' title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} >
            <input value={name || ''} onChange={handleChangeName} type="text" placeholder="Имя" name="popup__text_type_author" className="popup__text popup__text_type_author" minLength="2" maxLength="40" required id="author-card" />
            <span id="author-card-error" className="error"></span>
            <input value={description || '' } onChange={handleChangeDescription} type="text" placeholder="Профессия" name="popup__text_type_profession" className="popup__text popup__text_type_profession" minLength="2" maxLength="200" required id="profession-card" />
            <span id="profession-card-error" className="error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup;