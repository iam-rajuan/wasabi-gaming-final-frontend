
const FormTextArea = ({
  id,
  label,
  register,
  validation,
  error,
  placeholder,
  rows = 6,
}) => {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-lg font-medium text-gray-200">
        {label}
      </label>

      <textarea
        id={id}
        rows={rows}
        {...register(id, validation)}
        placeholder={placeholder}
        className={`w-full p-4 mt-2 bg-transparent border rounded-md text-white placeholder-gray-400 
        focus:outline-none focus:border-yellow-400 transition-all duration-200 ${
          error ? "border-red-500" : "border-gray-400"
        }`}
      ></textarea>

      {error && <p className="text-red-400 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FormTextArea;
