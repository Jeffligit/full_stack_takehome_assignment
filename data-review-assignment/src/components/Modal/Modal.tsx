import Button from "../Button/Button";
import { ModalProps } from "./Modal.types";


export default function Modal({title, children, show, onClose} : ModalProps) {
    return(
        <div className={`${show ? 'relative': 'hidden'}`}>
            <div className="z-10 h-screen w-screen fixed flex items-center justify-center inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
                <div className="w-1/2 h-auto bg-white rounded-lg z-20 grid grid-flow-row grid-rows-8">
                    <div className="text-lg row-span-1 flex justify-center items-center font-bold m-3">
                        {title}
                    </div>
                    <div className="row-span-6 flex justify-center p-5 h-auto">
                        {children}
                    </div>
                    <div className="flex flex-row-reverse items-end py-3 px-5 row-span-1">
                        <Button
                            label="Close"
                            onClick={onClose}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};