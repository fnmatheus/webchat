import { Inter } from 'next/font/google';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { IFriendListProps } from '@/interfaces';


const inter = Inter({ subsets: ['latin'] });

export default function FriendList(props: IFriendListProps) {
  return (
    <main>
      <div className="flex-none h-18 p-2">
        <div className="flex items-center gap-4 w-full h-8">
          <input type="text" name="" id="" placeholder="Search friend" className="w-full h-full rounded-lg border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:border-0" onChange={(e) => props.setSearchFriendInput(e.target.value)} />
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
        </div>
      </div>
      <div>
      { !props.friendList ? <></> : props.friendList.map((friend, i) => <p key={i}>{ friend }</p>) }
      </div>
    </main>
  );
}
