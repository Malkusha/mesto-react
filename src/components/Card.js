import React from "react";

function Card({id, name, link, likes, onCardClick}) {

  function handleClick() {
    onCardClick({id, name, link, likes});
  } 

  return (
    <div className="elements__item" key={id}>
      <img className="elements__item-image"  src={link} alt={name} onClick={handleClick} />
      <button className="elements__delete" type="button" aria-label="Удаление"></button>
      <div className="elements__item-info">
        <h2 className="elements__item-title">{name}</h2>
        <button className="elements__like" type="button" aria-label="Лайк"></button>
        <p className="elements__likes-count">{likes}</p>
      </div>
    </div>
  )
}

export default Card;