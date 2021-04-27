import { useContext } from 'react';
import AuthContext from '../contexts/JWTContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;

export const checkAddress = (address: string, setRegisterStep: (value: number) => void) => {
  if (address) {
    setRegisterStep(2);
  }
};
