'use client';
import {PostModal} from "@/app/components/post/PostModal";

export default function CreatePostPage() {

  return (
      <>
        <PostModal open={true} onClose={() => { window.history.back()}}/>
      </>

  );
}
