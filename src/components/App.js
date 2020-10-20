import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App() {
// Переменные внутреннего состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [dataImage, setDataImage] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
// Удаление карточки
  function handleCardDelete(card) {
      api.removeCard(card._id)
      .then(() => {
          const newCards = cards.filter((c) => c._id != card._id);
          setCards(newCards)
      })
      .catch((err) => {
          console.error(err);
        });
  }
// Лайк
  function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        // Обновляем стейт
        setCards(newCards);
      });
  }


// Открытие попапов
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
  // Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setDataImage({})

  }

  // Попап изображения
  const setImage = (card) => {
    setDataImage(card);
    handleCardClick();
  }
  
  // Изменение данных пользователя
  function handleUpdateUser(user) {
    api.patchProfileInfo(user.name, user.about)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // Изменение аватара пользователя
  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
// Добавление новой карточки
  function handleAddPlaceSubmit(newCard){
    api.newCardAdd(newCard)
    .then((res) => {
      setCards([...cards, res]);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    });
  }
// Запрос начальных карточек, профиля
  React.useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user)
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
    
      <div className="root">
        <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          clickImages={setImage}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        {/* <PopupWithForm name='delete' title="Вы уверенны?" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <button className="popup__button popup__button_type_delete" type="submit">Да</button>
      </PopupWithForm> */}
        <ImagePopup isOpen={selectedCard} onClose={closeAllPopups} image={dataImage} />
        </CurrentUserContext.Provider>
      </div>
    
  );
}


export default App;
