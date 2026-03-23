import { createBrowserRouter } from "react-router";
import { MainDashboard } from "./components/MainDashboard";
import { BillingPage } from "./components/billing/BillingPage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { CheckoutConfigPage } from "./components/settings/CheckoutConfigPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainDashboard,
  },
  {
    path: "/billing",
    Component: BillingPage,
  },
  {
    path: "/settings",
    Component: SettingsPage,
  },
  {
    path: "/configure-agent",
    Component: CheckoutConfigPage,
  },
]);
