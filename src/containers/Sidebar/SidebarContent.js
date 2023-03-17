import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import {
	NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
	NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
	THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {useSelector} from "react-redux";

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
	const {navStyle, themeType} = useSelector(({settings}) => settings);
	const pathname = useSelector(({common}) => common.pathname);

	const getNoHeaderClass = (navStyle) => {
		if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
			return "gx-no-header-notifications";
		}
		return "";
	};

	const getNavStyleSubMenuClass = navStyle => {
		if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
			return "gx-no-header-submenu-popup";
		}
		return "";
	};

	const selectedKeys = pathname.substr(1);
	const defaultOpenKeys = selectedKeys.split('/')[1];

	return (
		<>
			<SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
			<div className="gx-sidebar-content">
				<div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
					<UserProfile/>
				</div>
				<CustomScrollbars className="gx-layout-sider-scrollbar">
					<Menu
						defaultOpenKeys={[defaultOpenKeys]}
						selectedKeys={[selectedKeys]}
						theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
						mode="inline">

						<Menu.Item key="dashboard">
							<Link to="/dashboard"><i className="icon icon-widgets"/>
								<span><IntlMessages id="sidebar.dashboard"/></span>
							</Link>
						</Menu.Item>
						<Menu.SubMenu
							key="ocorrencias"
							className={getNavStyleSubMenuClass(navStyle)}
							title={
								<span>
									{" "}
									<i className="icon icon-alert" />
									<span><IntlMessages id="sidebar.ocorrencias" /></span>
								</span>
							}
						>
							<Menu.Item key="ocorrencias-new">
								<Link to="/ocorrencias/adicionar">
									<span><IntlMessages id="sidebar.ocorrencias.add"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="ocorrencias-list">
								<Link to="/ocorrencias">
									<span><IntlMessages id="sidebar.ocorrencias.list"/></span>
								</Link>
							</Menu.Item>
						</Menu.SubMenu>
						<Menu.SubMenu
							key="benefs"
							className={getNavStyleSubMenuClass(navStyle)}
							title={
								<span>
									{" "}
									<i className="icon icon-product-list" />
									<span><IntlMessages id="sidebar.cadastrosBasicos" /></span>
								</span>
							}
						>
							<Menu.Item key="assuntos">
								<Link to="/assuntos">
									<span><IntlMessages id="sidebar.assuntos"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="contratos">
								<Link to="/contratos">
									<span><IntlMessages id="sidebar.contratos"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="destinos">
								<Link to="/destinos">
									<span><IntlMessages id="sidebar.destinos"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="finalidades">
								<Link to="/finalidades">
									<span><IntlMessages id="sidebar.finalidades"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="formas">
								<Link to="/formas">
									<span><IntlMessages id="sidebar.formas"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="origens">
								<Link to="/origens">
									<span><IntlMessages id="sidebar.origens"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="reversoes">
								<Link to="/reversoes">
									<span><IntlMessages id="sidebar.reversoes"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="status">
								<Link to="/status">
									<span><IntlMessages id="sidebar.status"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="temas">
								<Link to="/temas">
									<span><IntlMessages id="sidebar.temas"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="tipos">
								<Link to="/tipos">
									<span><IntlMessages id="sidebar.tipos"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="ccustos">
								<Link to="/ccustos">
									<span><IntlMessages id="sidebar.ccustos"/></span>
								</Link>
							</Menu.Item>
						</Menu.SubMenu>
						
					</Menu>
				</CustomScrollbars>
			</div>
		</>
	);
};

export default React.memo(SidebarContent);

