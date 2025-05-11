import s from './Contact.module.css';
import { FaPhoneAlt, FaRegTrashAlt, FaEdit, FaSave } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import { useState } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    dispatch(deleteContact(id));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    dispatch(updateContact({ id, name: editedName, number: editedNumber }));
    setIsEditing(false);
  };

  return (
    <>
      <div className={s.contact_item_wrap}>
        <span>
          <IoPersonSharp />
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={e => setEditedName(e.target.value)}
              className={s.edit_input}
            />
          ) : (
            ` ${name}`
          )}
        </span>
        <span>
          <FaPhoneAlt />
          {isEditing ? (
            <input
              type="text"
              value={editedNumber}
              onChange={e => setEditedNumber(e.target.value)}
              className={s.edit_input}
            />
          ) : (
            ` ${number}`
          )}
        </span>
      </div>

      <div className={s.contact_buttons}>
        {isEditing ? (
          <button onClick={handleSave} className={s.contact_btn_save}>
            <FaSave />
          </button>
        ) : (
          <button onClick={handleEditToggle} className={s.contact_btn_edit}>
            <FaEdit />
          </button>
        )}
        <button onClick={handleDelete} className={s.contact_btn_delete}>
          <FaRegTrashAlt />
        </button>
      </div>

      {isModalOpen && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          name={name}
        />
      )}
    </>
  );
};

export default Contact;
