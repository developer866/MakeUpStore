import React from "react";
import "./modal.css";

export default function Modal({ open, onClose, children }) {
    if (!open) return null;

    const handleOutsideClick = (e) => {
        if (e.target.className === "modal-overlay") {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOutsideClick}>
            <div className="modal-content">
                {children}

                <button className="modal-close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
