import React from 'react';
import './arrow.scss';

type arrowProps = {
    isVisible: boolean;
    direction: 'left' | 'right';
    handleClick: () => void;
}

const Arrow = ({ isVisible = false, direction, handleClick }: arrowProps) => (
    <div className={`arrow ${direction} ${isVisible ? "" : 'hidden'}`} onClick={handleClick} />
)

export default Arrow