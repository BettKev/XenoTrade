import { useState, useEffect } from "react";
import { BrowserProvider, formatEther, Contract } from "ethers"; // Correct imports

declare global {
  interface Window {
    ethereum?: any;
  }
}

// List of supported networks and their tokens
const SUPPORTED_NETWORKS: Record<number, { name: string; symbol: string }> = {
  1: { name: "Ethereum", symbol: "ETH" },
  56: { name: "BSC", symbol: "BNB" },
  137: { name: "Polygon", symbol: "MATIC" },
  295: { name: "Hedera Mainnet", symbol: "HBAR" },
  296: { name: "Hedera Testnet", symbol: "HBAR" },
};

// ERC-20 token contracts for different networks
const ERC20_TOKENS: { [key: number]: { symbol: string; address: string; decimals: number }[] } = {
  1: [{ symbol: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 }],
  56: [{ symbol: "USDT", address: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 }],
  137: [{ symbol: "USDT", address: "0xE0b22E0037B130A9F56bBb537684E6fA18192341", decimals: 6 }],
  295: [], // Placeholder for Hedera tokens
  296: [], // Placeholder for Hedera tokens
};

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const useMetaMask = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balances, setBalances] = useState<{ [key: string]: string }>({});
  const [network, setNetwork] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const connect = async () => {
    if (!window.ethereum) {
      setError(new Error("MetaMask is not installed"));
      return;
    }

    try {
      const newAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccounts(newAccounts);
      setIsConnected(true);
      fetchBalances(newAccounts[0]); // Fetch balances on connection
    } catch (err) {
      setError(err as Error);
    }
  };

  const disconnect = () => {
    setAccounts([]);
    setBalances({});
    setIsConnected(false);
  };

  const fetchBalances = async (account: string) => {
    if (!window.ethereum) return;
    try {
      const provider = new BrowserProvider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      const chainIdNum = Number(chainId);

      const networkInfo = SUPPORTED_NETWORKS[chainIdNum] || { name: "Unknown", symbol: "?" };
      setNetwork(networkInfo.name);

      let newBalances: { [key: string]: string } = {};
      
      if (chainIdNum === 295 || chainIdNum === 296) {
        // Hedera balance fetching using Mirror Node API
        const response = await fetch(`https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/${account}`);
        const data = await response.json();
        newBalances["HBAR"] = (parseFloat(data.balance.balance) / 1e8).toFixed(4); // HBAR balance
      } else {
        // Fetch native token balance
        const balanceWei = await provider.getBalance(account);
        const balanceNative = parseFloat(formatEther(balanceWei)).toFixed(4);
        newBalances[networkInfo.symbol] = balanceNative;

        // Fetch ERC-20 token balances
        if (ERC20_TOKENS[chainIdNum]) {
          for (let token of ERC20_TOKENS[chainIdNum]) {
            const contract = new Contract(token.address, ERC20_ABI, provider);
            const balanceRaw = await contract.balanceOf(account);
            newBalances[token.symbol] = (parseFloat(formatEther(balanceRaw)) * 10 ** (18 - token.decimals)).toFixed(4);
          }
        }
      }

      setBalances(newBalances);
    } catch (err) {
      console.error("Failed to fetch balances:", err);
      setBalances({});
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (newAccounts: string[]) => {
        if (newAccounts.length === 0) {
          disconnect();
        } else {
          setAccounts(newAccounts);
          setIsConnected(true);
          fetchBalances(newAccounts[0]); // Update balances when account changes
        }
      });

      window.ethereum.on("chainChanged", () => {
        if (accounts.length > 0) {
          fetchBalances(accounts[0]); // Refresh balances when network changes
        }
      });
    }
  }, []);

  return { isConnected, accounts, balances, network, connect, disconnect, error };
};

export default useMetaMask;
