import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [cards, setCards] = React.useState({});


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick() {
    setSelectedCard(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setCards({})
    
  }
  const setImage = (card) => {
    setCards(card);
    handleCardClick();
  }


  return (
    <div className="root">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}  clickImages={setImage}/>
      <Footer />
      <PopupWithForm name='edit' title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
        <input type="text" placeholder="Имя" name="popup__text_type_author" className="popup__text popup__text_type_author" minLength="2" maxLength="40" required id="author-card" />
        <span id="author-card-error" className="error"></span>
        <input type="text" placeholder="Профессия" name="popup__text_type_profession" className="popup__text popup__text_type_profession" minLength="2" maxLength="200" required id="profession-card" />
        <span id="profession-card-error" className="error"></span>
        <button className="popup__button popup__button_type_edit" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm name='add' title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" placeholder="Название" name="Place" minLength="2" required className="popup__text popup__text_type_place" id="place-card" />
        <span id="place-card-error" className="error"></span>
        <input type="url" placeholder="Ссылка на картинку" name="Url" required className="popup__text popup__text_type_url" id="url-card" />
        <span id="url-card-error" className="error"></span>
        <button className="popup__button popup__button_disabled popup__button_type_add" type="submit">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm name='avatar' title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" placeholder="Ссылка на картинку" name="avatar" required className="popup__text popup__text_type_avatar" id="url-avatar" />
        <span id="url-avatar-error" className="error"></span>
        <button className="popup__button popup__button_disabled popup__button_type_avatar" type="submit">Сохранить</button>
      </PopupWithForm>
      {/* <PopupWithForm name='delete' title="Вы уверенны?" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <button className="popup__button popup__button_type_delete" type="submit">Да</button>
      </PopupWithForm> */}
      
      <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} image={cards} />
      


    </div>
  );
}


export default App;
