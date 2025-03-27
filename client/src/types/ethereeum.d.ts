import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum?: ExternalProvider & {
      isMetaMask?: true;
      on: (...args: any[]) => void;
      removeListener: (...args: any[]) => void;
      request: (...args: any[]) => Promise<any>;
    };
  }
}