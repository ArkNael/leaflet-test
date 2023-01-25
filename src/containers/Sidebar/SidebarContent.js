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
							key="benefs"
							className={getNavStyleSubMenuClass(navStyle)}
							title={
								<span>
									{" "}
									<i className="icon icon-extra-components" />
									<IntlMessages id="sidebar.configuracoes" />
								</span>
							}
						>
							<Menu.Item key="temas">
								<Link to="/temas"><i className="icon icon-invert-color"/>
									<span><IntlMessages id="sidebar.temas"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="formas">
								<Link to="/formas"><i className="icon icon-listing-dbrd"/>
									<span><IntlMessages id="sidebar.formas"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="tipos">
								<Link to="/tipos"><i className="icon icon-timeline-left-align"/>
									<span><IntlMessages id="sidebar.tipos"/></span>
								</Link>
							</Menu.Item>
							<Menu.Item key="status">
								<Link to="/status">
									<span><IntlMessages id="sidebar.status"/></span>
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

