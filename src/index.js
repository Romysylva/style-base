import "./scss/sb.scss"

import "./scss/navbar/index";
import "./scss/sidebar/index";

import './scss/themes/plugins/theme';


import "./scss/components/dashboard/js/admin-dashboard";
import "./scss/components/dashboard/js/user-dashboard";

import "./scss/components/input/src/js/input";
import "./scss/components/input/src/js/toast";
import "./scss/components/loaders/src/plugins/loaders";
import "./scss/components/modals/src/plugins/modal";

import { initDrawer } from "./scss/drawer/js/drawer";
import { initSidebar } from "./scss/drawer/js/sidebar";

document.addEventListener('DOMContentLoaded', () => {
  initDrawer();
  initSidebar();
})

export { default as AdminDashboard } from "./scss/components/dashboard/AdminDashboard"