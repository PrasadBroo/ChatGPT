export default function GptIntro() {
  return (
    <>
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
    </>
  );
}
