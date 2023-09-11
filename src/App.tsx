import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import DefaultIdeas from "./components/DefaultIdea/DefaultIdeas";
import UserQuery from "./components/UserInput/UserQuery";
import GptIntro from "./components/Ui/GptIntro";

function App() {
  const [active, setActive] = useState(false);
  return (
    <div className="App font-poppins md:flex ">
      <Navbar active={active} setActive={setActive} />
      <div className="">
        <button
          type="button"
          className="shadow p-2 absolute text-sm top-4 left-4 hidden md:inline-block text-gray-500 dark:border border-gray-400 rounded-md"
          onClick={() => setActive(true)}
        >
          <i className="fa-regular fa-window-maximize rotate-90"></i>
        </button>
      </div>
      <div className="p-3 flex items-center justify-between bg-[#202123] text-gray-300 md:hidden">
        <button onClick={() => setActive(true)}>
          <i className="fa-solid fa-bars text-lg"></i>
        </button>
        <h2>New chat</h2>
        <button>
          <i className="fa-solid fa-plus text-lg"></i>
        </button>
      </div>
      <main className="max-w-2xl mx-auto md:w-3/4 px-2">
        <GptIntro />
        <div className="absolute left-0 px-2  right-0 bottom-0 max-w-2xl md:max-w-[calc(100% - 260px)] mx-auto ">
          <DefaultIdeas visible={false} />
          <DefaultIdeas />
          <div className="  dark:bg-inherit">
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
