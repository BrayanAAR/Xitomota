import React from 'react';
import poleras from '../../img/poleras.jpg';
import camisas from '../../img/camisas.jpg';
import polerones from '../../img/polerones.jpg';
import chaquetas from '../../img/chaquetas.jpg';
import pantalones from '../../img/pantalones.jpg';
import buzos from '../../img/buzos.jpg';
import primer_producto from '../../img/PrimerProducto.jpg';
import banner from '../../img/banner.jpg';
import { Link } from 'react-router-dom';


export default function Home() {
	return (
		<>
			<main className="home-main">
				<div className="container_4">
					<div className="container_4b">
						<img className="PrimerProducto" src={banner} alt="" />
					</div>
				</div>

				<div className="container_5">
					<h2>Categorías</h2>
					<div className="container_5a">
						<div className="container_5a1">
								<Link to="/categorias/poleras">
									<img className="foto_promocional" src={poleras} alt="" />
								</Link>
							<h4>Poleras</h4>
						</div>
						<div className="container_5a2">
							<img className="foto_promocional" src={camisas} alt="" />
							<h4>Camisas</h4>
						</div>
						<div className="container_5a3">
							<img className="foto_promocional" src={polerones} alt="" />
							<h4>Polerones</h4>
						</div>
					</div>
					<div className="container_5b">
						<div className="container_5b1">
							<img className="foto_promocional" src={chaquetas} alt="" />
							<h4>Chaquetas</h4>
						</div>
						<div className="container_5b2">
							<img className="foto_promocional" src={pantalones} alt="" />
							<h4>Pantalones</h4>
						</div>
						<div className="container_5b3">
							<img className="foto_promocional" src={buzos} alt="" />
							<h4>Buzos</h4>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}