const Icon = ({ icon, size = 40, radious = "", mb = "mb-0", p = 8 }) => {
  return (
    <div
      className={`bg-primary flex items-center justify-center ${radious} ${mb}`}
      style={{ width: size, height: size }}
    >
      <img
        className="object-contain"
        src={icon}
        alt="icon"
        style={{ width: size, height: size, padding: p }}
      />
    </div>
  );
};


export default Icon;
