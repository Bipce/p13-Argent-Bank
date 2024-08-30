import React from "react";

interface IProps {
  img: string;
  title: string;
  text: string;
}

const FeatureItem: React.FC<IProps> = ({ img, title, text }) => {
  return (
    <div className="feature-item">
      <img src={img} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
};

export default FeatureItem;