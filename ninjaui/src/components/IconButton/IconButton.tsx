import React, { FC } from 'react';
import './IconButton.css';

interface Props {
    icon: string;
    onClick(): void;
    alt: string;
    className?: string;
}
export const IconButton: FC<Props> = ({ icon, onClick, alt, className }) => <button className={`icon-button ${className}`} onClick={onClick}><img src={icon} alt={alt} /></button>;
