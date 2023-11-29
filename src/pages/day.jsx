import { useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import axios from "axios";

const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { day } = useParams();

  const onClickNext = () => {
    currentPage === dailyData.sentences.length - 1
      ? setCurrentPage(0)
      : setCurrentPage(currentPage + 1);

    setIsVisible(false);
  };

  const onClickPrev = () => {
    currentPage === 0
      ? setCurrentPage(dailyData.sentences.length - 1)
      : setCurrentPage(currentPage - 1);

    setIsVisible(false);
  };

  const onClickSound = async () => {
    try {
      setIsLoading(true);
      if (isLoading) return;

      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_API_KEY}`,
        {
          input: {
            text: dailyData.sentences[currentPage].english,
          },
          voice: {
            languageCode: "en-US",
            name: "en-US-News-L",
            ssmlGender: "FEMALE",
          },
          audioConfig: {
            audioEncoding: "MP3",
          },
        }
      );

      const binaryData = atob(response.data.audioContent);

      const byteArray = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([byteArray.buffer], { type: "audio/mp3" });
      const newAudio = new Audio(URL.createObjectURL(blob));
      document.body.appendChild(newAudio);
      newAudio.play();

      setTimeout(() => setIsLoading(false), 3000);
    } catch (error) {
      console.error(error);
      setTimeout(false);
    }
  };

  useEffect(() => {
    setDailyData(englishData[+day - 1]);
  }, [day]);

  useEffect(() => console.log(dailyData), [dailyData]);

  if (!dailyData) return <div>Loading...</div>;

  return (
    <div className="container relative">
      <Link to="/" className="absolute top-0 left-0 p-8">
        <IoChevronBackCircleOutline className="scale-150" />
      </Link>
      <h1 className="text-center text-2xl font-semibold border-b-2">
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
          <button className="btn-style ml-2" onClick={onClickSound}>
            Sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day;
