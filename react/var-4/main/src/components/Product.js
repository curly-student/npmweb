const Product = (props) => {
	const { name, price, onBuy } = props
	return (
		<div>
			Produs : <span>{name}</span> , Pret: <span>{price}</span> <button onClick={()=>onBuy(price)}>buy</button>;

		</div>
	)
}

export default Product