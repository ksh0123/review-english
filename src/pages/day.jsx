import { useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";

const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { day } = useParams();

  useEffect(() => {
    setDailyData(englishData[+day - 1]);
  }, [day]);

  useEffect(() => console.log(dailyData), [dailyData]);

  if (!dailyData) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 className="text-center text-2xl font-semibold">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mt-12 whitespace-pre-line">
        <div>{dailyData.sentences[currentPage].english}</div>
        <div
          className={`${!isVisible && "bg-black"}`}
          onClick={() => setIsVisible(!isVisible)}
        >
          {dailyData.sentences[currentPage].korean}
        </div>
        <div className="mt-4">
          <button className="btn-style">Prev</button>
          <button className="btn-style ml-2">Next</button>
          <button className="btn-style ml-2">Sound</button>
        </div>
      </div>
    </div>
  );
};

export default Day;
