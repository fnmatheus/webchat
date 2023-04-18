import axios from 'axios';
import { Inter } from 'next/font/google'
import { MouseEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../images/logo.svg';
import women from '../images/women.svg';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [error, setError] = useState<String>();
  const [_cookies, setCookie] = useCookies(['token']);

  const handleLogin = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const expires = new Date();
      expires.setDate(expires.getTime() + 1);
      setCookie('token', response.data, { path: '/',  expires});
      router.push('/home');
    } catch (error) {
      setError('Wrong User or Password');
    }
  };

  const handleSignup = () => router.push('/signup');

  return (
    <main className="flex h-screen items-center justify-center text-black">
      <div className="flex items-center justify-center h-full w-3/5 overflow-hidden">
        <div className="bg-purple-800 w-3/5 h-full absolute"></div>
        <Image src={ women } alt="women" />
      </div>
      <div className="flex items-center justify-center h-full w-2/5">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center items-center">
            <Image className="h-16 w-16" src={ logo } alt="logo" />
            <h2 className="text-center text-3xl font-bold text-purple-1000">
              WebChat
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-purple-1000 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-purple-1000 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {
                (!error)
                  ? <></> 
                  : <span className="text-xs text-red-500">{ `${error}` }</span>
              }
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-purple-1000 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-purple-1000"
                onClick={ (e) => handleLogin(e) }
              >
                Log in
              </button>
            </div>
            
            <div>
              <div className="text-sm">
                  <span>Don&apos;t have an account? </span>
                  <a href="#" className="font-medium text-purple-1000 hover:text-purple-600" onClick={ () => handleSignup() }>
                    Sign up
                  </a>
                </div>
              </div>
          </form>
        </div>
      </div>
    </main>
  )
}
