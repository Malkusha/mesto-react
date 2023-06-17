import {createRef, useRef} from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const placeRef = createRef();
  const linkRef = createRef();
 
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeRef.current.value, 
      link: linkRef.current.value});
    placeRef.current.value = '';
    linkRef.current.value = '';
  }
 
  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      submitTitle='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input className="popup__info popup__info_type_name cards-edit__name" ref={placeRef} id="place-input" name="title" type="text" placeholder="Название" minLength="2" maxLength="30" required/>
      <span className="popup__input-error place-input-error"></span>
      <input className="popup__info popup__info_type_description cards-edit__description" ref={linkRef} id="link-input" name="link" type="url" placeholder="Ссылка на картинку" required/>
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
 )
}

export default AddPlacePopup;