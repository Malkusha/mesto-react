import {useEffect, useState} from "react";
import {api} from "../utils/api.js";
import Card from './Card';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('#');
  const [cards, setCards] = useState([]);  

  useEffect(() => {
    api.getProfileInfo()
      .then(({name, about, avatar}) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
      api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })   
  }, [])

  return (
      <main>
        <section className="profile">
          <button className="profile__avatar-hover" onClick={onEditAvatar}>
            <img 
              className="profile__avatar" 
              src={userAvatar}
              alt="Аватар"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
            <p className="profile__description">{userDescription}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
          {cards.map((item) => {
            return (
              <Card
                key={item._id}
                card={item}
                onCardClick={onCardClick}
              />
            )
          })}
        </section>   
      </main>
  )
}

export default Main;