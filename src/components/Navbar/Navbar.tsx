import classnames from "classnames";
import ChatHistory from "./ChatHistory";
export default function Navbar({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (v: boolean) => void;
}) {
  const navClass = classnames(
    " absolute left-0 bottom-0 top-0  md:flex-grow-1 w-9/12 md:w-[260px] bg-[#202123] text-white z-10 p-2 flex flex-col transition duration-500",
    { "translate-x-0": active, "-translate-x-[150%]": !active }
  );
  const navWrapClass = classnames(
    "navwrap absolute duration-500 top-0 left-0 bottom-0 right-0 z-30 bg-gray-500 md:bg-opacity-0 ",
    { "bg-opacity-60 ": active, "opacity-0 pointer-events-none": !active }
  );
  return (
    <>
      <div className={navWrapClass}>
        <nav className={navClass}>
          <div className="flex mb-2  items-center justify-between gap-2">
            <button
              type="button"
              className=" border border-gray-500 p-2 w-full  md:w-auto  rounded-md text-left flex-grow"
            >
              <span className="mr-2">
                <i className="fa-solid fa-plus"></i>
              </span>
              New chat
            </button>
            <button
              type="button"
              className="border h-10 w-10 border-gray-500 rounded-md p-2 hidden md:inline-block text-gray-200"
              onClick={() => setActive(false)}
            >
              <i className="fa-regular fa-window-maximize rotate-90"></i>
            </button>
          </div>
          <div className="history overflow-y-auto flex-grow pl-2">
            {[...Array(5)].map((_, i) => (
              <ChatHistory key={i} />
            ))}
          </div>
          <div className="account absolute left-0 font-bold right-0 bottom-0 text-sm z-20 bg-[#202123] border-y border-gray-500 shadow  ">
            <div className="px-2 py-2 flex items-center">
              <span className="p-2 inline-block">
                <i className="fa-regular fa-user"></i>
              </span>
              <button className="p-2 inline-block">Upgrade to Plus</button>
              <span className=" uppercase text-black p-1 rounded ml-auto text-sm inline-block bg-orange-200">
                new
              </span>
            </div>
            <div className="px-2 py-2 flex items-center ">
              <div className="h-10 w-10 rounded bg-blue-700 inline-block mr-2"></div>

              <span className="p-2">T-Series</span>
              <button className=" ml-auto  text-gray-400">
                <i className="fa-solid fa-ellipsis"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActive(false)}
            className="close md:hidden absolute top-2 h-10 w-10 border-2 -right-10  p-2 flex items-center justify-center"
          >
            <span className=" text-xl ">
              <i className="fa-solid fa-xmark"></i>
            </span>
          </button>
        </nav>
      </div>
    </>
  );
}
