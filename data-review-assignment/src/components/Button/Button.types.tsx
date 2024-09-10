import { MouseEventHandler } from "react";

export type ButtonProps = {
    color?: 'blue' | 'red' | 'green'
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}