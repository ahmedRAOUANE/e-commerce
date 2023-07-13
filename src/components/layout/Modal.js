import React, { Fragment } from "react";
import ReactDOM from "react-dom";

// css style
import style from "../../assets/Modal.module.css"

const Backdrop = (props) => <div className={style.backdrop} onClick={()  => props.onClose(false)}></div>;

const Overlay = (props) => <div className={style.overlay}>{props.children}</div>;

const Modal = ({ isOpen, onClose, children }) => {
  return (
    isOpen ?
    ReactDOM.createPortal(
      <Fragment>
        <Backdrop isOpen={isOpen} onClose={onClose} />
        <Overlay isOpen={isOpen} onClose={onClose} children={children} />
      </Fragment>, document.getElementById('popup')
    )
    : null
  );
};

export default Modal;
