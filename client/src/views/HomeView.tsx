import { testApi } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

function HomeView() {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["test"],
    queryFn: testApi,
  });

  console.log(isError, error);

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
