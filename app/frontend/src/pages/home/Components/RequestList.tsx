import { Inter } from 'next/font/google';

import { PlusCircleIcon, CheckCircleIcon, XCircleIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { IRequestListProps } from '@/interfaces';


const inter = Inter({ subsets: ['latin'] });

export default function RequestList(props: IRequestListProps) {
  return (
    <main>
      <div className="flex-none h-18 p-2">
        <div className="flex items-center gap-4 w-full h-8">
          <input type="text" name="" id="" placeholder="Send friend request" className="w-full h-full rounded-lg border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:border-0" onChange={(e) => props.setRequestInput(e.target.value)} />
          <button onClick={ (e) => props.handleAdd(e) }>
            <PlusCircleIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        { <span className='text-xs text-red-600'>{ props.failRequest }</span> }
        { <span className='text-xs text-lime-500' >{ props.sucessRequest }</span> }
      </div>
      <div>
        {
          !props.requestList
            ? <></>
            : props.requestList.map((request, i) => (
              <div className="flex p-2 w-full justify-between" key={i}>
                <div className="flex items-center">
                  <UserCircleIcon className="h-10 w-10 text-gray-500 mr-2" />
                  <p>{ request }</p>
                </div>
                <div className="flex items-center">
                  <button onClick={ () => props.handleAccept(request) } className="mr-1">
                    <CheckCircleIcon className="h-8 w-8 text-lime-500" />
                  </button>
                  <button onClick={ () => props.handleDecline() } className="ml-1">
                    <XCircleIcon className="h-8 w-8 text-red-600" />
                  </button>
                </div>
              </div>
            ))
        }
      </div>
    </main>
  );
}
