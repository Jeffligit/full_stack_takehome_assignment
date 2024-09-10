import { ButtonProps } from "./Button.types";

export default function Button({type, label, onClick}: ButtonProps) {
    
    let buttonColor = 'blue';

    switch(type) {
        case 'success':
            buttonColor = 'green';
            break;
        case 'error':
            buttonColor = 'red';
            break;
    };

    return (
        <button 
            onClick={onClick} 
            className={`flex h-fit w-fit bg-${buttonColor}-400 hover:bg-${buttonColor}-300 p-2 rounded-md text-white font-bold`}>
            {label}
        </button>
    );
};