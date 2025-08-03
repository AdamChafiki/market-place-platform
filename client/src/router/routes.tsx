import HomeView from "@/views/home/HomeView";
import ListView from "@/views/announcement/AnnoucementListView";
import LoginView from "@/views/auth/LoginView";
import RegisterView from "@/views/auth/RegisterView";
import NotFoundView from "@/views/not-found/NotFoundView";
import AnnoucementCreate from "@/views/announcement/AnnoucementCreate";
import AnnouncementDetails from "@/views/announcement/AnnouncementDetails";

import GuestOnlyRoute from "@/components/routes/GuestOnlyRoute";
import PrivateRoute from "@/components/routes/PrivateOnlyRoute";

export const routes = [
  { path: "/", element: <HomeView /> },
  { path: "/browze", element: <ListView /> },
  {
    path: "/register",
    element: (
      <GuestOnlyRoute>
        <RegisterView />
      </GuestOnlyRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestOnlyRoute>
        <LoginView />
      </GuestOnlyRoute>
    ),
  },
  {
    path: "/announcement/create",
    element: (
      <PrivateRoute>
        <AnnoucementCreate />
      </PrivateRoute>
    ),
  },
  {
    path: "/announcement/:id",
    element: <AnnouncementDetails />,
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
];
