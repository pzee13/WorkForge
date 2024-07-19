import React, { useState } from "react";


const ChatBox: React.FC = () => {
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-center">
        <div className="md:w-2/3 lg:w-1/2 xl:w-1/3">
          <button onClick={toggleShow} className="w-full py-2 bg-customGreen text-white text-center items-center text-lg rounded-lg">
            <div className="flex justify-between text-center items-center">
              <span className="text-center">Any queries? chat</span>
              <i className="fas fa-chevron-down"></i>
            </div>
          </button>
          <div className={`mt-3 ${showShow ? '' : 'hidden'}`}>
            <div id="chat4" className="bg-white rounded-lg shadow-lg">
              <div style={{ position: "relative", height: "400px" }} className="overflow-y-scroll">
                <div className="p-4">
                  <div className="flex justify-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="p-2 mb-1 rounded-lg bg-gray-200">Hi</p>
                      <p className="p-2 mb-1 rounded-lg bg-gray-200">How are you ...???</p>
                      <p className="p-2 mb-1 rounded-lg bg-gray-200">What are you doing tomorrow? Can we come up a bar?</p>
                      <p className="text-xs text-gray-500">23:58</p>
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <p className="text-center text-gray-400">Today</p>
                  </div>

                  <div className="flex justify-end mb-4">
                    <div className="mr-3">
                      <p className="p-2 mb-1 text-white rounded-lg bg-blue-500">Hiii, I'm good.</p>
                      <p className="p-2 mb-1 text-white rounded-lg bg-blue-500">How are you doing?</p>
                      <p className="p-2 mb-1 text-white rounded-lg bg-blue-500">Long time no see! Tomorrow office. will be free on Sunday.</p>
                      <p className="text-xs text-gray-500">00:06</p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>

                  <div className="flex justify-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="p-2 mb-1 rounded-lg bg-gray-200">Okay</p>
                      <p className="p-2 mb-1 rounded-lg bg-gray-200">We will go on Sunday?</p>
                      <p className="text-xs text-gray-500">00:07</p>
                    </div>
                  </div>

                  <div className="flex justify-end mb-4">
                    <div className="mr-3">
                      <p className="p-2 mb-1 text-white rounded-lg bg-blue-500">That's awesome!</p>
                      <p className="p-2 mb-1 text-white rounded-lg bg-blue-500">I will meet you Sandon Square sharp at 10 AM</p>
                      <p className="p-2 mb-1 text-white rounded-lg bg-blue-500">Is that okay?</p>
                      <p className="text-xs text-gray-500">00:09</p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>

                  <div className="flex justify-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="p-2 mb-1 rounded-lg bg-gray-200">Okay i will meet you on Sandon Square</p>
                      <p className="text-xs text-gray-500">00:11</p>
                    </div>
                  </div>

                  <div className="flex justify-end mb-4">
                    <div className="mr-3">
                      <p className="p-2 mb-1 text-white rounded-lg bg-blue-500">Do you have pictures of Matley Marriage?</p>
                      <p className="text-xs text-gray-500">00:11</p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>

                  <div className="flex justify-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="p-2 mb-1 rounded-lg bg-gray-200">Sorry I don't have. i changed my phone.</p>
                      <p className="text-xs text-gray-500">00:13</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="mr-3">
                      <p className="p-2 mb-1 text-white rounded-lg bg-blue-500">Okay then see you on Sunday!!</p>
                      <p className="text-xs text-gray-500">00:15</p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 flex items-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                  alt="avatar 3"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <input
                  type="text"
                  className="flex-1 border-0 focus:ring-0"
                  placeholder="Type message"
                />
                <a className="ml-2 text-gray-500" href="#!">
                  <i className="fas fa-paperclip"></i>
                </a>
                <a className="ml-3 text-gray-500" href="#!">
                  <i className="fas fa-smile"></i>
                </a>
                <a className="ml-3 text-blue-500" href="#!">
                  <i className="fas fa-paper-plane"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;