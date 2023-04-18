import axios from 'axios';
import { Inter } from 'next/font/google';
import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function SignUp() {
  const router = useRouter();

  const [email, setEmail] = useState<String>();
  const [username, setUsername] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [error, setError] = useState<String>();
  const [sucess, setSucess] = useState<String>();

  const handleSignup = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/signup',
        JSON.stringify({ email, username, password }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      setSucess('The account has been registred');
      setError(undefined);
    } catch (error) {
      setError('Invalid username, email or password');
      setSucess(undefined);
    }
  };

  const handleLogin = () => router.push('/');

  return (
    <main className="flex h-screen  min-h-full items-center justify-center text-black px-4 py-12 sm:px-6 lg:px-8">
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
                  className="relative block w-full rounded-t-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="current-password"
                  required
                  className="relative block w-full border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
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
              { (error) ? <span>{ error }</span> : <></> }
              { (sucess) ? <span>{ sucess }</span> : <></> }
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={ (e) => handleSignup(e) }
              >
                Sign up
              </button>
            </div>
            
            <div>
              <div className="text-sm">
                  <span>Have an account? </span>
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={ () => handleLogin() }>
                    Log in
                  </a>
                </div>
              </div>
          </form>
        </div>
      </main>
  )
}
