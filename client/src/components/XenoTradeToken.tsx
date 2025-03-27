// import React, { useState, useEffect } from 'react';
// import dotenv from 'dotenv';
// import { ethers, JsonRpcProvider } from 'ethers'; // Corrected import
// import { Contract } from '@hashgraph/hethers';
// import {
//   Client,
//   AccountId,
//   ContractId,
// } from '@hashgraph/sdk';

// dotenv.config();

// const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';
// const CONTRACT_ABI = [
//     "event ContractPaused(bool status)",
//     "event TokensBurned(address indexed from, uint256 amount)",
//     "event TokensMinted(address indexed to, uint256 amount)",
//     "function BURNER_ROLE() view returns (bytes32)",
//     "function DEFAULT_ADMIN_ROLE() view returns (bytes32)",
//     "function MINTER_ROLE() view returns (bytes32)",
//     "function PAUSER_ROLE() view returns (bytes32)",
//     "function allowance(address owner, address spender) external view returns (uint256)",
//     "function approve(address spender, uint256 amount) external returns (bool)",
//     "function balanceOf(address account) external view returns (uint256)",
//     "function burn(uint256 amount) external onlyRole(bytes32) nonReentrant",
//     "function decimals() external view returns (uint8)",
//     "function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool)",
//     "function increaseAllowance(address spender, uint256 addedValue) external returns (bool)",
//     "function maxSupply() external view returns (uint256)",
//     "function mint(address to, uint256 amount) external onlyRole(bytes32) whenNotPaused nonReentrant",
//     "function name() external view returns (string memory)",
//     "function pauseTransfers(bool _paused) external onlyRole(bytes32)",
//     "function paused() external view returns (bool)",
//     "function setMaxSupply(uint256 _maxSupply) external onlyRole(bytes32)",
//     "function symbol() external view returns (string memory)",
//     "function totalSupply() external view returns (uint256)",
//     "function transfer(address recipient, uint256 amount) external whenNotPaused returns (bool)",
//     "function transferFrom(address sender, address recipient, uint256 amount) external whenNotPaused returns (bool)",
// ];

// const ACCOUNT_ID_ENV = process.env.REACT_APP_Account_ID;
// const PRIVATE_KEY_ENV = process.env.REACT_APP_HEX_Encoded_Private_Key;

// const XenoTradeTokenComponent: React.FC = () => {
//   const [contract, setContract] = useState<Contract | null>(null);
//   const [name, setName] = useState<string>('');
//   const [symbol, setSymbol] = useState<string>('');
//   const [totalSupply, setTotalSupply] = useState<string>('0');
//   const [balance, setBalance] = useState<string>('0');
//   const [mintAmount, setMintAmount] = useState<string>('');
//   const [burnAmount, setBurnAmount] = useState<string>('');
//   const [maxSupplyInput, setMaxSupplyInput] = useState<string>('');
//   const [pauseStatus, setPauseStatus] = useState<boolean>(false);
//   const [transferRecipient, setTransferRecipient] = useState('');
//   const [transferAmount, setTransferAmount] = useState('');
//   const [maxSupplyDisplay, setMaxSupplyDisplay] = useState('0');
//   const [error, setError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [decimals, setDecimals] = useState<number>(0);

//   const getSigner = () => {
//     const accountIdString = ACCOUNT_ID_ENV;
//     const privateKey = PRIVATE_KEY_ENV;

//     if (!accountIdString) {
//         console.error("Error: REACT_APP_Account_ID environment variable is not set.");
//         return null;
//     }

//     if (!privateKey) {
//         console.error("Error: REACT_APP_HEX_Encoded_Private_Key environment variable is not set.");
//         return null;
//     }

//     try {
//         const client = Client.forTestnet().setOperator(accountIdString, privateKey);
//         // In hethers, the client itself might act as the signer
//         return client;
//     } catch (error: any) {
//         console.error("Error creating signer:", error);
//         return null;
//     }
// }

//   useEffect(() => {
//     const initializeContract = async () => {
//       try {
//         const signer = getSigner();
//         if (!signer) {
//           setError("Could not initialize contract due to missing signer credentials.");
//           return;
//         }

//         if (CONTRACT_ADDRESS === 'YOUR_CONTRACT_ADDRESS') {
//           setError("Contract address is not set in environment variables (REACT_APP_CONTRACT_ADDRESS).");
//           return;
//         }

//         const contractId = ContractId.fromString(CONTRACT_ADDRESS);
//         const hethersContract = new Contract(contractId.toString(), CONTRACT_ABI, signer);
//         setContract(hethersContract);

//         const tokenName = await hethersContract.name();
//         const tokenSymbol = await hethersContract.symbol();
//         const total = await hethersContract.totalSupply();
//         const max = await hethersContract.maxSupply();
//         const accountIdString = ACCOUNT_ID_ENV;
//         if (accountIdString) {
//           const bal = await hethersContract.balanceOf(accountIdString);
//           setBalance(ethers.utils.formatUnits(bal, await hethersContract.decimals()));
//         } else {
//           console.warn("Account ID not available to fetch balance.");
//         }
//         const decimalsValue = await hethersContract.decimals();

//         setName(tokenName);
//         setSymbol(tokenSymbol);
//         setTotalSupply(ethers.utils.formatUnits(total, decimalsValue));
//         setMaxSupplyDisplay(ethers.utils.formatUnits(max, decimalsValue));
//         setDecimals(decimalsValue);

//       } catch (err: any) {
//         setError(`Error initializing contract: ${err.message}`);
//       }
//     };

//     initializeContract();
//   }, []);

//     const handleMint = async () => {
//         if (!contract || !mintAmount) return;
//         try {
//             const amount = ethers.utils.parseUnits(mintAmount, decimals);
//             const accountIdString = ACCOUNT_ID_ENV;
//             if (!accountIdString) {
//                 setError("Cannot mint: Account ID not available.");
//                 return;
//             }
//             const tx = await contract.mint(accountIdString, amount);
//             await tx.wait();

//             setSuccessMessage('Tokens minted successfully!');
//             const newTotalSupply = await contract.totalSupply();
//             const newBalance = await contract.balanceOf(accountIdString);

//             setTotalSupply(ethers.utils.formatUnits(newTotalSupply, decimals));
//             setBalance(ethers.utils.formatUnits(newBalance, decimals));
//             setMintAmount('');

//         } catch (error: any) {
//             setError(`Minting failed: ${error.message}`);
//         }
//     };

//   const handleBurn = async () => {
//     if (!contract || !burnAmount) return;
//     try {
//       const amount = ethers.utils.parseUnits(burnAmount, decimals);
//       const tx = await contract.burn(amount);
//       await tx.wait();
//       setSuccessMessage('Tokens burned successfully!');
//         const newTotalSupply = await contract.totalSupply();
//       setTotalSupply(ethers.utils.formatUnits(newTotalSupply, decimals));
//         setBurnAmount('');
//     } catch (err: any) {
//       setError(`Burning failed: ${err.message}`);
//     }
//   };

//   const handleSetMaxSupply = async () => {
//     if (!contract || !maxSupplyInput) return;
//     try {
//       const amount = ethers.utils.parseUnits(maxSupplyInput, decimals);
//       const tx = await contract.setMaxSupply(amount);
//       await tx.wait();
//       setSuccessMessage('Max supply updated successfully!');
//       const newMax = await contract.maxSupply();
//       setMaxSupplyDisplay(ethers.utils.formatUnits(newMax, decimals));
//         setMaxSupplyInput('');
//     } catch (err: any) {
//       setError(`Setting max supply failed: ${err.message}`);
//     }
//   };

//   const handlePauseTransfers = async () => {
//     if (!contract) return;
//     try {
//       const tx = await contract.pauseTransfers(!pauseStatus);
//       await tx.wait();
//       setPauseStatus(!pauseStatus);
//       setSuccessMessage(`Transfers ${!pauseStatus ? 'paused' : 'unpaused'} successfully!`);
//     } catch (err: any) {
//       setError(`Pausing/unpausing failed: ${err.message}`);
//     }
//   };
//     const handleTransfer = async () => {
//         if (!contract || !transferRecipient || !transferAmount) return;
//         try {
//             const amount = ethers.utils.parseUnits(transferAmount, decimals);
//             const tx = await contract.transfer(transferRecipient, amount);
//             await tx.wait();
//             setSuccessMessage('Transfer successful!');
//             const accountIdString = ACCOUNT_ID_ENV;
//             if (accountIdString) {
//                 const newBalance = await contract.balanceOf(accountIdString);
//                 setBalance(ethers.utils.formatUnits(newBalance, decimals));
//             } else {
//                 console.warn("Account ID not available to update balance after transfer.");
//             }
//             setTransferAmount('');
//             setTransferRecipient('');

//         } catch (error: any) {
//             setError(`Transfer failed: ${error.message}`);
//         }
//     };

//   return (
//     <div>
//       <h1>{name} ({symbol})</h1>
//       <p>Total Supply: {totalSupply}</p>
//       <p>Your Balance: {balance}</p>
//       <p>Max Supply: {maxSupplyDisplay}</p>

//       <div>
//         <input type="text" placeholder="Mint Amount" value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} />
//         <button onClick={handleMint}>Mint</button>
//       </div>

//       <div>
//         <input type="text" placeholder="Burn Amount" value={burnAmount} onChange={(e) => setBurnAmount(e.target.value)} />
//         <button onClick={handleBurn}>Burn</button>
//       </div>

//       <div>
//         <input type="text" placeholder="New Max Supply" value={maxSupplyInput} onChange={(e) => setMaxSupplyInput(e.target.value)} />
//         <button onClick={handleSetMaxSupply}>Set Max Supply</button>
//       </div>

//       <div>
//         <button onClick={handlePauseTransfers}>{pauseStatus ? 'Unpause Transfers' : 'Pause Transfers'}</button>
//       </div>
//         <div>
//             <input type="text" placeholder="Recipient Address" value={transferRecipient} onChange={(e) => setTransferRecipient(e.target.value)} />
//             <input type="text" placeholder="Transfer Amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} />
//             <button onClick={handleTransfer}>Transfer</button>
//         </div>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//     </div>
//   );
// };

// export default XenoTradeTokenComponent;