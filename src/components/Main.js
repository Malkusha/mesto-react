import React from "react";
import {api} from "../utils/api.js";
import Card from './Card';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [cards, setCards] = React.useState([]);  

  React.useEffect(() => {
    api.getProfileInfo()
      .then(({name, about, avatar}) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(
          data.map((item) => ({
            id: item._id,
            name: item.name,
            link: item.link,
            likes: item.likes.length
          }))
        );
      });
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
                key={item.id}
                name={item.name}
                link={item.link}
                likes={item.likes}
                onCardClick={onCardClick}
              />
            )
          })}
        </section>   
      </main>
  )
}

export default Main;