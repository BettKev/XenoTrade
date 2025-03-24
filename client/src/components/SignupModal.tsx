import React, { useState } from 'react';
import { useLogin } from '../contexts/LoginContext';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (email: string, password: string, name: string) => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { openLoginModal } = useLogin();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, password, name);
  };

  const switchToLogin = () => {
    onClose();
    openLoginModal();
  };

  return (
    <div className="fixed inset-0 bg-opacity-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8 max-w-6xl w-full my-4 sm:my-8">
        <div className="grid md:grid-cols-2 items-start gap-6 md:gap-10">
          <div className="hidden md:block">
            <h2 className="lg:text-4xl text-2xl font-bold lg:leading-[48px] text-slate-900">
              Join XenoTrade Today
            </h2>
            <p className="text-sm mt-6 text-slate-500 leading-relaxed">
              Create your account and start trading with our advanced platform. Access exclusive features and seamless trading experience.
            </p>
            <p className="text-sm mt-12 text-slate-500">
              Already have an account?
              <button onClick={switchToLogin} className="text-blue-600 font-medium hover:underline ml-1">
                Sign in here
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto md:ml-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold">Sign up</h3>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-slate-800 font-medium mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-800 font-medium mb-2 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-800 font-medium mb-2 block">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create Account
              </button>
            </div>

            <div className="my-4 flex items-center gap-4">
              <hr className="w-full border-slate-300" />
              <p className="text-sm text-slate-800 text-center">or</p>
              <hr className="w-full border-slate-300" />
            </div>

            <div className="space-x-6 flex justify-center">
              <button 
                type="button" 
                className="border-none outline-none"
                onClick={() => console.log('Google login clicked')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 512 512">
                  <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                  <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                  <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                  <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                  <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" />
                  <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" />
                </svg>
              </button>
              <button 
                type="button" 
                className="border-none outline-none"
                onClick={() => console.log('Facebook login clicked')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 512 512">
                  <path fill="#1877f2" d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z" />
                  <path fill="#fff" d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z" />
                </svg>
              </button>
              <button 
                type="button" 
                className="border-none outline-none"
                onClick={() => console.log('Apple login clicked')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 22.773 22.773">
                  <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z" />
                </svg>
              </button>
            </div>
          </form>

          <div className="block md:hidden text-center mt-8">
            <p className="text-sm text-slate-500">
              Already have an account?
              <button onClick={switchToLogin} className="text-blue-600 font-medium hover:underline ml-1">
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
