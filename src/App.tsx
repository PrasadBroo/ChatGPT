import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import DefaultIdeas from "./components/DefaultIdea/DefaultIdeas";
import UserQuery from "./components/UserInput/UserQuery";

function App() {
  const [active, setActive] = useState(false);
  return (
    <div className="App font-poppins md:flex ">
      <Navbar active={active} setActive={setActive} />
      <div className="">
        <button
          type="button"
          className=" shadow p-2 absolute text-sm top-4 left-4 hidden md:inline-block text-gray-500"
          onClick={() => setActive(true)}
        >
          <i className="fa-regular fa-window-maximize rotate-90"></i>
        </button>
      </div>
      <div className=" p-3 flex items-center justify-between bg-[#202123] text-gray-300 md:hidden">
        <button onClick={() => setActive(true)}>
          <i className="fa-solid fa-bars text-lg"></i>
        </button>
        <h2>New chat</h2>
        <button>
          <i className="fa-solid fa-plus text-lg"></i>
        </button>
      </div>
      <main className=" max-w-2xl mx-auto md:w-3/4 px-2">
        <div className="modals md:w-1/2 relative flex items-center rounded-md justify-between mt-5 mx-auto p-1 bg-gray-200 dark:bg-[#202123] gap-2">
          <p className="gpt3 uppercase  rounded-md p-2 bg-white flex-1 flex items-center dark:bg-[#40414f] dark:text-white justify-center">
            <span className="text-green-400 mr-2 ">
              <i className="fa-solid fa-bolt "></i>
            </span>
            <span className="mr-2">gpt-3.5</span>
            <span className=" h-4 w-4 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white">
              <i className="fa-solid fa-info "></i>
            </span>
          </p>

          <p className="gpt4 uppercase rounded p-2 text-gray-400 flex-1 flex  items-center justify-center">
            <span>
              <i className="fa-solid fa-sparkles"></i>
            </span>
            <span className="mr-2">gpt-4</span>
            <span>
              <i className="fa-solid fa-lock text-sm"></i>
            </span>
          </p>
        </div>
        <div className=" h-96 flex items-start justify-center">
          <h1 className=" text-4xl font-bold mt-5 text-center text-gray-300">
            ChatGPT
          </h1>
        </div>
        <div className=" absolute left-0  right-0 bottom-0 max-w-2xl md:max-w-[calc(100% - 260px)] mx-auto ">
          <DefaultIdeas visible={false} />
          <DefaultIdeas />
          <div className="  dark:bg-inherit mx-3">
            <UserQuery />
            <p className="info text-xs py-2 text-gray-400 text-center">
              Free Research Preview. ChatGPT may produce inaccurate information
              about people, places, or facts.
              <span className=" underline">ChatGPT August 3 Version</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
