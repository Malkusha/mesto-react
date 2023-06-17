import {createRef} from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = createRef()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  } 

  return (
    <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        submitTitle='Сохранить'
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input className="popup__info popup__info_type_description avatar-edit__description" ref={avatarRef} id="avatarLink-input" name="avatar" type="url" placeholder="Ссылка на аватар" required />
        <span className="popup__input-error avatarLink-input-error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;