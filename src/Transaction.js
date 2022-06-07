import {React, useState} from 'react'
import './Transaction.css';

const Transaction = (props) => {

	const [hash, setHash] = useState();

	const buyProduct = async (e) => {
		e.preventDefault();
		
		let transferAmount = e.target.transferAmount.value;
		let recieverAddress = e.target.recieverAddress.value;

		let Text = await props.contract.transfer(recieverAddress, transferAmount);
		setHash(Text.hash);
	}
	

	return (
			<div>
				<form onSubmit={buyProduct}>
					<br></br>
					<br></br>
					<h3 className='textToko'> Electronic Store </h3>
						<div className="table">
						<div className="table-row">
							<div className="table-cell">
								<h3>Product Name</h3>
								<p>Iphone 13</p>
								<img alt='phone' className='gambarBarang' src='https://cdn.eraspace.com/pub/media/catalog/product/a/p/apple_iphone_11_black_new_1_6_2.jpg'/>
							</div>
							<div className="table-cell">
								<h3>Details Product</h3>
								<p>Seller Address: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4</p>
								<p>Prduct Price : 200DT</p>
							</div>
							<div className="table-cell">
								<h3>Input Seller Address</h3>
								<input type='text' id='recieverAddress'/>
							</div>
							<div className="table-cell">
								<h3>Input Product Price</h3>
								<input type='number' id='transferAmount'/>
							</div>
							<div className="table-cell">
								<button className='button' type='submit'>Buy</button>
							</div>
							<div className="table-cell">
								<h3>Hash Transaction</h3>
								<p>{hash}</p>
							</div>
						</div>
						</div>
				 </form>
			</div>
		)
	
}

export default Transaction;