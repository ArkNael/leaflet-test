import React from "react";
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR, TAB_SIZE
} from "../../constants/ThemeSetting";
import {useSelector} from "react-redux";
import Sidebar from "../Sidebar";
import { useLocation } from "react-router-dom";

const SIDEBAR_VISIBLE_ON = [NAV_STYLE_FIXED, NAV_STYLE_DRAWER, NAV_STYLE_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR];

const AppSidebar = ({navStyle}) => {
  const width = useSelector(({common}) => common.width);
  const location = useLocation();

  if (width < TAB_SIZE || SIDEBAR_VISIBLE_ON.includes(navStyle)) {
    return location.pathname.substring(0, 4) !== '/nps' && <Sidebar/>;
  }

  return null;
};

export default React.memo(AppSidebar);
