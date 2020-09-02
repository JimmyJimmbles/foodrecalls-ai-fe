import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../queries/user';
import useForm from './useForm';

const useAuthenticationForm = (inputs) => {
  const [loginUser, data] = useMutation(LOGIN_USER);

  const { handleChange, handleSubmit, values } = useForm(
    ({ email, password }) => loginUser({ variables: { email, password } }),
    inputs
  );

  return { handleChange, handleSubmit, values, ...data };
};

export default useAuthenticationForm;
