// src/views/account/AccountView.tsx
import AccountSidebar from "@/components/account/AccountSidebar.tsx";
import { Outlet } from "react-router-dom";

function AccountView() {
  return (
    <div className="flex min-h-screen">
      <AccountSidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountView;
