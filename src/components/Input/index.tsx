import React, { InputHTMLAttributes } from "react";
import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

// rest operation ( ... ) pega todas as propriedades que não foram desistruturada no {label, name} e joga na variavel rest
// Ou seja, todas as propriedades menos as propriedades label e name

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} id={name} {...rest} />
    </div>
  );
};

export default Input;
