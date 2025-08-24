import Profile from "@/app/_components/Profile";
import RouteGuard from "@/app/_components/RouteGuard";

function page() {
  return (
    <RouteGuard requireAuth={true}>
      <Profile />
    </RouteGuard>
  );
}

export default page;
