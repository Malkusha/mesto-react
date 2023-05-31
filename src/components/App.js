import React from 'react';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import Footer from './Footer';

function App() {
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

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
        children={
          <>
            <input className="popup__info popup__info_type_name profile-edit__name" id="name-input" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="popup__input-error name-input-error"></span>
            <input className="popup__info popup__info_type_description profile-edit__description" id="description-input" name="about" type="text" placeholder="Описание" minLength="2" maxLength="200" required />
            <span className="popup__input-error description-input-error"></span>
          </>
        }
         />
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        submitTitle='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input className="popup__info popup__info_type_description avatar-edit__description" id="avatarLink-input" name="avatar" type="url" placeholder="Ссылка на аватар" required />
            <span className="popup__input-error avatarLink-input-error"></span>
          </>
        }
      />
      <PopupWithForm
        name='card'
        title='Новое место'
        submitTitle='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        children={
          <>
            <input className="popup__info popup__info_type_description avatar-edit__description" id="avatarLink-input" name="avatar" type="url" placeholder="Ссылка на аватар" required />
            <span className="popup__input-error avatarLink-input-error"></span>
          </>
        }
      />
      <PopupWithForm
        name='deiete'
        title='Вы уверены?'
        submitTitle='Да'
        onClose={closeAllPopups}
        children={
          <>
          </>
        }
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <Footer />
      <template id="el-template">
        
      </template>
    </div>
  );
}

export default App;
