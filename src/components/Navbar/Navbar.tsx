export default function Navbar() {
  return (
    <nav className=" absolute left-0 bottom-0 top-0 w-9/12 bg-[#202123] text-white z-10 p-2 flex flex-col -translate-x-full transition">
      <div className="flex mb-2 items-center justify-between">
        <button
          type="button"
          className=" border border-gray-500 p-2 w-full md:w-auto  rounded text-left"
        >
          <span className="mr-2">
            <i className="fa-solid fa-plus"></i>
          </span>
          New chat
        </button>
        <button
          type="button"
          className="border border-gray-500 p-2 hidden md:inline-block"
        >
          <i className="fa-solid fa-sliders"></i>
        </button>
      </div>
      <div className="history overflow-y-auto flex-grow">
        <div className="my-4 text-[#ECECF1]">
          <h3 className=" text-xl my-2 text-[#8E8EA0]">Previous 7 days</h3>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            <span>Lorem ipsum dolor sit amet.</span>
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div className="my-4 text-[#ECECF1]">
          <h3 className=" text-xl my-2 text-[#8E8EA0]">Previous month</h3>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div className="my-4 text-[#ECECF1]">
          <h3 className=" text-xl my-2 text-[#8E8EA0]">Previous 7 days</h3>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div className="my-4 text-[#ECECF1]">
          <h3 className=" text-xl my-2 text-[#8E8EA0]">Previous 7 days</h3>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div className="my-4 text-[#ECECF1]">
          <h3 className=" text-xl my-2 text-[#8E8EA0]">Previous 7 days</h3>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
          <p className=" text-base my-4">
            <span className="mr-2">
              <i className="fa-regular fa-message"></i>
            </span>
            Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
      <div className="account absolute left-0 right-0 bottom-0 z-20 bg-[#202123] border-y border-gray-500 shadow  ">
        <div className="px-2 py-3 flex items-center">
          <span className="p-2 inline-block">
            <i className="fa-regular fa-user"></i>
          </span>
          <span className="p-2 inline-block">Upgrade to Plus</span>
          <span className=" uppercase text-black p-1 rounded ml-auto inline-block bg-orange-200">
            new
          </span>
        </div>
        <div className="px-2 py-3 flex items-center ">
          <div className="h-10 w-10 rounded bg-blue-700 inline-block mr-2"></div>

          <span className="p-2">T-Series</span>
          <span className=" ml-auto text-lg text-gray-400">
            <i className="fa-solid fa-ellipsis"></i>
          </span>
        </div>
      </div>
      <div className="close absolute top-5 border-2 -right-10  p-2">
        <span className=" text-xl ">
          <i className="fa-solid fa-xmark"></i>{" "}
        </span>
      </div>
    </nav>
  );
}
