import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

interface AuthContextValues {
  registerStep: number
  setRegisterStep: (value: number) => void
}

export const AuthContext = createContext<AuthContextValues>({
  registerStep: 1,
  setRegisterStep: () => {}
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [step, setStep] = useState(1);
  return (
    <AuthContext.Provider value={{
      registerStep: step,
      setRegisterStep: (value) => {
        console.log(value);
        setStep(value);
      },
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
