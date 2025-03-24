# XenoTrade: AI-Driven Tokenized Trading Platform

XenoTrade is an AI-powered platform that enables retail investors in Kenya to trade tokenized assets of NSE-listed companies. Built on the Hedera Blockchain and MERN stack, it offers real-time analytics, low transaction costs, and automated trading strategies.

## Features
- **AI-Powered Insights**: Predictive analytics, risk management, and automated trading using AI models.
- **Tokenized Assets**: Trade tokenized shares of NSE-listed companies.
- **Hedera Blockchain**: Fast, secure, and energy-efficient infrastructure.
- **User-Friendly Interface**: React-based Progressive Web App (PWA) for seamless trading.
- **Regulatory Compliance**: Integrated KYC/AML APIs for secure transactions.

## System Architecture
The platform consists of:
1. **Frontend**: React + Vite PWA with Web3.js and Hedera SDK.
2. **Backend**: Node.js with Express.js for API handling and MongoDB for data storage.
3. **AI Agents**: NLP, ML, and Reinforcement Learning models for trading insights and automation.
4. **Blockchain Layer**: Hedera Smart Contracts for tokenization and trade settlement.
5. **External APIs**: NSE Market Data, Mpesa Payment Gateway, and Sentiment Analysis APIs.

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Hedera Account
- NSE Market Data API access

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/BettKev/XenoTrade.git
   cd XenoTrade
   ```

2. Install dependencies for the client:
   ```bash
   cd client
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Setup
1. Copy the example environment file:
   ```bash
   cp client/.env.example client/.env
   ```

2. Update the environment variables in `client/.env` with your actual API keys.

> **Important**: Never commit `.env` files containing real API keys. Only commit `.env.example` with placeholder values.

### Building for Production
To build the client for production:
```bash
npm run build
```

### Linting
Run ESLint to check for code quality:
```bash
npm run lint
```

## Git Push Issues

If you encounter a blocked push, follow these steps:

1. **Fetch Latest Changes**
   ```bash
   git fetch origin
   ```

2. **Check for Conflicts**
   ```bash
   git status
   ```

3. **Resolve Push Rejection**
   - If remote has new changes:
     ```bash
     git pull --rebase origin main
     ```
   - If local branch is behind:
     ```bash
     git pull origin main
     git push origin main
     ```

4. **Force Push (use with caution)**
   ```bash
   git push -f origin main  # Only use when absolutely necessary
   ```

5. **Common Issues**
   - Ensure you have write permissions to the repository
   - Check if your branch is protected
   - Verify your git credentials are correct
   - Make sure you haven't exceeded repository size limits

Remember to always pull changes before pushing to avoid conflicts.

## Roadmap
1. **Phase 1**: MVP Development (Frontend, Backend, AI Models, Blockchain Integration)
2. **Phase 2**: AI Model Optimization & Beta Testing
3. **Phase 3**: Smart Contract Deployment & NSE Integration
4. **Phase 4**: Full Launch & User Acquisition Campaign

## License
This project is licensed under the MIT License.


















