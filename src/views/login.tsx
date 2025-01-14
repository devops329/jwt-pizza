import React, { useEffect } from 'react';
import { CloseEyeIcon, KeyIcon, EmailIcon } from '../icons';
import Button from '../components/button';
import { pizzaService } from '../service/service';
import { useBreadcrumb } from '../hooks/appNavigation';
import View from './view';
import { User } from '../service/pizzaService';

interface Props {
  setUser: (user: User) => void;
}

export default function Login(props: Props) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const navigateToParent = useBreadcrumb();
  const navigateToRegistration = useBreadcrumb('register');
  const emailRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  async function login(event: React.FormEvent) {
    event.preventDefault();
    try {
      props.setUser(await pizzaService.login(email, password));
      navigateToParent();
    } catch (error) {
      displayMessage(JSON.stringify(error));
    }
  }

  function displayMessage(msg: string) {
    setMessage(msg);
  }

  return (
    <View title="Welcome back">
      <div className="my-4 flex  justify-center items-center flex-col">
        <div className="h-4 text-yellow-200 font-normal">{message}</div>

        <form onSubmit={login}>
          <div className="flex  justify-center items-center flex-col mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  ref={emailRef}
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="py-3 ps-11 pe-4 block w-full bg-white/10 border-white/20 text-white placeholder:text-white rounded-lg text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                  placeholder="Email address"
                />
                <div className="text-orange-500 absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                  <EmailIcon />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  required
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-3 ps-11 pe-4 block w-full bg-white/10 border-white/20 text-white placeholder:text-white rounded-lg text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                  placeholder="Password"
                />
                <button type="button" data-hs-toggle-password='{"target": "#password"}' className="text-neutral-400 absolute top-0 end-0 p-3 sm:p-4">
                  <CloseEyeIcon />
                </button>

                <div className="text-orange-500 absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                  <KeyIcon />
                </div>
              </div>
            </div>

            <div className="flex flex-row mt-8">
              <Button title="Login" submit onPress={() => {}} />
            </div>
            <div className="text-white italic">
              Are you new?{' '}
              <span className="underline hover:text-orange-400" onClick={navigateToRegistration}>
                Register
              </span>{' '}
              instead.
            </div>
          </div>
        </form>
      </div>
    </View>
  );
}
