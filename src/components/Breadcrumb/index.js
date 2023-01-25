import React from "react";
import { Breadcrumb } from "antd";
import { matchPath, Link } from "react-router-dom";

const Migalha = () => {
	const home = matchPath(window.location.pathname, {
		path: "/home",
		exact: true,
		strict: false
	});

	const menus = {
		temas: {
			nome: "Temas",
			params: "",
			subs: {
				editar: {
					nome: "Editar",
					params: "/:id"
				},
				adicionar: {
					nome: "Adicionar",
					params: ""
				}
			}
		},

		formas: {
			nome: "Formas",
			params: "",
			subs: {
				editar: {
					nome: "Editar",
					params: "/:id"
				},
				adicionar: {
					nome: "Adicionar",
					params: ""
				}
			}
		},
	};

	let matched = null;

	const getMatched = (nav, pai) => {
		Object.keys(nav).forEach(item => {
			let match = matchPath(window.location.pathname, {
				path: `/${pai}${item}${nav[item].params}/`,
				exact: false,
				strict: false
			});

			if (match && match.isExact) {
				matched = match;
			} else {
				if (nav[item].subs) {
					getMatched(nav[item].subs, `${pai}${item}/`);
				}
			}
		});
	};

	getMatched(menus, "");

	const montaBread = (navegacao, pai) => {
		let breads = null;
		Object.keys(navegacao).forEach(item => {
			let match = matchPath(window.location.pathname, {
				path: `/${pai}${item}${navegacao[item].params}/`,
				exact: false,
				strict: false
			});

			if (match) {
				if (match.isExact) {
					breads = (
						<>
							<Breadcrumb.Item>{navegacao[item].nome}</Breadcrumb.Item>
						</>
					);
				} else {
					let subs = null;
					if (navegacao[item].subs) {
						subs = montaBread(navegacao[item].subs, `${pai}${item}/`);
					}

					let paramsUrl = "";

					if (matched.params)
						Object.keys(matched.params).forEach(param => {
							let iof = navegacao[item].params.indexOf(param);
							if (param != null && iof > 0) {
								paramsUrl += navegacao[item].params.replace(
									":" + param,
									matched.params[param]
								);
							}
						});
					breads = (
						<>
							<Breadcrumb.Item>
								<Link to={`/${pai}${item}${paramsUrl}/`}>
									<span className="gx-link">{navegacao[item].nome}</span>
								</Link>
							</Breadcrumb.Item>
							{subs}
						</>
					);
				}
			}
		});

		return breads;
	};

	return !home && matched ? (
		<div style={{ padding: "0 0 15px 0" }}>
			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to="/home">
						<span className="gx-link">Início</span>
					</Link>
				</Breadcrumb.Item>
				{montaBread(menus, "")}
			</Breadcrumb>
		</div>
	) : null;
};

export default Migalha;
