import { useAuthUser } from "@/hooks/useAuthUser";

function HomeView() {
  const { data: user, isLoading, isError, error } = useAuthUser();
  console.log("user", user);

  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Failed to load profile.{error?.message}</p>;

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome, {user.username}!</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default HomeView;
