import MainCard from "../components/MainCard";
import englishData from "../englishData.json";

console.log(englishData);

const Main = () => {
  return (
    <div className="bg-purple-100 font-jalnan">
      <div className="min-h-screen max-w-screen-md mx-auto px-8 pt-20">
        <h1 className="text-center text-5xl font-extrabold mb-20 text-purple-500 bg-yellow-100 rounded-xl p-5 shadow-xl shadow-violet-200 border border-slate-500">
          ✨ Study English ✨
        </h1>
        <ul>
          {englishData.map((v, i) => (
            <MainCard key={1} day={v.day} title={v.title} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
