import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dispatch, useState } from "react";
import { Action, usePostsDispatch } from "@/app/context/PostsContext";

const AddPost = () => {
  const [name, setName] = useState<string>("");
  const [desc, setDescription] = useState<string>("");
  const dispatch = usePostsDispatch() as Dispatch<Action>;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add post</DialogTitle>
            <DialogDescription>
              Fill the title and the description.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                className="mb-3"
                id="title"
                onChange={(e) => setName(e.target.value)}
                defaultValue=""
                placeholder="Insert a title ... "
              />
              <Input
                id="description"
                defaultValue=""
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Insert a description ... "
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={name === ""}
                type="button"
                variant="secondary"
                onClick={() => {
                  dispatch({
                    type: "ADD_POST",
                    post: {
                      id: Math.floor(Math.random() * 99999),
                      name: name,
                      description: desc,
                      createdAt: new Date().toDateString(),
                      stars: 119,
                      isStarred: false,
                    },
                  });
                }}
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPost;
