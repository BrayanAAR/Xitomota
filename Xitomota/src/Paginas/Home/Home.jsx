import React from 'react';
import './Home.css';
import foto_prom1 from '../../img/Producto1.jpg';
import foto_prom2 from '../../img/Producto2.jpg';
import foto_prom3 from '../../img/Producto3.jpg';
import foto_prom4 from '../../img/Producto4.jpg';
import foto_prom5 from '../../img/Producto5.jpg';
import foto_prom6 from '../../img/Producto6.jpg';
import primer_producto from '../../img/PrimerProducto.jpg';
import { Link } from 'react-router-dom';


export default function Home() {
	return (
		<>
			<main className="home-main">
				<div className="container_4">
					<div className="container_4a">
						<div className="div_4a1">
							<h2>Tienda Online Xitomota</h2>
							<p>
								Traemos ropa deportiva original de marcas como Nike, Adidas, Jordan y más, con un
								enfoque claro: lo exclusivo. Nos movemos rápido, con lo que nadie más tiene — líneas raras,
								colaboraciones internacionales y drops que no tocan retail en Chile. Nos mueve lo auténtico,
								lo que rompe con lo común.
								No vestimos para encajar. Vestimos para destacar. Esto no es solo ropa: es deporte, calle y estilo. Todo en uno.

								Prendas que muchas veces solo llegan a Europa o Asia, como colecciones limitadas tipo Adidas x China, aparecen aquí primero.

								Cada drop que subimos tiene algo que decir.
							</p>
						</div>
						<div className="div_4a2">
							<Link className="view_page" to="/productos">
								<svg style={{ height: '4ex' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
									<path d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z" />
								</svg>
								Ver Productos
							</Link>
						</div>
					</div>
					<div className="container_4b">
						<img className="PrimerProducto" src={primer_producto} alt="" />
					</div>
				</div>

				<div className="container_5">
					<div className="container_5a">
						<div className="container_5a1">
								<Link to="/productos/1">
									<img className="foto_promocional" src={foto_prom1} alt="" />
								</Link>
							<h4>Poleron</h4>
							<p className="container_5">$30.000</p>
						</div>
						<div className="container_5a2">
							<img className="foto_promocional" src={foto_prom2} alt="" />
							<h4>Buzo Deportivo</h4>
							<p className="container_5">$20.000</p>
						</div>
						<div className="container_5a3">
							<img className="foto_promocional" src={foto_prom3} alt="" />
							<h4>Chaqueta de salir</h4>
							<p className="container_5">$15.000</p>
						</div>
					</div>
					<div className="container_5b">
						<div className="container_5b1">
							<img className="foto_promocional" src={foto_prom4} alt="" />
							<h4>Conjunto deportivo</h4>
							<p className="container_5">$17.000</p>
						</div>
						<div className="container_5b2">
							<img className="foto_promocional" src={foto_prom5} alt="" />
							<h4>Chaqueta Aviadora</h4>
							<p className="container_5">$25.000</p>
						</div>
						<div className="container_5b3">
							<img className="foto_promocional" src={foto_prom6} alt="" />
							<h4>Chaqueta jeans</h4>
							<p className="container_5">$18.000</p>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}