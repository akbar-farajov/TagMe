"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Profile } from "@/utils/supabase/database";
import { searchUsers } from "@/app/actions/search";
import { useTransition } from "react";

interface SearchResult {
  type: "user";
  data: Profile;
}

export function SearchComponent() {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleSearch = () => {
    setOpen(!open);
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
      setOpen(false);
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
        <Search size={24} />
        <span className="hidden lg:inline">Search</span>
      </SidebarMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle className="hidden">Search</DialogTitle>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border rounded-md px-3 py-2">
              <Search className="w-4 h-4 opacity-50" />
              <Input
                placeholder="Search users..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                onChange={handleSearch}
              />
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {isPending ? (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  Searching...
                </div>
              ) : results.length === 0 ? (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  No results found.
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      onClick={() => handleResultClick(result)}
                      className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                    >
                      {result.data.avatar_url ? (
                        <div className="size-8 relative aspect-square">
                          <Image
                            src={result.data.avatar_url}
                            alt={result.data.username}
                            className="rounded-full object-cover"
                            fill
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Search className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {result.data.username}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {result.data.full_name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
