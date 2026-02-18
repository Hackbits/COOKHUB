import { Suspense } from "react";
import DiscoveryClient from "@/components/discovery/DiscoveryClient";
import { getServerRecipes } from "@/lib/services/server/recipe-service";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DiscoveryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; filter?: string }>;
}) {
  const params = await searchParams;
  const initialRecipes = await getServerRecipes();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <Search className="animate-pulse mb-4 mx-auto" size={48} />
            <p className="font-bold">Loading Discovery...</p>
          </div>
        </div>
      }
    >
      <DiscoveryClient
        initialRecipes={initialRecipes}
        initialQuery={params.q}
        initialFilter={params.filter}
      />
    </Suspense>
  );
}
