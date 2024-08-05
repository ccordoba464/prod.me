"use client";

import { useState } from "react";
import { Input, Divider } from "@chakra-ui/react";
import CommentComponent from "@/components/comments/Comment";

interface CommentSectionProps {
  comments: Array<{
    id: string;
    user_id: string;
    track_id: string;
    content: string;
    created_at: Date;
    updated_at: Date;
  }>;
}

const CommentSection = ({ comments }: CommentSectionProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleClear = () => setIsFocused(false); // Add your clear logic here

  return (
    <div className="flex flex-col text-sm">
      <div className="flex items-center justify-between mb-2">
        <span>{comments.length + " Comments"}</span>
        <button className="bg-red-500 text-white font-bold rounded-md p-1 mr-1">
          Sort by
        </button>
      </div>
      <Divider />

      <div className="mt-4">
        <div className="flex flex-col mb-4">
          <div className="flex">
            <div className="w-[40px] h-[40px] overflow-hidden bg-[#3b4045] rounded-full mr-4"></div>
            <Input
              variant="flushed"
              size="sm"
              placeholder="Write a comment..."
              _placeholder={{
                opacity: 1,
                color: "gray.500",
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          {isFocused && (
            <div className="flex mb-2 justify-end ">
              <button
                className="bg-red-500 text-white font-bold rounded-md px-2 mr-1 text-sm"
                onClick={handleClear}
              >
                Clear
              </button>
              <button className="bg-red-500 text-white font-bold rounded-md p-1 mr-1 text-sm">
                Comment
              </button>
            </div>
          )}
        </div>

        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
        <CommentComponent />
      </div>
    </div>
  );
};

export default CommentSection;
