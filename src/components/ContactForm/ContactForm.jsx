import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import s from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { useId } from 'react';
import { addContact } from '../../redux/contacts/operations';

const initialValues = {
  name: '',
  number: '',
};

const ContactsSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Name is too short (min 3 characters)')
    .max(50, 'Name is too long (max 50 characters)')
    .required('Name must be required!'),
  number: Yup.string()
    .matches(
      /^\+?[0-9\s\-().]{7,20}$/,
      'Number must be between 7 and 15 digits!',
    )
    .required('Phone must be required!'),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      }),
    );

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactsSchema}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form className={s.form}>
          <div className={s.form_item}>
            <label htmlFor={nameFieldId}>Name:</label>
            <Field
              className={s.field}
              type="text"
              name="name"
              id={nameFieldId}
              placeholder="Name"
            />
            {touched.name && errors.name && (
              <span className={s.error}>{errors.name}</span>
            )}
          </div>

          <div className={s.form_item}>
            <label htmlFor={numberFieldId}>Number:</label>
            <Field
              className={s.field}
              type="text"
              name="number"
              id={numberFieldId}
              placeholder="Number"
            />
            {touched.number && errors.number && (
              <span className={s.error}>{errors.number}</span>
            )}
          </div>

          <button
            className={`${s.btn} ${!(isValid && dirty) ? s.disabled : ''}`}
            type="submit"
            disabled={!(isValid && dirty)}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
