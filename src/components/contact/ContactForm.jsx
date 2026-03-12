import { useForm } from "react-hook-form";
import { ICONS } from "../../assets";
import FormInput from "../shared/form/FormInput";
import FormTextArea from "../shared/form/FormTextArea";

const ContactForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      <FormInput
        id="fullName"
        label="Full Name*"
        placeholder="Your full name"
        register={register}
        validation={{ required: "Full Name is required" }}
        error={errors.fullName}
      />

      <FormInput
        id="email"
        label="Email Address*"
        type="email"
        placeholder="you@example.com"
        register={register}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Enter a valid email address",
          },
        }}
        icon={ICONS.email}
        error={errors.email}
      />

      <FormTextArea
        id="message"
        label="Message*"
        placeholder="Your message"
        register={register}
        validation={{
          required: "Message is required",
          minLength: {
            value: 10,
            message: "Message should be at least 10 characters long",
          },
        }}
        error={errors.message}
      />

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="yellow text-black px-10 py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:opacity-90 transition-all duration-300"
        >
          <img src={ICONS.sendMessage} alt="send icon" className="w-5 h-5" />
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
