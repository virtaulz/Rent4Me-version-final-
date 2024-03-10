'use client';

import { IconType } from "react-icons";

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ 
    label, 
    onClick, 
    disabled = false, 
    outline = false,
    small = false,
    icon: Icon,
  }) => {
  return ( 
<button
  disabled={disabled}
  onClick={onClick}
  className={`
    relative
    ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
    transition
    w-full
    shadow-md
    ${outline ? 'bg-white' : 'bg-black'}
    ${outline ? 'text-black' : 'text-white'}
    ${small ? 'text-sm py-1 font-light' : 'text-md py-4 font-semibold'}
  `}
>
{Icon ? (
  <Icon size={30} className="absolute left-4 top-3" />
) : null}
{label}
    </button>
   );
}
 
export default Button;
