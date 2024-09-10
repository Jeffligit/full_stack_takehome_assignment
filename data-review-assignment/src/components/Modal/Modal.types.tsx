import { ReactNode } from "react"

export type ModalProps = {
    title: string;
    children: ReactNode;
    show: boolean;
    onClose: () => void;
}