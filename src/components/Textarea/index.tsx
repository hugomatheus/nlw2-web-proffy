import React, { TextareaHTMLAttributes } from "react";
import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

// rest operation ( ... ) pega todas as propriedades que não foram desistruturada no {label, name} e joga na variavel rest
// Ou seja, todas as propriedades menos as propriedades label e name

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea  name={name} id={name} {...rest} />
    </div>
  );
};

export default Textarea;
