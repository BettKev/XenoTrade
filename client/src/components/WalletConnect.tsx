import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Supported Hedera networks
const SUPPORTED_NETWORKS: Record<number, { name: string; symbol: string }> = {
  295: { name: "Hedera Mainnet", symbol: "HBAR" },
  296: { name: "Hedera Testnet", symbol: "HBAR" },
};

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

      if (!(chainIdNum in SUPPORTED_NETWORKS)) {
        setError(new Error("Unsupported network. Please switch to Hedera Testnet or Mainnet."));
        return;
      }

      setNetwork(SUPPORTED_NETWORKS[chainIdNum].name);

      let newBalances: { [key: string]: string } = {};

      // Fetch HBAR balance from Hedera Mirror Node
      const response = await fetch(`https://testnet.mirrornode.hedera.com/api/v1/accounts/${account}`);
      const data = await response.json();
      newBalances["HBAR"] = (parseFloat(data.balance.balance) / 1e8).toFixed(4); // Convert Tinybars to HBAR

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
