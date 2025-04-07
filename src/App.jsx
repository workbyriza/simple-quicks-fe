import { useState, useEffect } from 'react'
import './App.css'
import { MagnifyingGlassIcon, ArrowLeftIcon, CalendarIcon, PencilIcon } from '@heroicons/react/24/solid'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeOptions, setActiveOptions] = useState(null);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const [isTaskLoading, setIsTaskLoading] = useState(true);
  const [activeTaskOption, setActiveTaskOption] = useState(null);

  const [checkedTasks, setCheckedTasks] = useState(() => {
    const saved = localStorage.getItem("checkedTasks");
    return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
  }, [checkedTasks]);

  const toggleCheck = (taskId) => {
    setCheckedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };  

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
  
    const nonYouMessages = messages.filter(msg => msg.from !== "You");
    if (nonYouMessages.length === 0) return ""; // Kalau semua pesan dari You
  
    const lastMsg = nonYouMessages[nonYouMessages.length - 1].text;
    const words = lastMsg.split(" ");
  
    if (words.length <= 20) {
      return lastMsg;
    }
  
    return words.slice(0, 20).join(" ") + "...";
  };

  useEffect(() => {
    if (selectedMenu === "task") {
      setIsTaskLoading(true);
      const timer = setTimeout(() => {
        setIsTaskLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [selectedMenu]);

  const tasks = [
    {
      id:1,
      title: "Cross-reference with Jeanne for Case #192813",
      daysLeft: 2,
      dueDate: "2021-06-12",
      createdAt: "12/06/2021",
      description: "No Description"
    },
    {
      id:2,
      title: "Contact Andrew for Online meeting",
      daysLeft:0,
    },
    {
      id:3,
      title: "Check and Revise Homework from Andre Gonzales",
      daysLeft:0,
      dueDate:"2021-06-11",
      createdAt : "11/06/2021",
     
      description : "Homeworks needed to be checked are as follow : Clients profile"
    }
  ];
  
  return (
    <>
      <div className="w-screen min-h-screen flex items-center justify-center bg-100">
      <div className="">
        <h1 className="text-xl font-bold leading-tight text-center">
          {/* Simple<br />Quicks */}
        </h1>

        {isOpen && (
            <div className="absolute bottom-4 right-[80px] flex gap-4 items-end">
              {/* Task */}
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => handleMenuClick("task")}
              >
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

         {/* MODAL INBOX */}
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

        {/* MODAL TASK */}
        {selectedMenu === "task" && (
          <div className="absolute bottom-[80px] right-4 bg-white text-black p-6 rounded-xl shadow-xl w-[450px] h-[450px] flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              {/* Dropdown My Task */}
              <div className="relative">
                <button
                  onClick={() => setShowTaskDropdown(!showTaskDropdown)}
                  className="ml-2 bg-white border border-gray-300 text-sm px-4 py-1.5 rounded-md shadow-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  My Task
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showTaskDropdown && (
                  <div className="absolute mt-2 w-48 bg-white border rounded shadow z-10">
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 bg-white">
                      Personal Errands
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 bg-white">
                      Urgent To-Do
                    </button>
                  </div>
                )}
              </div>

              {/* New Task Button */}
              <button className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-600 transition">
                New Task
              </button>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
              {isTaskLoading ? (
                <div className="flex flex-1 flex-col items-center justify-center space-y-2">
                  <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
                  <p className="text-md font-semibold text-black-500 animate-pulse">Loading Task List...</p>
                </div>
              ) : (
                <>
                  {/* Task List */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                    {tasks.map((task, index) => {
                      const isOverdue = new Date(task.dueDate) < new Date();
                      return (
                        <div key={index} className="border-b pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <input
                              type="checkbox"
                              className="form-checkbox"
                              checked={checkedTasks.includes(task.id)}
                              onChange={() => toggleCheck(task.id)}/>
                              <span className={`font-medium ${checkedTasks.includes(task.id) ? 'line-through text-gray-400' : ''}`}>
                                {task.title}
                              </span>
                            </div>

                            {task.daysLeft !== 0 && (
                              <div className={`text-sm ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
                                {`${task.daysLeft} Day Left`}
                              </div>
                            )}

                            <div className="text-xs text-gray-400">{task.createdAt}</div>
                              <div className="relative">
                                <button
                                  className="text-gray-500 hover:text-gray-700 bg-white"
                                  onClick={() =>
                                    setActiveTaskOption(activeTaskOption === index ? null : index)
                                  }
                                >
                                  ⋯
                                </button>

                                {activeTaskOption === index && (
                                  <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-50">
                                    <button
                                      className="w-full text-left text-sm text-red-500 hover:bg-red-100 px-2 py-1 bg-white"
                                      onClick={() => handleDelete(task.id)} // misalnya ini buat delete
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          {task.description && task.description.trim() !== "" && (
                            <div className="mt-2 space-y-1 text-sm text-black-500">
                              <div className="flex items-center">
                                <DatePicker
                                  selected={new Date(task.dueDate)}
                                  onChange={(date) => handleDateChange(date, task.id)}
                                  customInput={
                                    <button className="ml-8 flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md bg-white text-sm text-gray-600 hover:bg-gray-100">
                                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                                      <span>{new Date(task.dueDate).toLocaleDateString("en-GB")}</span>
                                    </button>
                                  }
                                />
                              </div>
                              <div className="flex items-center gap-2 ml-6">
                                <PencilIcon className="w-4 h-4 text-gray-400" />
                                <span>{task.description}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  )
}

export default App
