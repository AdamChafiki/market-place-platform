import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import useCreateMessage from "@/hooks/messageHook/useCreateMessage";

type Props = {
  receiverId: string;
  isOpen: boolean;
  onClose: () => void;
};

export function SendMessageModal({ receiverId, isOpen, onClose }: Props) {
  const [content, setContent] = useState("");
  const { sendMessage, isLoading } = useCreateMessage();

  const handleSubmit = () => {
    sendMessage(
      { receiverId, content },
      {
        onSuccess: () => {
          setContent("");
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a Message</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Label htmlFor="message">Your Message</Label>
          <Textarea
            id="message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !content.trim()}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
