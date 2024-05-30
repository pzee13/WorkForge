import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, error, touched, placeholder }) => (
  <div className="mb-6">
    <label htmlFor={id} className="block text-gray-700 font-semibold mb-2">{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full px-3 py-2 border bg-gray-100 rounded-full focus:outline-none"
      value={value}
      onChange={onChange}
    />
    {error && touched && (
      <div className="text-red-500">{error}</div>
    )}
  </div>
);

export default InputField;
