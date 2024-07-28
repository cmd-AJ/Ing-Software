import "./Help.css";
import starIcon from "../components/Help/assets/icon-star.svg"
import Attribution from "../components/Help/Attribution";
import Accordion from "../components/Help/Accordion";
import data from "../components/Help/data";
function Help() {
  return (
    <>
      <div className="container">
        <div className="accordion">
          <h1 className="accordion__heading">
            <img className="accordion__image" src={starIcon} alt="" />
            FAQs
          </h1>
          {data.map((item) => (
            <Accordion title={item.question} description={item.answer} />
          ))}
        </div>

      </div>
    </>
  );
}

export default Help;