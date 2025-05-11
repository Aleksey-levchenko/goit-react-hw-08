import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import s from './RegistrationForm.module.css';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short (min 3 characters)')
    .max(50, 'Name is too long (max 50 characters)')
    .required('Name must be required!'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email must be required!'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password must be required!'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (value, actions) => {
    dispatch(register(value));
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form>
            <ul className={s.regForm_container}>
              <li className={s.regForm_item}>
                <label>Name:</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className={s.regForm_input}
                />
                {touched.name && errors.name && (
                  <span className={s.error}>{errors.name}</span>
                )}
              </li>

              <li className={s.regForm_item}>
                <label>Email:</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={s.regForm_input}
                />
                {touched.email && errors.email && (
                  <span className={s.error}>{errors.email}</span>
                )}
              </li>

              <li className={s.regForm_item}>
                <label>Password:</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={s.regForm_input}
                />
                {touched.password && errors.password && (
                  <span className={s.error}>{errors.password}</span>
                )}
              </li>

              <Link to="/login" className={s.regForm_haveAcc}>
                You already have account?{' '}
                <span className={s.regForm_signIn}>Sign in!</span>
              </Link>
              <button
                type="submit"
                className={`${s.btn} ${!(isValid && dirty) ? s.disabled : ''}`}
                disabled={!(isValid && dirty)}
              >
                Sign Up
              </button>
            </ul>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationForm;
