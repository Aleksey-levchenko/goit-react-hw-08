import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import s from './LoginForm.module.css';
import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email must be required!'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password must be required!'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (value, actions) => {
    dispatch(login(value));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={LoginSchema}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form>
          <ul className={s.logForm_container}>
            <li className={s.logForm_item}>
              <label>Email:</label>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className={s.logForm_input}
              />
              {touched.email && errors.email && (
                <span className={s.error}>{errors.email}</span>
              )}
            </li>

            <li className={s.logForm_item}>
              <label>Password:</label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={s.logForm_input}
              />
              {touched.password && errors.password && (
                <span className={s.error}>{errors.password}</span>
              )}
            </li>

            <Link to="/register" className={s.logForm_haveAcc}>
              You don't have account?{' '}
              <span className={s.logForm_signUp}>Sign UP!</span>
            </Link>
            <button
              type="submit"
              className={`${s.btn} ${!(isValid && dirty) ? s.disabled : ''}`}
              disabled={!(isValid && dirty)}
            >
              Sign In
            </button>
          </ul>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
