import ContactForm from "../../components/contact/ContactForm";


const ContactUs = () => {
  const handleFormSubmit = (data) => {
    alert("Message Sent!");
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent px-4 py-10 lg:pb-20">
      <div className="md:max-w-[700px] w-full">
        <h1 className="text-white text-3xl lg:text-4xl font-semibold text-center">
          Get in Touch
        </h1>
        <p className="text-[#EBEBEB] text-lg lg:text-2xl mt-4 mb-8 text-center">
          Have a question or need support with your legal journey? Our team is
          here to help with applications, events, and everything in between.
        </p>

        <div className="p-8 rounded-[16px] border border-[#999] bg-[rgba(0,0,0,0.5)] shadow-lg w-full backdrop-blur-sm">
          <h2 className="text-xl md:text-3xl text-white text-center font-semibold mb-6">
            Send us a Message
          </h2>

          <ContactForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
