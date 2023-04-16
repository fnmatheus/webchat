import { Inter } from 'next/font/google';
import { io, Socket } from 'socket.io-client';
import { Cookies } from 'react-cookie';
import { MouseEvent, useEffect, useState } from 'react';
import { PaperAirplaneIcon, UserCircleIcon, Bars3Icon, PlusCircleIcon } from '@heroicons/react/20/solid';


const inter = Inter({ subsets: ['latin'] });

export default function Home() {

  const [socket, setSocket] = useState<Socket>();
  const [token, setToken] = useState<String>();
  const [friendList, setFriendList] = useState<[String]>();
  const [requestList, setRequestList] = useState<[String]>();
  const [requestInput, setRequestInput] = useState<String>();
  const [failRequest, setFailRequest] = useState<String>();
  const [sucessRequest, setSucessRequest] = useState<String>();

  useEffect(() => { socketInitializer(); }, []);

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

  return (
    <main className="h-screen bg-indigo-700 px-40 py-6">
      <div className="flex h-full bg-white">
        <section className="flex flex-col w-1/5 border-r-2 border-slate-200">
          <div className="flex-none h-16 bg-slate-100 p-2">
            <div className="flex items-center justify-between gap-4 w-full h-full">
              <button>
                <UserCircleIcon className="h-10 w-10 text-gray-500" />
              </button>
              <button>
                <Bars3Icon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex-none h-12 p-2 border-b-2">
            <div className="flex items-center gap-4 w-full h-full">
              <input type="text" name="" id="" placeholder="Send friend request" className="w-full h-full rounded-lg border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:border-0" onChange={(e) => setRequestInput(e.target.value)} />
              <button onClick={ (e) => handleAdd(e) }>
                <PlusCircleIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            { <span className='c'>{ failRequest }</span> }
            { <span>{ sucessRequest }</span> }
          </div>
          <div>
            { !requestList ? <></> : requestList.map((request, i) => <p key={i}>{ request }</p>) }
            { !friendList ? <></> : friendList.map((friend, i) => <p key={i}>{ friend }</p>) }
          </div>
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
