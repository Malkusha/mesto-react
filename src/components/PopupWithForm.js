function PopupWithForm({name, title, submitTitle, children, isOpen, onClose}) {



  return (
    <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ``}`}>
          <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
            <form className="popup__edit-form" name={name} action="submit" id={name} noValidate>
              <h2 className="popup__title">{title}</h2>
              {children}
              <button className="popup__save-button" type="submit" form={name}>{submitTitle}</button>
            </form>
          </div>
    </div>
  )
}

export default PopupWithForm;