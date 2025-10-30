import React from 'react';

export default function Nosotros() {
	return (
		<>
			<main className="nosotros-main">

				<section className="nosotros container">
					<div className="nosotros-intro">
						<h2>Sobre Xitomota</h2>
						<p>
							Traemos ropa deportiva original de marcas como Nike, Adidas, Jordan y más, con un enfoque claro: lo exclusivo. Nos movemos rápido, con lo que nadie más tiene — líneas raras, colaboraciones internacionales y drops que no tocan retail en Chile.
							<br />
						</p>
						<br />
						<p>
							No vestimos para encajar. Vestimos para destacar.  
							Esto no es solo ropa: es deporte, calle y estilo. Todo en uno.
						</p>
						<br />
						<p>
							Prendas que muchas veces solo llegan a Europa o Asia, como colecciones limitadas tipo <em>Adidas x China</em>, aparecen aquí primero.
						</p>
						<p>
							Cada drop que subimos tiene algo que decir.
						</p>
					</div>

					<h2 className="subtitulo">Los Desarrolladores</h2>
						<p>
							Este sitio fue desarrollado por estudiantes de Duoc UC, como parte del proyecto de la asignatura FullStack 2.  
						</p>
						<ul className="lista-devs">
							<li><strong>Brayan Ahumada</strong>-Desarrollo Frontend, Documentación y Diseño.</li>
							<li><strong>Cristian Ormazabal</strong>-Desarrollo Frontend, Documentación y Diseño.</li>
						</ul>
				</section>
			</main>
		</>
	);
}