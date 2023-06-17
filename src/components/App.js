import {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Footer from './Footer';
import {api} from "../utils/api.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [CurrentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getProfileInfo()
      .then(({name, about, avatar, _id}) => {
        setCurrentUser({name, about, avatar, _id});
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })   
  }, [])

  function handleUpdateUser({name, about}) {
    api.setProfileInfo({name, about})
      .then(({name, about}) => setCurrentUser({name, about}))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
    closeAllPopups();
  }

  function handleUpdateAvatar({avatar}) {
    api.setAvatar({avatar})
      .then((data) => setCurrentUser(data))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
    closeAllPopups();
  }

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

  function handleAddPlaceSubmit(newCard) {
    api.loadNewCard(newCard)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
    
    closeAllPopups();
  }

  function handleCardClick(card) {
    setSelectedCard(card);  
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === CurrentUser._id);
    if (!isLiked) {
      api.addLike(card._id)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });    
    } else {
      api.removeLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) =>c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      }); 
    }    
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(setCards(cards.filter(item => item._id !== card._id)))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      }); 
  }

  return (
    <CurrentUserContext.Provider value={CurrentUser}>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
        setCards={setCards}
      />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <PopupWithForm
        popupName='deiete'
        title='Вы уверены?'
        submitTitle='Да'
        onClose={closeAllPopups}  
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
