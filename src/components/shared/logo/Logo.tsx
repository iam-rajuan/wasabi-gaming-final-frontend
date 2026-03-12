import { IMAGES } from "../../../assets";

interface LogoProps {
  height?: number;
  mobileHeight?: number;
  name?: string;
}

const Logo = ({ name }: LogoProps) => {
  return (
    <div className="flex-shrink-0">
      <img
        src={IMAGES.logo.src}
        alt={name}
        className="object-contain transition-all duration-300"
        style={{
          width: '108px',
          height: '64.97925567626953px',
          borderRadius: '8px',
          opacity: 1,
          transform: 'rotate(0deg)',
        }}
      />
    </div>
  );
};

export default Logo;
