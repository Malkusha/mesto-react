import {useEfffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    
  }  

  return (
    <div>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        submitTitle='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
          <input className="popup__info popup__info_type_name profile-edit__name" id="name-input" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" required />
          <span className="popup__input-error name-input-error"></span>
          <input className="popup__info popup__info_type_description profile-edit__description" id="description-input" name="about" type="text" placeholder="Описание" minLength="2" maxLength="200" required />
          <span className="popup__input-error description-input-error"></span>
        </PopupWithForm>
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        submitTitle='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
          <input className="popup__info popup__info_type_description avatar-edit__description" id="avatarLink-input" name="avatar" type="url" placeholder="Ссылка на аватар" required />
          <span className="popup__input-error avatarLink-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name='card'
        title='Новое место'
        submitTitle='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input className="popup__info popup__info_type_description avatar-edit__description" id="avatarLink-input" name="avatar" type="url" placeholder="Ссылка на аватар" required />
        <span className="popup__input-error avatarLink-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name='deiete'
        title='Вы уверены?'
        submitTitle='Да'
        onClose={closeAllPopups}  
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <Footer />
    </div>
  );
}

export default App;
