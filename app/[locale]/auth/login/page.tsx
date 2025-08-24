import Login from "@/app/_components/Login";
import RouteGuard from "@/app/_components/RouteGuard";

function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background px-4">
      <div className="w-full max-w-md bg-white dark:bg-card rounded-2xl shadow-xl p-6 sm:p-8">
        <RouteGuard requireAuth={false}>
          <Login />
        </RouteGuard>
      </div>
    </div>
  );
}

export default page;
