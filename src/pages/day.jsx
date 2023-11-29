import { useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { day } = useParams();

  const onClickNext = () => {
    currentPage === dailyData.sentences.length - 1
      ? setCurrentPage(0)
      : setCurrentPage(currentPage + 1);
  };

  const onClickPrev = () => {
    currentPage === 0
      ? setCurrentPage(dailyData.sentences.length - 1)
      : setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setDailyData(englishData[+day - 1]);
  }, [day]);

  useEffect(() => console.log(dailyData), [dailyData]);

  if (!dailyData) return <div>Loading...</div>;

  return (
    <div className="container relatives">
      <div className="absolute top-0 left-0 p-8">
        <Link to="/">
          <IoChevronBackCircleOutline className=" scale-150" />
        </Link>
      </div>
      <h1 className="text-center text-2xl font-semibold font-jalnan">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mt-12 whitespace-pre-line ">
        <div>{dailyData.sentences[currentPage].english}</div>
        <div
          className={`${!isVisible && "bg-black"}`}
          onClick={() => setIsVisible(!isVisible)}
        >
          {dailyData.sentences[currentPage].korean}
        </div>
        <div className="mt-4">
          <button className="btn-style" onClick={onClickPrev}>
            Prev
          </button>
          <button className="btn-style ml-2" onClick={onClickNext}>
            Next
          </button>
          <button className="btn-style ml-2">Sound</button>
        </div>
      </div>
    </div>
  );
};

export default Day;
