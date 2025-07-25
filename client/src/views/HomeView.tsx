// src/pages/HomeView.tsx
import { fetchProfile } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

function HomeView() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Failed to load profile.</p>;

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default HomeView;
