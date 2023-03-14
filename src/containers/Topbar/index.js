import React, {useState} from "react";
import {Layout, Popover} from "antd";
import {Link} from "react-router-dom";

import {toggleCollapsedSideNav} from "../../appRedux/actions";
import SearchBox from "../../components/SearchBox";
import UserInfo from "../../components/UserInfo";
import AppNotification from "../../components/AppNotification";
import MailNotification from "../../components/MailNotification";
import Auxiliary from "util/Auxiliary";


import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE} from "../../constants/ThemeSetting";
import {useDispatch, useSelector} from "react-redux";
import IntlMessages from "../../util/IntlMessages";

const {Header} = Layout;

const Topbar = () => {
  const {navStyle} = useSelector(({settings}) => settings);
  const navCollapsed = useSelector(({common}) => common.navCollapsed);
  const width = useSelector(({common}) => common.width);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const updateSearchChatUser = (evt) => {
    setSearchText(evt.target.value);
  };

  return (
    <Header>
      {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
        <div className="gx-linebar gx-mr-3">
          <i className="gx-icon-btn icon icon-menu"
             onClick={() => {
               dispatch(toggleCollapsedSideNav(!navCollapsed));
             }}
          />
        </div> : null}
      <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
        <img alt="" src="https://api.unimednatal.com.br/api/imgs/logos/unimed_quad.png" style={{width: 40}}/>
      </Link>
      <div className="title gx-fs-xxl" style={{ paddingLeft: "10px" }}>
        <IntlMessages id="topbar.titulo" />
      </div>
      <ul className="gx-header-notifications gx-ml-auto">
        <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
          <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={
            <SearchBox styleName="gx-popover-search-bar"
                       placeholder="Search in app..."
                       onChange={updateSearchChatUser}
                       value={searchText}/>
          } trigger="click">
            <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>
          </Popover>
        </li>
        {width >= TAB_SIZE ? null :
          <Auxiliary>
            <li className="gx-notify">
              <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification/>}
                       trigger="click">
                <span className="gx-pointer gx-d-block"><i className="icon icon-notification"/></span>
              </Popover>
            </li>

            <li className="gx-msg">
              <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                       content={<MailNotification/>} trigger="click">
                  <span className="gx-pointer gx-status-pos gx-d-block">
                    <i className="icon icon-chat-new"/>
                    <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                  </span>
              </Popover>
            </li>
          </Auxiliary>
        }
        {width >= TAB_SIZE ? null :
          <Auxiliary>
            <li className="gx-user-nav"><UserInfo/></li>
          </Auxiliary>
        }
      </ul>
    </Header>
  );
};

export default Topbar;
