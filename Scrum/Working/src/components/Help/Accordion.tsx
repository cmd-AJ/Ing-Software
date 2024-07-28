import { useState } from "react";
import './accordion.css';
import plusIcon from "./assets/icon-plus.svg";
import minusIcon from "./assets/icon-minus.svg";

interface AccordionProps {
  title: string;
  description: string;
}

function Accordion({ title, description }: AccordionProps) {
  const [isActive, setActive] = useState(false);
  const handleClick = () => setActive(!isActive);
  return (
    <>
      <div className="accordion__item">
        <div className="accordion__title-wrapper" onClick={handleClick}>
          <h2 className="accordion__title">{title}</h2>
          <img src={isActive ? minusIcon : plusIcon} alt="Toggle icon" />
        </div>
        {isActive && <p className="accordion__description">{description}</p>}
      </div>
    </>
  );
}

export default Accordion;
