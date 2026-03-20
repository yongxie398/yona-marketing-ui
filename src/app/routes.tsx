import { createBrowserRouter } from "react-router";
import { MainDashboard } from "./components/MainDashboard";
import { BillingPage } from "./components/billing/BillingPage";
import { SettingsPage } from "./components/settings/SettingsPage";

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
]);
