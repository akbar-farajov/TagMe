"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarMenuItem } from "../ui/sidebar";
import { CirclePlus, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { FileUpload } from "../ui/file-upload";
import { uploadPost } from "@/actions/posts";
import { useRouter } from "next/navigation";

export function CreatePostModal() {
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleFileUpload = async (files: File[]) => {
    setSelectedFile(files[0]);
    setStep(2);
  };

  const handleShare = async () => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("caption", caption);

      const result = await uploadPost(formData);

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
        return;
      }

      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      setStep(1);
      setSelectedFile(null);
      setCaption("");
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>
          <Button variant="ghost" className="md:hidden">
            <CirclePlus size={20} />
          </Button>

          <SidebarMenuItem
            className={cn(
              "items-center justify-center hidden md:flex lg:justify-start gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer text-base"
            )}
          >
            <CirclePlus size={24} />
            <span className="hidden lg:inline">Create Post</span>
          </SidebarMenuItem>
        </div>
      </DialogTrigger>
      <DialogContent
        aria-describedby="Post create"
        className="max-w-xs sm:max-w-md bg-background px-0 pb-0 !rounded-xl"
      >
        <DialogHeader className="flex items-center justify-between mt-2 md:mt-0">
          {step === 2 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setStep(1)}
              className="absolute left-4"
            >
              <ArrowLeft size={20} />
            </Button>
          )}

          <DialogTitle className="text-center flex-1">
            {step === 1 ? "Create New Post" : ""}
          </DialogTitle>
          <DialogDescription className="invisible">Hello</DialogDescription>

          {step === 2 && (
            <Button
              variant="ghost"
              onClick={handleShare}
              disabled={isLoading}
              className="absolute right-4 text-blue-500 hover:text-blue-600"
            >
              {isLoading ? "Sharing..." : "Share"}
            </Button>
          )}
        </DialogHeader>

        <div className="min-h-96 max-w-md bg-muted rounded-b-xl">
          {step === 1 ? (
            <div className="h-full flex items-center justify-center p-4">
              <FileUpload onChange={handleFileUpload} />
            </div>
          ) : (
            <div className="flex flex-col gap-4 h-full p-4 bg-background rounded-b-xl">
              <div className=" flex border-b h-40 md:h-48 rounded-xl mt-4">
                {selectedFile && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    className="fill object-cover rounded"
                  />
                )}
              </div>{" "}
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="flex-1 resize-none bg-transparent border-none focus:ring-0 outline-none"
                rows={4}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
