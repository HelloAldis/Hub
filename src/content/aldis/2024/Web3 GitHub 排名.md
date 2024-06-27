---
author: Alids
publishDate: 2024-06-24
title: GitHub Web3 项目排名
excerpt: 利用python脚本为GitHub上面得web3相关项目进行打分并排名，帮助学习web3知识参考。
image: ~/assets/images/aldis/2024/web3-2.png
category: Web3
tags:
  - Rank
  - Python
---

## 排名实现方式

- 使用Github graphql查询语句，查询topic下start数前100名的项目
- web3 相关topic包括："web3", "blockchain", "smart-contract", "solidity", "cryptocurrency", "bitcoin", "ethereum"
- 将这些topic的前100项目汇聚，并跟进项目去重
- 计算得分并排序，得分=(start + watch*2 + fork*4)
- 排序后得到前100名

## Web3 Top 100

| Ranking | Project Name | Score | Stars | Watchers | Forks | Language | Open Issues | Description | Last Commit |
| ------- | ------------ | ----- | ----- | ----- | ----- | -------- | ----------- | ----------- | ----------- |
| 1 | [bitcoin](https://github.com/bitcoin/bitcoin) | 156139 | 77017 | 3993 | 35568 | C++ | 372 | Bitcoin Core integration/staging tree | 2024-06-25T11:49:50Z |
| 2 | [go-ethereum](https://github.com/ethereum/go-ethereum) | 90314 | 46622 | 2207 | 19639 | Go | 260 | Go implementation of the Ethereum protocol | 2024-06-25T11:48:13Z |
| 3 | [fuel-core](https://github.com/FuelLabs/fuel-core) | 64341 | 58361 | 244 | 2746 | Rust | 152 | Rust full node implementation of the Fuel v2 protocol. | 2024-06-24T23:36:19Z |
| 4 | [openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts) | 49048 | 24418 | 638 | 11677 | JavaScript | 189 | OpenZeppelin Contracts is a library for secure smart contract development. | 2024-06-25T11:51:42Z |
| 5 | [ccxt](https://github.com/ccxt/ccxt) | 48402 | 31826 | 930 | 7358 | Python | 846 | A JavaScript / TypeScript / Python / C# / PHP cryptocurrency trading API with support for more than 100 bitcoin/altcoin exchanges | 2024-06-25T11:38:26Z |
| 6 | [freqtrade](https://github.com/freqtrade/freqtrade) | 38951 | 26211 | 621 | 5749 | Python | 41 | Free, open source crypto trading bot | 2024-06-25T03:02:48Z |
| 7 | [bitcoinbook](https://github.com/bitcoinbook/bitcoinbook) | 37090 | 23098 | 1062 | 5934 | HTML | 82 | Mastering Bitcoin 3rd Edition - Programming the Open Blockchain | 2024-06-19T10:50:18Z |
| 8 | [solidity](https://github.com/ethereum/solidity) | 35287 | 22629 | 719 | 5610 | C++ | 428 | Solidity, the Smart Contract Programming Language | 2024-06-25T11:06:46Z |
| 9 | [fabric](https://github.com/hyperledger/fabric) | 35065 | 15529 | 990 | 8778 | Go | 163 | Hyperledger Fabric is an enterprise-grade permissioned distributed ledger framework for developing solutions and applications. Its modular and versatile design satisfies a broad range of industry use cases. It offers a unique approach to consensus that enables performance at scale while preserving privacy. | 2024-06-24T15:09:20Z |
| 10 | [OpenBBTerminal](https://github.com/OpenBB-finance/OpenBBTerminal) | 32131 | 26435 | 257 | 2591 | Python | 23 | Investment Research for Everyone, Everywhere. | 2024-06-25T11:15:40Z |
| 11 | [ethereumbook](https://github.com/ethereumbook/ethereumbook) | 30352 | 19484 | 584 | 4850 | JavaScript | 56 | Mastering Ethereum, by Andreas M. Antonopoulos, Gavin Wood | 2024-06-09T12:35:27Z |
| 12 | [web3.js](https://github.com/web3/web3.js) | 29625 | 18955 | 452 | 4883 | TypeScript | 172 | Collection of comprehensive TypeScript libraries for Interaction with the Ethereum JSON RPC API and utility functions. | 2024-06-25T02:50:46Z |
| 13 | [sui](https://github.com/MystenLabs/sui) | 28268 | 5830 | 160 | 11059 | Rust | 408 |  Sui, a next-generation smart contract platform with high throughput, low latency, and an asset-oriented programming model powered by the Move programming language | 2024-06-25T11:31:00Z |
| 14 | [hey](https://github.com/heyxyz/hey) | 26060 | 22848 | 105 | 1501 | TypeScript | 54 | Hey is a decentralized and permissionless social media app built with Lens Protocol 🌿 | 2024-06-25T09:06:05Z |
| 15 | [ZeroNet](https://github.com/HelloZeroNet/ZeroNet) | 24449 | 18249 | 842 | 2258 | JavaScript | 709 | ZeroNet - Decentralized websites using Bitcoin crypto and BitTorrent network | 2024-01-31T07:47:58Z |
| 16 | [diem](https://github.com/diem/diem) | 22887 | 16711 | 515 | 2573 | Rust | 351 | Diem’s mission is to build a trusted and innovative financial network that empowers people and businesses around the world. | 2024-06-21T05:38:13Z |
| 17 | [metamask-extension](https://github.com/MetaMask/metamask-extension) | 22282 | 11632 | 555 | 4770 | JavaScript | 1798 | :globe_with_meridians: :electric_plug: The MetaMask browser extension enables browsing Ethereum blockchain enabled websites | 2024-06-25T11:50:31Z |
| 18 | [dogecoin](https://github.com/dogecoin/dogecoin) | 21740 | 14420 | 842 | 2818 | C++ | 149 | very currency | 2024-06-25T00:55:06Z |
| 19 | [go-ibax](https://github.com/IBAX-io/go-ibax) | 21484 | 7878 | 352 | 6451 | Go | 94 | An innovative Blockchain Protocol Platform, which everyone can deploy their own applications quickly and easily, such as Dapp, DeFi, DAO, Cross-Blockchain transactions, etc.  | 2024-06-19T07:12:09Z |
| 20 | [chains](https://github.com/ethereum-lists/chains) | 21401 | 8399 | 510 | 5991 | Kotlin | 34 | provides metadata for chains | 2024-06-25T11:45:51Z |
| 21 | [solana](https://github.com/solana-labs/solana) | 21104 | 12614 | 307 | 3938 | Rust | 392 | Web-Scale Blockchain for fast, secure, scalable, decentralized apps and marketplaces. | 2024-06-24T12:58:58Z |
| 22 | [gun](https://github.com/amark/gun) | 20855 | 17903 | 319 | 1157 | JavaScript | 270 | An open source cybersecurity protocol for syncing decentralized graph data. | 2024-04-15T19:42:03Z |
| 23 | [abu](https://github.com/bbfamily/abu) | 20363 | 11509 | 739 | 3688 | Python | 0 | 阿布量化交易系统(股票，期权，期货，比特币，机器学习) 基于python的开源量化交易，量化投资架构 | 2024-05-29T10:26:19Z |
| 24 | [gekko](https://github.com/askmike/gekko) | 19357 | 10043 | 709 | 3948 | JavaScript | 0 | A bitcoin trading bot written in node - https://gekko.wizb.it/ | 2020-02-16T14:25:26Z |
| 25 | [truffle](https://github.com/trufflesuite/truffle) | 19311 | 14023 | 338 | 2306 | TypeScript | 508 | :warning: The Truffle Suite is being sunset. For information on ongoing support, migration options and FAQs, visit the Consensys blog. Thank you for all the support over the years. | 2024-04-22T08:47:19Z |
| 26 | [full-blockchain-solidity-course-js](https://github.com/smartcontractkit/full-blockchain-solidity-course-js) | 18049 | 11861 | 230 | 2864 | None | 83 | Learn Blockchain, Solidity, and Full Stack Web3 Development with Javascript | 2024-06-12T05:10:25Z |
| 27 | [sismo-badges](https://github.com/sismo-core/sismo-badges) | 17614 | 16146 | 192 | 542 | TypeScript | 1 | Contracts of the Sismo Badge Minting Protocol  | 2023-10-03T15:47:29Z |
| 28 | [full-blockchain-solidity-course-py](https://github.com/smartcontractkit/full-blockchain-solidity-course-py) | 16941 | 10665 | 248 | 2890 | None | 221 | Ultimate Solidity, Blockchain, and Smart Contract - Beginner to Expert Full Course \| Python Edition | 2024-04-16T07:21:43Z |
| 29 | [scaffold-eth](https://github.com/scaffold-eth/scaffold-eth) | 16295 | 9009 | 151 | 3492 | CSS | 0 | 🏗 forkable Ethereum dev stack focused on fast product iterations  | 2024-06-04T15:20:23Z |
| 30 | [xmrig](https://github.com/xmrig/xmrig) | 16032 | 8470 | 387 | 3394 | C | 543 | RandomX, KawPow, CryptoNight and GhostRider unified CPU/GPU miner and RandomX benchmark | 2024-06-05T03:17:33Z |
| 31 | [monero](https://github.com/monero-project/monero) | 15859 | 8727 | 496 | 3070 | C++ | 432 | Monero: the secure, private, untraceable cryptocurrency | 2024-06-25T01:13:21Z |
| 32 | [chia-blockchain](https://github.com/Chia-Network/chia-blockchain) | 15536 | 10850 | 320 | 2023 | Python | 63 | Chia blockchain python implementation (full node, farmer, harvester, timelord, and wallet) | 2024-06-25T10:45:55Z |
| 33 | [ET](https://github.com/egametang/ET) | 15387 | 8531 | 481 | 2947 | C# | 66 | Unity3D Client And C# Server Framework | 2024-06-24T03:59:07Z |
| 34 | [Superalgos](https://github.com/Superalgos/Superalgos) | 15286 | 3968 | 209 | 5450 | JavaScript | 63 | Free, open-source crypto trading bot, automated bitcoin / cryptocurrency trading software, algorithmic trading bots. Visually design your crypto trading bot, leveraging an integrated charting system, data-mining, backtesting, paper trading, and multi-server crypto bot deployments. | 2024-06-25T03:26:23Z |
| 35 | [interface](https://github.com/Uniswap/interface) | 14828 | 4784 | 177 | 4845 | TypeScript | 713 | 🦄 Open source interfaces for the Uniswap protocol | 2024-06-22T03:31:23Z |
| 36 | [WTF-Solidity](https://github.com/AmazingAng/WTF-Solidity) | 14713 | 10683 | 140 | 1875 | Solidity | 20 | 我最近在重新学solidity，巩固一下细节，也写一个“WTF Solidity极简入门”，供小白们使用，每周更新1-3讲。Now supports English! 官网: https://wtf.academy | 2024-06-25T04:34:12Z |
| 37 | [substrate](https://github.com/paritytech/substrate) | 14651 | 8389 | 482 | 2649 | Rust | 542 | Substrate: The platform for blockchain innovators | 2023-09-25T20:31:30Z |
| 38 | [ethereum-org-website](https://github.com/ethereum/ethereum-org-website) | 14619 | 4885 | 207 | 4660 | Markdown | 152 | Ethereum.org is a primary online resource for the Ethereum community. | 2024-06-25T11:41:12Z |
| 39 | [electrum](https://github.com/spesmilo/electrum) | 13988 | 7216 | 369 | 3017 | Python | 1052 | Electrum Bitcoin Wallet | 2024-06-25T10:17:08Z |
| 40 | [blockchain](https://github.com/dvf/blockchain) | 13955 | 7705 | 415 | 2710 | C# | 73 | A simple Blockchain in Python | 2023-01-04T17:21:04Z |
| 41 | [cosmos-sdk](https://github.com/cosmos/cosmos-sdk) | 13521 | 6059 | 258 | 3473 | Go | 369 | :chains: A Framework for Building High Value Public Blockchains :sparkles: | 2024-06-25T11:33:31Z |
| 42 | [aptos-core](https://github.com/aptos-labs/aptos-core) | 13413 | 5883 | 205 | 3560 | Rust | 448 | Aptos is a layer 1 blockchain built to support the widespread use of blockchain through better technology and user experience. | 2024-06-25T10:32:49Z |
| 43 | [hummingbot](https://github.com/hummingbot/hummingbot) | 13171 | 7565 | 146 | 2657 | Python | 362 | Open source software that helps you create and deploy high-frequency crypto trading bots | 2024-06-25T03:36:19Z |
| 44 | [mist](https://github.com/ethereum/mist) | 13112 | 7442 | 713 | 2122 | JavaScript | 779 | [DEPRECATED] Mist. Browse and use Ðapps on the Ethereum network. | 2020-07-20T13:59:24Z |
| 45 | [DeFi-Developer-Road-Map](https://github.com/OffcierCia/DeFi-Developer-Road-Map) | 12406 | 9570 | 192 | 1226 | JavaScript | 0 | DeFi Developer roadmap is a curated Developer handbook which includes a list of the best tools for DApps development, resources and references!  | 2024-04-19T01:40:41Z |
| 46 | [lnd](https://github.com/lightningnetwork/lnd) | 12299 | 7545 | 325 | 2052 | Go | 532 | Lightning Network Daemon ⚡️ | 2024-06-25T10:11:42Z |
| 47 | [ethers.js](https://github.com/ethers-io/ethers.js) | 11557 | 7771 | 107 | 1786 | TypeScript | 400 | Complete Ethereum library and wallet implementation in JavaScript. | 2024-06-20T14:24:42Z |
| 48 | [blockchain_guide](https://github.com/yeasy/blockchain_guide) | 11441 | 6745 | 416 | 1932 | Go | 4 | Introduce blockchain related technologies, from theory to practice with bitcoin, ethereum and hyperledger. | 2024-04-30T09:23:42Z |
| 49 | [optimism](https://github.com/ethereum-optimism/optimism) | 11369 | 5203 | 117 | 2966 | Go | 118 | Optimism is Ethereum, scaled. | 2024-06-25T09:15:18Z |
| 50 | [polkadot](https://github.com/paritytech/polkadot) | 11329 | 7117 | 524 | 1582 | Rust | 80 | Polkadot Node Implementation | 2023-11-15T13:20:33Z |
| 51 | [StockSharp](https://github.com/StockSharp/StockSharp) | 11258 | 6802 | 537 | 1691 | C# | 0 | Algorithmic trading and quantitative trading open source platform to develop trading robots (stock markets, forex, crypto, bitcoins, and options). | 2024-06-23T09:49:18Z |
| 52 | [btcd](https://github.com/btcsuite/btcd) | 11206 | 6090 | 250 | 2308 | Go | 178 | An alternative full node bitcoin implementation written in Go (golang) | 2024-06-25T09:48:47Z |
| 53 | [foundry](https://github.com/foundry-rs/foundry) | 11074 | 7830 | 72 | 1550 | Rust | 947 | Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust. | 2024-06-25T11:44:42Z |
| 54 | [eattheblocks](https://github.com/jklepatch/eattheblocks) | 10942 | 3978 | 270 | 3212 | JavaScript | 66 | Source code for Eat The Blocks, a screencast for Ethereum Dapp Developers | 2024-02-18T06:20:17Z |
| 55 | [smart-contract-best-practices](https://github.com/Consensys/smart-contract-best-practices) | 10925 | 7375 | 324 | 1451 | HTML | 14 | A guide to smart contract security best practices | 2024-06-24T13:24:28Z |
| 56 | [blockchain](https://github.com/LiuBoyu/blockchain) | 10911 | 6907 | 420 | 1582 | None | 9 | 区块链 - 中文资源 | 2022-09-20T19:14:30Z |
| 57 | [parity-ethereum](https://github.com/openethereum/parity-ethereum) | 10872 | 6804 | 354 | 1680 | Rust | 130 | The fast, light, and robust client for Ethereum-like networks. | 2020-11-01T09:05:37Z |
| 58 | [capstone](https://github.com/capstone-engine/capstone) | 10794 | 7158 | 298 | 1520 | C | 346 | Capstone disassembly/disassembler framework for ARM, ARM64 (ARMv8), Alpha, BPF, Ethereum VM, HPPA, M68K, M680X, Mips, MOS65XX, PPC, RISC-V(rv32G/rv64G), SH, Sparc, SystemZ, TMS320C64X, TriCore, Webassembly, XCore and X86. | 2024-06-25T11:35:13Z |
| 59 | [chainlink](https://github.com/smartcontractkit/chainlink) | 10739 | 6805 | 326 | 1641 | Go | 78 | node of the decentralized oracle network, bridging on and off-chain computation | 2024-06-25T11:44:08Z |
| 60 | [blockchain-demo](https://github.com/anders94/blockchain-demo) | 10695 | 5111 | 243 | 2549 | Pug | 1 | A web-based demonstration of blockchain concepts. | 2024-06-04T15:03:14Z |
| 61 | [python-binance](https://github.com/sammchardy/python-binance) | 10676 | 5866 | 216 | 2189 | Python | 495 | Binance Exchange API python implementation for automated trading | 2024-06-13T19:36:34Z |
| 62 | [bitcoinj](https://github.com/bitcoinj/bitcoinj) | 10441 | 4923 | 305 | 2454 | Java | 329 | A library for working with Bitcoin | 2024-06-25T07:17:43Z |
| 63 | [tendermint](https://github.com/tendermint/tendermint) | 10317 | 5667 | 260 | 2065 | Go | 0 | ⟁ Tendermint Core (BFT Consensus) in Go | 2024-06-18T15:19:36Z |
| 64 | [ethereum-boilerplate](https://github.com/ethereum-boilerplate/ethereum-boilerplate) | 10270 | 4024 | 71 | 3052 | TypeScript | 1 | The ultimate NextJS Ethereum Dapp Boilerplate which gives you maximum flexibility and speed. Feel free to fork and contribute. Although this repo is called "Ethereum Boilerplate" it works with any EVM system and since it uses Moralis SDK You can even use it on Solana!  Happy BUIDL!👷‍♂️ | 2024-06-19T14:27:22Z |
| 65 | [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib) | 10116 | 5586 | 196 | 2069 | TypeScript | 35 | A javascript Bitcoin library for node.js and browsers. | 2024-06-18T03:03:41Z |
| 66 | [hardhat](https://github.com/NomicFoundation/hardhat) | 9816 | 6974 | 77 | 1344 | TypeScript | 443 | Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software.  | 2024-06-25T10:14:02Z |
| 67 | [btcpayserver](https://github.com/btcpayserver/btcpayserver) | 9744 | 6140 | 213 | 1589 | C# | 80 | Accept Bitcoin payments. Free, open-source & self-hosted, Bitcoin payment processor.  | 2024-06-24T14:02:48Z |
| 68 | [v3-core](https://github.com/Uniswap/v3-core) | 9688 | 4238 | 138 | 2587 | TypeScript | 56 | 🦄 🦄 🦄 Core smart contracts of Uniswap v3 | 2024-06-24T07:48:42Z |
| 69 | [aleth](https://github.com/ethereum/aleth) | 9262 | 3964 | 469 | 2180 | C++ | 313 | Aleth – Ethereum C++ client, tools and libraries | 2024-03-05T10:53:01Z |
| 70 | [snarkOS](https://github.com/AleoNet/snarkOS) | 9250 | 3954 | 111 | 2537 | Rust | 80 | A Decentralized Operating System for ZK Applications | 2024-06-25T09:33:46Z |
| 71 | [v2-core](https://github.com/Uniswap/v2-core) | 9225 | 2857 | 102 | 3082 | TypeScript | 21 | 🦄 🦄  Core smart contracts of Uniswap V2 | 2024-06-01T21:35:39Z |
| 72 | [financial-machine-learning](https://github.com/firmai/financial-machine-learning) | 9200 | 6350 | 253 | 1172 | Python | 5 | A curated list of practical financial machine learning tools and applications. | 2024-06-25T01:29:43Z |
| 73 | [taiko-mono](https://github.com/taikoxyz/taiko-mono) | 9063 | 4487 | 159 | 2129 | Svelte | 12 | A based rollup. 🥁 | 2024-06-25T10:07:27Z |
| 74 | [web3j](https://github.com/hyperledger/web3j) | 8775 | 5011 | 222 | 1660 | Java | 129 | Lightweight Java and Android library for integration with Ethereum clients | 2024-06-22T17:25:15Z |
| 75 | [bitcoin-wallet](https://github.com/bitcoin-wallet/bitcoin-wallet) | 8723 | 3591 | 588 | 1978 | Java | 64 | Bitcoin Wallet app for your Android device. Standalone Bitcoin node, no centralized backend required. | 2024-06-25T08:20:02Z |
| 76 | [awesome-solidity](https://github.com/bkrem/awesome-solidity) | 8635 | 6435 | 165 | 935 | None | 0 | ⟠ A curated list of awesome Solidity resources, libraries, tools and more | 2024-06-07T09:42:31Z |
| 77 | [web3-react](https://github.com/Uniswap/web3-react) | 8631 | 5469 | 78 | 1503 | TypeScript | 147 | A simple, maximally extensible, dependency minimized framework for building modern Ethereum dApps | 2024-06-07T04:10:14Z |
| 78 | [lbry-sdk](https://github.com/lbryio/lbry-sdk) | 8502 | 7194 | 171 | 483 | Python | 381 | The LBRY SDK for building decentralized, censorship resistant, monetized, digital content apps. | 2024-06-07T08:33:02Z |
| 79 | [rippled](https://github.com/XRPLF/rippled) | 8374 | 4478 | 505 | 1443 | C++ | 334 | Decentralized cryptocurrency blockchain daemon implementing the XRP Ledger protocol in C++ | 2024-06-25T00:17:34Z |
| 80 | [tachyon](https://github.com/kroma-network/tachyon) | 8316 | 7764 | 52 | 224 | C++ | 17 | Modular ZK(Zero Knowledge) backend accelerated by GPU | 2024-06-25T11:40:13Z |
| 81 | [Qbot](https://github.com/UFund-Me/Qbot) | 8273 | 6397 | 83 | 855 | Jupyter Notebook | 55 | [🔥updating ...] AI 自动量化交易机器人 AI-powered Quantitative Investment Research Platform. 📃 online docs: https://ufund-me.github.io/Qbot   ✨ :news: qbot-mini: https://github.com/Charmve/iQuant | 2024-06-16T08:20:46Z |
| 82 | [XChange](https://github.com/knowm/XChange) | 8144 | 3794 | 250 | 1925 | Java | 308 | XChange is a Java library providing a streamlined API for interacting with 60+ Bitcoin and Altcoin exchanges providing a consistent interface for trading and accessing market data. | 2024-06-24T12:57:48Z |
| 83 | [umbrel](https://github.com/getumbrel/umbrel) | 8038 | 6856 | 84 | 507 | TypeScript | 179 | A beautiful home server OS for self-hosting with an app store. Buy a pre-built Umbrel Home with umbrelOS, or install on a Raspberry Pi or any x86 system. | 2024-06-23T10:41:36Z |
| 84 | [blockscout](https://github.com/blockscout/blockscout) | 7955 | 3301 | 88 | 2239 | Elixir | 343 | Blockchain explorer for Ethereum based network and a tool for inspecting and analyzing EVM based blockchains.  | 2024-06-25T10:27:57Z |
| 85 | [wallet](https://github.com/bitpay/wallet) | 7931 | 3775 | 344 | 1734 | TypeScript | 361 | Bitpay Wallet (formerly Copay) is a secure Bitcoin and other crypto currencies wallet platform for both desktop and mobile devices. | 2023-04-29T02:14:37Z |
| 86 | [Crypto-Signal](https://github.com/CryptoSignal/Crypto-Signal) | 7862 | 4770 | 305 | 1241 | Python | 58 | Github.com/CryptoSignal - Trading & Technical Analysis Bot - 4,100+ stars, 1,100+ forks | 2024-02-14T12:21:00Z |
| 87 | [grin](https://github.com/mimblewimble/grin) | 7814 | 5038 | 398 | 990 | Rust | 126 | Minimal implementation of the Mimblewimble protocol. | 2024-06-20T11:08:30Z |
| 88 | [wagmi](https://github.com/wevm/wagmi) | 7798 | 5796 | 43 | 958 | TypeScript | 4 | React Hooks for Ethereum | 2024-06-24T23:59:54Z |
| 89 | [quorum](https://github.com/Consensys/quorum) | 7742 | 4600 | 315 | 1256 | Go | 49 | A permissioned implementation of Ethereum supporting data privacy | 2024-06-24T13:23:36Z |
| 90 | [bisq](https://github.com/bisq-network/bisq) | 7684 | 4628 | 272 | 1256 | Java | 157 | A decentralized bitcoin exchange network | 2024-06-25T06:47:09Z |
| 91 | [Dapp-Learning](https://github.com/Dapp-Learning-DAO/Dapp-Learning) | 7574 | 4850 | 112 | 1250 | Solidity | 14 | Dapp learning project for developers at all stages. Becoming and cultivating sovereign individuals. Nonprofit organization. | 2024-06-25T10:05:48Z |
| 92 | [web3modal](https://github.com/WalletConnect/web3modal) | 7466 | 4714 | 62 | 1314 | TypeScript | 28 | A single Web3 provider solution for all Wallets | 2024-06-25T11:48:59Z |
| 93 | [binance-trading-bot](https://github.com/chrisleekr/binance-trading-bot) | 7393 | 4951 | 139 | 1082 | JavaScript | 96 | Automated Binance trading bot -  Trade multiple cryptocurrencies. Buy low/sell high with Grid Trading. Integrated with TradingView technical analysis | 2024-05-09T10:32:52Z |
| 94 | [melonJS](https://github.com/melonjs/melonJS) | 7371 | 5755 | 169 | 639 | JavaScript | 28 | a fresh, modern & lightweight HTML5 game engine | 2024-06-25T10:33:51Z |
| 95 | [DeFiHackLabs](https://github.com/SunWeb3Sec/DeFiHackLabs) | 7333 | 4925 | 128 | 1076 | Solidity | 3 | Reproduce DeFi hacked incidents using Foundry. | 2024-06-25T08:47:43Z |
| 96 | [slither](https://github.com/crytic/slither) | 7133 | 5123 | 69 | 936 | Python | 345 | Static Analyzer for Solidity and Vyper | 2024-06-24T16:08:17Z |
| 97 | [jesse](https://github.com/jesse-ai/jesse) | 7092 | 5356 | 179 | 689 | Python | 2 | An advanced crypto trading bot written in Python | 2024-06-24T16:15:27Z |
| 98 | [BlockChain](https://github.com/itheima1/BlockChain) | 7066 | 4232 | 211 | 1206 | JavaScript | 21 | 黑马程序员 120天全栈区块链开发 开源教程 | 2023-12-28T10:40:10Z |
| 99 | [hyperledger](https://github.com/hyperledger/hyperledger) | 6744 | 3704 | 814 | 706 | None | 0 | Hyperledger is a Collaborative Project at The Linux Foundation. | 2022-01-29T08:31:24Z |
| 100 | [blockchain_go](https://github.com/Jeiwan/blockchain_go) | 6717 | 4061 | 179 | 1149 | Go | 33 | A simplified blockchain implementation in Golang | 2024-06-20T18:03:44Z |
