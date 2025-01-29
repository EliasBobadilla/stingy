import { useState } from "react";

export interface UpdateFormValueFn {
  field: string;
  value: string;
}

interface IProps {
  labelTitle: string;
  labelStyle?: string;
  type: string;
  containerStyle: string;
  defaultValue?: string;
  placeholder?: string;
  onInputChange?: ({ field, value }: UpdateFormValueFn) => void;
  inputName: string;
  required?: boolean;
}

export const InputText = ({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  onInputChange,
  inputName,
  required,
}: IProps) => {
  const [value, setValue] = useState(defaultValue ?? "");

  const handleOnChange = (value: string) => {
    if (onInputChange) {
      onInputChange({ field: inputName, value });
    }
    setValue(value);
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type={type}
        id={inputName}
        name={inputName}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleOnChange(e.target.value)}
        className="input input-bordered w-full"
        required={required}
      />
    </div>
  );
};

export default InputText;
