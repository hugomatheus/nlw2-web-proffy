import React, { SelectHTMLAttributes } from "react";
import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

// rest operation ( ... ) pega todas as propriedades que não foram desistruturada no {label, name} e joga na variavel rest
// Ou seja, todas as propriedades menos as propriedades label e name

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select value="" name={name} id={name} {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
        ;
      </select>
    </div>
  );
};

export default Select;
