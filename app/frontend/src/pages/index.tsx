import axios from 'axios';
import { Inter } from 'next/font/google'
import { MouseEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

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
    <main className="flex h-screen items-center justify-center text-black px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
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
                  className="relative block w-full rounded-t-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="relative block w-full rounded-b-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              { (error) ? <span>{ `${error}` }</span> : '' }
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={ (e) => handleLogin(e) }
              >
                Log in
              </button>
            </div>
            
            <div>
              <div className="text-sm">
                  <span>Don&apos;t have an account? </span>
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={ () => handleSignup() }>
                    Sign up
                  </a>
                </div>
              </div>
          </form>
        </div>
      </main>
  )
}
