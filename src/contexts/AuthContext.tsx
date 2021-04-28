import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export enum RegisterType {
  Phone = 'Phone',
  Email = 'Email'
}

interface AuthContextValues {
  registerStep: number
  setRegisterStep: (value: number) => void
  registerType?: RegisterType
  setRegisterType?: (value: RegisterType) => void
}

export const AuthContext = createContext<AuthContextValues>({
  registerStep: 1,
  setRegisterStep: () => {}
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<RegisterType | undefined>();
  return (
    <AuthContext.Provider value={{
      registerStep: step,
      registerType: type,
      setRegisterStep: (value) => {
        setStep(value);
      },
      setRegisterType: (value) => {
        setType(value);
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
