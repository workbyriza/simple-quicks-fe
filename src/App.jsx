import { useState } from 'react'
import './App.css'
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/react/24/solid'

function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeOptions, setActiveOptions] = useState(null);


  const handleMenuClick = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const chatData = [
    {
      id: 1,
      name: "Cameron Philips",
      subject: "109220-Naturalization",
      time: "Januari 1,2021 19:10",
      message: "Please check this out!",
      avatar: "/avatar.png",
      unread: true
    },
    {
      id: 2,
      name: "Ellen",
      subject: "Jeanette Moraima Guaman Chamba (Hutto I-589) [Hutto Follow Up - Brief Service]",
      time: "02/02/2021 10:45",
      message: "Hi please read",
      avatar: "/avatar.png",
      unread: false
    },
    {
      id: 3,
      name: "Cameron Philips",
      subject: "8405-Diana SALAZAR MUNGUIA",
      time: "01/06/2021 12:19",
      message: "I understand your initial concerns and thats ...",
      avatar: "/avatar.png",
      unread: false
    },
    {
      id: 4,
      name: "FastVisa Support",
      subject: "FastVisa Support",
      time: "01/06/2021 12:19",
      message: "Hi there, welcome to your inbox",
      avatar: "/avatar2.png",
      unread: false
    }
  ];  

  const chatMessages = {
    1: [
      { from: "Cameron Philips", text: "Please check this out!", time: "19:10" },
      { from: "You", text: "Okay, will do!", time: "19:11" }
    ],
    2: [
      { from: "Ellen", text: "Hi please read", time: "10:45" },
      { from: "You", text: "Noted!", time: "10:46" }
    ],
    3: [
      { from: "Cameron Philips", text: "I understand your initial concerns...", time: "12:19" }
    ],
    4: [
      { from: "FastVisa Support", text: "Hi there, welcome to your inbox", time: "12:19" },
      { from: "You", text: "Hi can you help me", time: "10:46" }
    ]
  };
  
  const getLastMessagePreview = (chatId) => {
    const messages = chatMessages[chatId];
    if (!messages || messages.length === 0) return "";
  
    // Filter pesan yang bukan dari "You"
    const nonYouMessages = messages.filter(msg => msg.from !== "You");
    if (nonYouMessages.length === 0) return ""; // Kalau semua pesan dari You
  
    const lastMsg = nonYouMessages[nonYouMessages.length - 1].text;
    const words = lastMsg.split(" ");
  
    if (words.length <= 20) {
      return lastMsg;
    }
  
    return words.slice(0, 20).join(" ") + "...";
  };
  
  


  return (
    <>
      <div className="w-screen min-h-screen flex items-center justify-center bg-100">
      <div className="">
        <h1 className="text-xl font-bold leading-tight text-center">
          {/* Simple<br />Quicks */}
        </h1>

        {isOpen && (
            <div className="absolute bottom-4 right-[80px] flex gap-4 items-end">
             
              {/* <div className="flex flex-col items-center">
              <span className="text-sm mt-1">Task</span>
                <img src="/task.png" alt="Task" className="w-12 h-12" />
              </div>
            
               <div className="flex flex-col items-center">
              <span className="text-sm mt-1">Inbox</span>
                <img src="/inbox.png" alt="Inbox" className="w-12 h-12" />    
              </div> */}
              {/* Task */}
              <div className="flex flex-col items-center cursor-pointer">
                <span className="text-sm mt-1">Task</span>
                <img src="/task.png" alt="Task" className="w-12 h-12" />
              </div>

              {/* Inbox */}
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleMenuClick("inbox")}
              >
                <span className="text-sm mt-1">Inbox</span>
                <img src="/inbox.png" alt="Inbox" className="w-12 h-12" />
              </div>
            </div>
          )}

          {/* LOGO BUTTON */}
          <img
            src="/logo.png"
            alt="Logo"
            onClick={() => setIsOpen(!isOpen)}
            className="w-[58px] h-[58px] absolute bottom-4 right-4 cursor-pointer transition-transform hover:scale-105"
          />

         {/* MODAL */}
         {selectedMenu === "inbox" && (
          <div className="absolute bottom-[80px] right-4 bg-white text-black p-6 rounded-xl shadow-xl w-[450px] h-[450px] flex flex-col">
            
            {isLoading ? (
              // === LOADING ===
              <div className="flex flex-1 flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
                <p className="text-md font-semibold animate-pulse">Loading Chats...</p>
              </div>
            ) : activeChat ? (
              // === ROOM CHAT ===
              <>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveChat(null)}
                  className="bg-white"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-bold text-[#2F80ED]">{activeChat.subject}</h3>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 text-sm mt-4">
              {chatMessages[activeChat.id]?.map((msg, index) => {
                const isYou = msg.from === "You";
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isYou ? 'items-end' : 'items-start'}`}
                  >
                    <p className={`font-semibold mb-1 ${isYou ? 'text-purple-600' : 'text-[#2F80ED]'}`}>
                      {msg.from}
                    </p>

                    <div className={`flex items-start gap-2 ${isYou ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Bubble Chat */}
                      <div className={`p-3 rounded-xl max-w-full ${isYou ? 'bg-[#EEDCFF]' : 'bg-gray-100'}`}>
                        <p>{msg.text}</p>
                        <p className="text-xs text-gray-500 mt-1 text-right">{msg.time}</p>
                      </div>

                      {/* Option Button (Only for You) */}
                      {isYou && (
                        <div className="relative">
                          <button
                            onClick={() => setActiveOptions(activeOptions === index ? null : index)}
                            className="text-gray-500 hover:text-gray-700 bg-white p-1 rounded-full"
                          >
                            ⋯
                          </button>
                          {activeOptions === index && (
                            <div className="absolute top-full right-0 mt-1 bg-white shadow-md z-10 w-24 bg-white border-none">
                              <button className="flex items-center px-2 py-1 text-sm w-full hover:bg-gray-100 bg-white text-blue-500">
                              Edit
                              </button>
                              <button className="flex items-center px-2 py-1 text-sm w-full hover:bg-red-100 text-red-500 bg-white">
                              Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}


              </div>
               {/* Input message section */}
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a new message"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Send
                  </button>
                </div>

              </>
            ) : (
              // === CHAT LIST ===
              <>
                <div className="relative w-full mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <div className="space-y-3 text-sm overflow-y-auto flex-1">
                  {chatData.map(chat => (
                    <div
                      key={chat.id}
                      className="flex items-start border-b pb-3 m-0 cursor-pointer"
                      onClick={() => setActiveChat(chat)}
                    >
                      <img src={chat.avatar} alt={chat.name} className="w-10 h-8 m-0" />
                      <div className="flex-1 text-sm ml-2">
                        <div className="relative w-fit">
                          <span className="font-semibold text-left text-blue-600">
                            {chat.subject}
                            <span className="text-xs text-gray-500 ml-2">{chat.time}</span>
                          </span>
                          {chat.unread && (
                            <div className="w-2 h-2 bg-red-500 rounded-full absolute top-8 -right-20"></div>
                          )}
                          <p className="text-gray-600 pt-1 text-left">
                            <span className="font-small font-semibold">{chat.name}:</span><br />
                            {getLastMessagePreview(chat.id)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        </div>
      </div>

    </>
  )
}

export default App
