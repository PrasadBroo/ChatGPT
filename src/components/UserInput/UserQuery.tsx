
export default function UserQuery() {
  return (
    <form className="input shadow-md dark:bg-[#40414f] p-2 border dark:border-none flex items-center   rounded-md">
      <div className="w-11/12">
        <textarea
          name="query"
          className="h-6 px-2  w-full outline-none resize-none dark:bg-transparent dark:text-white"
          placeholder="Send a message"
        ></textarea>
      </div>
      <div className=" w-1/12 text-center">
        <button type="submit" className=" text-center text-gray-400 ">
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
}
