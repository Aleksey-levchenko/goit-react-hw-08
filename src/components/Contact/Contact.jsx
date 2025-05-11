import s from './Contact.module.css';
import { FaPhoneAlt, FaRegTrashAlt } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import { useState } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <div className={s.contact_item_wrap}>
        <span>
          <IoPersonSharp /> {name}
        </span>
        <span>
          <FaPhoneAlt /> {number}
        </span>
      </div>
      <button onClick={handleDelete} className={s.contact_btn_delete}>
        <FaRegTrashAlt />
      </button>

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
