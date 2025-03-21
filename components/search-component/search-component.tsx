"use client";

import { searchUsers } from "@/app/actions/search";
import { Input } from "@/components/ui/input";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Profile } from "@/utils/supabase/database";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Skeleton } from "../ui/skeleton";
import UserInfo from "../user-info";

interface SearchResult {
  type: "user";
  data: Profile;
}

const UserSkeleton = () => (
  <div className="flex items-center gap-3 p-2">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-3 rounded w-24" />
      <Skeleton className="h-3 rounded w-32" />
    </div>
  </div>
);

const LoadingSkeletons = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, index) => (
      <UserSkeleton key={index} />
    ))}
  </div>
);

export function SearchComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    setResults([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    if (query.length === 0) {
      setResults([]);
      return;
    }

    startTransition(async () => {
      try {
        const searchResults = await searchUsers(query);
        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    });
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "user") {
      router.push(`/${result.data.username}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <SidebarMenuItem
        onClick={toggleSearch}
        className={cn(
          "flex items-center justify-center lg:justify-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer text-base"
        )}
      >
        <Search size={20} />
        <span className="hidden lg:inline">Search</span>
      </SidebarMenuItem>

      {/* Secondary Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-80 bg-sidebar border-l transform transition-transform duration-200 ease-in-out z-50",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Search</h2>
            <button
              onClick={toggleSearch}
              className="p-2 hover:bg-muted rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 border rounded-md px-3 py-2 mb-4">
            <Search className="w-4 h-4 opacity-50" />
            <Input
              placeholder="Search users..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 bg-transparent"
              onChange={handleSearch}
              autoFocus
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {isPending ? (
              <LoadingSkeletons />
            ) : results.length === 0 ? (
              <div className="py-4 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <UserInfo
                    variant="hover"
                    onclick={() => handleResultClick(result)}
                    key={index}
                    username={result.data.username}
                    full_name={result.data.full_name ?? ""}
                    avatar_url={result.data.avatar_url ?? ""}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 z-40" onClick={toggleSearch} />}
    </>
  );
}
