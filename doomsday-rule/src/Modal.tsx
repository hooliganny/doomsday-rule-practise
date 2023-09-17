function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-content">
          <h2>The Doomsday Rule</h2>
          <p>
            The Doomsday Rule is a way of calculating what day a given date is
            in the standard Gregorian Calendar.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Modal;
