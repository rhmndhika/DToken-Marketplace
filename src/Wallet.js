import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import dtoken from './ABI/dtoken.json'
import Transaction from './Transaction'


const Wallet = () => {

	/* Address dari deployed contract */
	let contractAddress = '0x068531706d09dD4587Bd3eE928e90b4dDe560A19';
	

	const [account, setAccount] = useState(null);
	const [textButton, setTextButton] = useState('Connect Your Wallet');
	const [errorMessage, setErrorMessage] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState(null);
	const [transferHash, setTransferHash] = useState(null);



	

	const connectWallet = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				changedAccount(result[0]);
				setTextButton('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} 
	}

	const changedChain = () => {
		window.location.reload();
	}

	const changedAccount = (newAccount) => {
		setAccount(newAccount);
		updateEthers();
	}

	const updateTokenName = async () => {
		setTokenName(await contract.name());
	}
	

	const updateBalance = async () => {
		let initialBalance = await contract.balanceOf(account);
		let balanceNumber = initialBalance.toNumber();
		let tokenDecimals = await contract.decimals();
		let tokenBalance = balanceNumber / Math.pow(10, tokenDecimals);
		setBalance(tokenBalance);	
	}

	
	window.ethereum.on('changedAccount', changedAccount);

	window.ethereum.on('changedChain', changedChain);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, dtoken, tempSigner);
		setContract(tempContract);	
	}

	useEffect(() => {
		if (contract != null) {
			updateBalance();
			updateTokenName();
		}
	}, [contract]);

	
	return (
	<div>
			<h2> {tokenName + " ERC-20 Wallet"} </h2>
			<button onClick={connectWallet}>{textButton}</button>
			<div>
				<div>
					<h3>Address: {account}</h3>
				</div>
			<div>
				<h3>{tokenName} Balance: {balance}</h3>
			</div>
			{errorMessage}
		</div>
		<Transaction contract = {contract}/>
	</div>
	)
}

export default Wallet;