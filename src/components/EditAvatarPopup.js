import React from 'react';
import PopupWithForm from './PopupWithForm';
function EditAvatarPopup(props) {
    const avatarLink = React.useRef('');


    function handleSubmit(e) {
        e.preventDefault();

        const avatar = {
           avatar: avatarLink.current.value
        }
        props.onUpdateAvatar(avatar)
        
    }

    return (
        <PopupWithForm buttonText="Сохранить" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
            <input  ref={avatarLink} type="url" placeholder="Ссылка на картинку" name="avatar" required className="popup__text popup__text_type_avatar" id="url-avatar" />
            <span id="url-avatar-error" className="error"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;