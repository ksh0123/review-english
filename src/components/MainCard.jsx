import { Link } from "react-router-dom";

const MainCard = ({ day, title }) => {
  return (
    <Link to={`/${day}`}>
      <li className="rounded-xl bg-purple-300 p-4 mb-5 shadow-lg shadow-yellow-300/50 border border-slate-500 hover:bg-purple-400 hover:animate-bounce duration-70">
        <h1 className="first-line:mt-1 font-bold text-sm text-neutral-100 inline-block">
          Day {day}
        </h1>
        <p className="text-xl font-extrabold text-purple-950 ">{title}</p>
      </li>
    </Link>
  );
};

export default MainCard;
