import { useState } from "react";
import './modal.css';

export interface Props {
    children: React.ReactNode,
    isOpen: boolean,
    onClose: ()=> void
}

export const Modal = ({children, isOpen, onClose}: Props) => {
    if (!isOpen) return null; 
  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <button className="close-button" onClick={onClose}>
                &times;
            </button>
            {children}
        </div>
    </div>
  )
}
