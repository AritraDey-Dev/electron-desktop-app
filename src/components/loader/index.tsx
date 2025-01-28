import React from 'react';

type LoaderProps = {
  color?: string; // Optional prop to customize the color of the loader
  size?: number; // Optional prop to customize the size of the loader
};

const Spinner: React.FC<LoaderProps> = ({ color = '#3498db', size = 50 }) => {
  const loaderStyle: React.CSSProperties = {
    width: size,
    height: size,
    border: `${size / 8}px solid ${color}`,
    borderTop: `${size / 8}px solid transparent`,
  };

  return (
    <div
      style={loaderStyle}
      className="loader"
    />
  );
};

export default Spinner;
