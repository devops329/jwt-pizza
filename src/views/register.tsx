import React, { useEffect } from 'react';
import { KeyIcon, CloseEyeIcon, PersonIcon, EmailIcon } from '../icons';
import Button from '../components/button';
import { pizzaService } from '../service/service';
import { useBreadcrumb } from '../hooks/appNavigation';
import View from './view';
import { User } from '../service/pizzaService';

interface Props {
  setUser: (user: User) => void;
}

export default function Register(props: Props) {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const navigateToParentPath = useBreadcrumb();
  const navigateToLogin = useBreadcrumb('login');
  const nameRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  async function register(event: React.FormEvent) {
    event.preventDefault();
    try {
      props.setUser(await pizzaService.register(name, email, password));
      navigateToParentPath();
    } catch (error) {
      displayMessage(JSON.stringify(error));
    }
  }

  function displayMessage(msg: string) {
    setMessage(msg);
  }

  return (
    <View title="Welcome to the party">
      <div className="my-4 flex  justify-center items-center flex-col">
        <div className="h-4 text-yellow-200 font-normal">{message}</div>

        <form onSubmit={register}>
          <div className="flex  justify-center items-center flex-col mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <input
                  type="name"
                  value={name}
                  ref={nameRef}
                  autoComplete="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="py-3 ps-11 pe-4 block w-full bg-white/10 border-white/20 text-white placeholder:text-white rounded-lg text-sm focus:border-white/30 focus:ring-white/30 sm:p-4 sm:ps-11"
                  placeholder="Full name"
                />
                <div className="text-orange-500 absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                  <PersonIcon />
                </div>
              </div>
            </div>
            <div className="relative">
              <input
                type="email"
                value={email}
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
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  autoComplete="new-password"
                  required
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
              <Button title="Register" submit onPress={() => {}} />
            </div>
            <div className="text-white italic">
              Already have an account?{' '}
              <span className="underline hover:text-orange-400" onClick={navigateToLogin}>
                Login
              </span>{' '}
              instead.
            </div>
          </div>
        </form>
      </div>
    </View>
  );
}
