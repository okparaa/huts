import { Field } from "formik";

type InputProps = {
  name: string;
  type?: string;
  placeholder: string;
  width?: string;
  inputClass?: string;
  labelClass?: string;
  errorContainer?: string;
  errors: any;
  dirty: boolean;
  touched: any;
};

const Input = (props: InputProps) => {
  let {
    name,
    type,
    width,
    inputClass,
    placeholder,
    labelClass,
    errorContainer,
    errors,
    touched,
  } = props;

  type = type || "text";
  width = width || "";
  inputClass = inputClass || "";
  labelClass = labelClass || "";
  errorContainer = errorContainer || "";
  return (
    <div className="mb-6 h-12 relative z-0">
      <Field
        className={inputClass}
        id={name}
        placeholder=""
        name={name}
        type={type}
      />
      <label htmlFor={name} className={labelClass}>
        {placeholder}
      </label>
      {errors[name] && touched[name] ? (
        <div className="error">{errors[name]}</div>
      ) : null}
    </div>
  );
};

export default Input;
