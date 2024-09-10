import { ButtonProps } from "./Button.types";

export default function Button({color = 'blue', label, onClick}: ButtonProps) {

    let buttonColor = 'bg-blue-500 hover:bg-blue-400'

    switch(color) {
        case 'red':
            buttonColor = 'bg-red-500 hover:bg-red-400'
            break;
        case 'green':
            buttonColor = 'bg-green-500 hover:bg-green-400'
            break;
    }

    return (
        <button 
            onClick={onClick} 
            className={`flex h-fit w-fit ${buttonColor} rounded-md p-2 text-white font-bold`}>
            {label}
        </button>
    );
};