import s from './ConfirmModal.module.css';

const ConfirmModal = ({ onConfirm, onCancel, name }) => {
  return (
    <div className={s.backdrop}>
      <div className={s.modal}>
        <p>
          Are you sure you want to delete <strong>{name}</strong>?
        </p>
        <div className={s.buttons}>
          <button onClick={onConfirm} className={s.modal_btn}>
            Yes
          </button>
          <button onClick={onCancel} className={s.modal_btn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
