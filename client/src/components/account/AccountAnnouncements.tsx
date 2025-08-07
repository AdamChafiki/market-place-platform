import { useAnnoucementByUserId } from "@/hooks/announcementHook/useAnnoucementByUserId";
import { formatDate } from "@/utils/date";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import DeleteAnnouncementModal from "@/components/annoucement/DeleteAnnouncementModal";
import { UpdateAnnouncementModal } from "@/components/annoucement/UpdateAnnouncementModal";
import { useState } from "react";
import { useDeleteAnnouncement } from "@/hooks/announcementHook/useDeleteAnnouncement";

function AccountAnnouncements() {
  const { data = [], isLoading } = useAnnoucementByUserId();
  const { mutate: deleteAnnouncement, isPending } = useDeleteAnnouncement();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">My Announcements</h2>

      {data.length === 0 ? (
        <p className="text-muted-foreground">No announcements found.</p>
      ) : (
        <div className="rounded-xl border bg-muted">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-accent transition-colors"
                >
                  <TableCell>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-md border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{formatDate(item.createdAt)}</TableCell>
                  <TableCell className="text-primary font-semibold">
                    {item.price} DH
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedAnnouncement(item);
                        setIsEditOpen(true);
                      }}
                    >
                      Edit
                    </Button>

                    <DeleteAnnouncementModal
                      handleDelete={() => deleteAnnouncement(item.id!)}
                      isPending={isPending}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {selectedAnnouncement && (
            <UpdateAnnouncementModal
              open={isEditOpen}
              onClose={() => setIsEditOpen(false)}
              announcement={selectedAnnouncement}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AccountAnnouncements;
