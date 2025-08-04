import { useParams } from "react-router-dom";
import { useAnnouncementById } from "@/hooks/announcementHook/useAnnoucementById";
import { useAuthUser } from "@/hooks/authHook/useAuthUser";
import { useDeleteAnnouncement } from "@/hooks/announcementHook/useDeleteAnnouncement";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  MapPin,
  Phone,
  User,
  Wallet,
  MessageCircle,
  Flag,
  Pencil,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "@/utils/date";
import { useState } from "react";
import DeleteAnnouncementModal from "@/components/annoucement/DeleteAnnouncementModal";
import { UpdateAnnouncementModal } from "@/components/annoucement/UpdateAnnouncementModal";

function AnnouncementDetails() {
  const { id } = useParams();
  const { data: currentUser } = useAuthUser();
  const { data: announcement, isLoading, error } = useAnnouncementById(id!);
  const { mutate: deleteAnnouncement, isPending } = useDeleteAnnouncement();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const handleDelete = () => {
    deleteAnnouncement(id!);
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Skeleton className="h-[400px] w-full rounded-xl mb-6" />
        <Skeleton className="h-7 w-1/3 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="flex justify-center items-center h-64 text-destructive">
        <AlertTriangle className="mr-2" />
        No announcement found.
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden shadow-lg rounded-2xl">
        <div className="grid md:grid-cols-2">
          <img
            src={announcement.imageUrl}
            alt={announcement.name}
            className="w-full h-full object-cover max-h-[500px]"
          />

          <CardContent className="p-6 space-y-5">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-primary">
                {announcement.name}
              </h1>
              <div className="text-muted-foreground text-sm">
                {formatDate(announcement.createdAt)}
              </div>
            </div>

            <div className="text-[16px] leading-relaxed text-foreground">
              {announcement.description}
            </div>

            <Separator />

            <div className="space-y-2 text-[15px]">
              <div className="flex items-center gap-2">
                <MapPin className="text-muted-foreground w-5 h-5" />
                <span className="font-medium">Location:</span>{" "}
                {announcement.location}
              </div>

              <div className="flex items-center gap-2">
                <Wallet className="text-muted-foreground w-5 h-5" />
                <span className="font-medium">Price:</span>
                <Badge className="text-base px-3 py-1 bg-green-500 hover:bg-green-600">
                  {announcement.price} MAD
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="text-muted-foreground w-5 h-5" />
                <span className="font-medium">Phone:</span>{" "}
                {announcement.hidePhone ? "Hidden" : announcement.phoneNumber}
              </div>

              <div className="flex items-center gap-2">
                <User className="text-muted-foreground w-5 h-5" />
                <span className="font-medium">User:</span>{" "}
                {announcement.user?.username || "N/A"}
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="default" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Send Message
              </Button>

              {!announcement.hidePhone && (
                <a
                  href={`https://wa.me/${announcement.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="gap-2 text-green-600 border-green-500 hover:bg-green-50"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
              )}

              <Button variant="destructive" className="gap-2 ml-auto">
                <Flag className="w-4 h-4" />
                Report
              </Button>

              {currentUser?.id === announcement.userId && (
                <>
                  <DeleteAnnouncementModal
                    handleDelete={handleDelete}
                    isPending={isPending}
                  />
                  <Button onClick={() => setIsEditOpen(true)}>
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                  <UpdateAnnouncementModal
                    open={isEditOpen}
                    announcement={announcement}
                    onClose={() => setIsEditOpen(false)}
                  />
                </>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}

export default AnnouncementDetails;
