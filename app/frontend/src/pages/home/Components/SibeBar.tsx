import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export default function SideBar() {
  return (
    <div className="absolute right-0 top-2/3 bg-slate-50 w-1/2 mt-2 mr-2 shadow-md">
      <button className="flex pt-2 pl-2 w-full h-10">
        Log out
      </button>
    </div>
  );
}
