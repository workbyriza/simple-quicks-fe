import { useState } from 'react'
import './App.css'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

function App() {
  const [count, setCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMenuClick = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null); // Tutup modal kalau diklik lagi
    } else {
      setSelectedMenu(menu);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  

  return (
    <>
      <div className="w-[1200px] h-[500px] shadow-lg overflow-hidden relative text-white flex flex-col items-center justify-center">
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
          <div className="absolute bottom-[80px] right-4 bg-white text-black p-6 rounded-xl shadow-xl w-[400px] h-[400px] space-y-4 flex flex-col">
            
            {/* Search Bar */}
            {/* <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
            /> */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-4 pr-10 py-2 bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>


            {/* Content */}
            {isLoading ? (
              <p className="text-lg font-semibold animate-pulse">Loading Chats...</p>
            ) : (
              <div className="space-y-3 text-sm">
                {/* Chat 1 */}
                  <div className="flex items-start border-b pb-3 m-0">
                    {/* Profile Icon */}
                    <img
                      src="/logo.png"
                      alt="Riza"
                      className="w-10 h-10 rounded-full object-cover m-0"
                    />

                    {/* Chat Content */}
                    <div className="flex-1 text-sm ml-2">
                      <span className="font-semibold text-gray-800">
                        Project Update <span className="text-xs text-gray-500 ml-2">04/04/2025 13:45</span>
                      </span>
                      <p className="text-gray-600 pt-1">
                        <span className="font-medium">Riza:</span> Halo! Aku udah kirim filenya ya...
                      </p>
                    </div>
                  </div>
                {/* Chat 1 */}
                  <div className="flex items-start border-b pb-3 m-0">
                    {/* Profile Icon */}
                    <img
                      src="/logo.png"
                      alt="Riza"
                      className="w-10 h-10 rounded-full object-cover m-0"
                    />

                    {/* Chat Content */}
                    <div className="flex-1 text-sm ml-2">
                      <span className="font-semibold text-gray-800">
                        Project Update <span className="text-xs text-gray-500 ml-2">04/04/2025 13:45</span>
                      </span>
                      <p className="text-gray-600 pt-1">
                        <span className="font-medium">Riza:</span> Halo! Aku udah kirim filenya ya...
                      </p>
                    </div>
                  </div>
                {/* Chat 1 */}
                  <div className="flex items-start border-b pb-3 m-0">
                    {/* Profile Icon */}
                    <img
                      src="/logo.png"
                      alt="Riza"
                      className="w-10 h-10 rounded-full object-cover m-0"
                    />

                    {/* Chat Content */}
                    <div className="flex-1 text-sm ml-2">
                      <span className="font-semibold text-gray-800">
                        Project Update <span className="text-xs text-gray-500 ml-2">04/04/2025 13:45</span>
                      </span>
                      <p className="text-gray-600 pt-1">
                        <span className="font-medium">Riza:</span> Halo! Aku udah kirim filenya ya...
                      </p>
                    </div>
                  </div>

              </div>
            )}


          </div>
        )}
      </div>

    </>
  )
}

export default App
