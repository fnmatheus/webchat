import { Inter } from 'next/font/google';
import { io, Socket } from 'socket.io-client';
import { Cookies } from 'react-cookie';
import RequestList from './Components/RequestList';
import { MouseEvent, useEffect, useState } from 'react';
import { PaperAirplaneIcon, UserCircleIcon, Bars3Icon, PlusCircleIcon } from '@heroicons/react/20/solid';
import FriendList from './Components/FriendList';
import SideBar from './Components/SibeBar';


const inter = Inter({ subsets: ['latin'] });

export default function Home() {

  const [socket, setSocket] = useState<Socket>();
  const [token, setToken] = useState<String>();
  const [friendList, setFriendList] = useState<[String]>();
  const [requestList, setRequestList] = useState<[String]>();
  const [requestInput, setRequestInput] = useState<String>();
  const [failRequest, setFailRequest] = useState<String>();
  const [sucessRequest, setSucessRequest] = useState<String>();
  const [chatOrRequest, setChatOrRequest] = useState<Boolean>(true);
  const [sideBar, setSideBar] = useState<Boolean>(false);

  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    setSocket(io('http://localhost:3001'));
    setToken(token);
  };

  useEffect(() => {
    if (socket) {
      socket.emit('login', { token });
      socket.on('friendList', async ({ friendList }) => {
        const { friends, requests
        } = friendList;
        setRequestList(requests);
        setFriendList(friends);
      });
      socket.on('requestFail', async () => {
        setFailRequest('Invalid username');
        setSucessRequest('');
      });
      socket.on('requestAlreadySent', async () => {
        setFailRequest('Your request is already sent');
        setSucessRequest('');
      });
      socket.on('requestSent', async () => {
        setFailRequest('');
        setSucessRequest('Has been sent');
      });
    }
  }, [socket, token]);

  const handleAdd = async (e: MouseEvent) => {
    e.preventDefault();
    socket?.emit('friendRequest', { requestUsername: requestInput, token });
  };

  const handleChatOrRequest = async (chatOrRequest: Boolean) => {
    setChatOrRequest(chatOrRequest);
    setSucessRequest('');
    setFailRequest('');
  }

  const handleAccept = async (requestUsername: String) => {
    socket?.emit('acceptRequest', { token, requestUsername })
  }

  const handleDecline = async() => {}

  const handleSideBar = async() => setSideBar(!sideBar);

  return (
    <main className="h-screen bg-purple-1000 text-black px-40 py-6">
      <div className="flex h-full bg-white">
        <section className="flex flex-col w-1/5 border-r-2 border-slate-200">
          <div className="flex-none h-16 bg-slate-100 p-2 relative">
            <div className="flex items-center justify-between gap-4 w-full h-full">
              <button>
                <UserCircleIcon className="h-10 w-10 text-gray-500" />
              </button>
              <button onClick={ () => handleSideBar() }>
                <Bars3Icon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            { !sideBar ? <></> : <SideBar /> }
          </div>
          <div className="flex-none h-12 p-2">
            <div className="flex items-center justify-around gap-4 w-full h-full">
              <div className={`flex items-center justify-center h-6 w-20 border-b-2 ${(!chatOrRequest) ? `border-slate-500 text-slate-700` : `border-purple-1000 text-purple-1000`} hover:border-purple-800 hover:text-purple-800`}>
                <button className="w-full h-full" onClick={ () => handleChatOrRequest(true) }>WebChats</button>
              </div>
              <div className={`flex items-center justify-center h-6 w-20 border-b-2 ${(chatOrRequest) ? `border-slate-500 text-slate-700` : `border-purple-1000 text-purple-1000`} hover:border-purple-800 hover:text-purple-800`}>
                <button className="w-full h-full" onClick={ () => handleChatOrRequest(false) }>Requests</button>
              </div>
            </div>
          </div>
          {
            (chatOrRequest)
              ? <FriendList setSearchFriendInput={ () => {} } friendList={ friendList }  />
              : <RequestList setRequestInput={ setRequestInput } handleAdd={ handleAdd } failRequest={ failRequest } sucessRequest={ sucessRequest } requestList={ requestList } handleAccept={ handleAccept } handleDecline={ handleDecline } />
          }
        </section>
        <section className="flex flex-col w-4/5">
          <div className="flex-none h-16 bg-slate-100 px-10 py-2">
            <div className="flex items-center gap-4 w-full h-full">
             <UserCircleIcon className="h-10 w-10 text-slate-500" />
             <p>Name</p>
            </div>
          </div>
          <div className="grow"></div>
          <div className="flex-none h-16 bg-slate-100 px-10 py-2">
            <div className="flex gap-4 w-full h-full">
              <input type="text" name="" id="" placeholder="Type a message" className="w-full h-full rounded-lg border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:border-0" />
              <button>
                <PaperAirplaneIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
