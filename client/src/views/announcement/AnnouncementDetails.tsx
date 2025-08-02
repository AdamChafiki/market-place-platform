import { useParams } from "react-router-dom";
import { useAnnouncementById } from "@/hooks/announcementHook/useAnnoucementById";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, MapPin, Phone, User, Wallet } from "lucide-react";

function AnnouncementDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useAnnouncementById(id!);

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

  if (error || !data) {
    return (
      <div className="flex justify-center items-center h-64 text-destructive">
        <AlertTriangle className="mr-2" />
        Aucune annonce trouvée.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Card className="overflow-hidden shadow-lg rounded-2xl">
        <img
          src={data.imageUrl}
          alt={data.name}
          className="w-full h-[400px] object-cover"
        />
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-primary">{data.name}</h1>
            <div className="text-muted-foreground text-sm">
              {new Date(data.createdAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <Separator />

          <div className="text-[16px] leading-relaxed text-foreground">
            {data.description}
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px]">
            <div className="flex items-center gap-2">
              <MapPin className="text-muted-foreground w-5 h-5" />
              <span className="font-medium">Emplacement:</span> {data.location}
            </div>

            <div className="flex items-center gap-2">
              <Wallet className="text-muted-foreground w-5 h-5" />
              <span className="font-medium">Prix:</span>
              <Badge className="text-base px-3 py-1 bg-green-500 hover:bg-green-600">
                {data.price} MAD
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="text-muted-foreground w-5 h-5" />
              <span className="font-medium">Téléphone:</span>{" "}
              {data.hidePhone ? "Caché" : data.phoneNumber}
            </div>

            <div className="flex items-center gap-2">
              <User className="text-muted-foreground w-5 h-5" />
              <span className="font-medium">Utilisateur:</span>{" "}
              {data.user?.username || "N/A"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnnouncementDetails;
