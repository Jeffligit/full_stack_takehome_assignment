import { MouseEventHandler } from "react";

export type ButtonProps = {
    type?: 'primary' | 'success' | 'error';
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}