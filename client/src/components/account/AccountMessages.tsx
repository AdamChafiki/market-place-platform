import useMessagesForUser from "@/hooks/messageHook/useMessagesForUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function AccountMessages() {
  const { data, isLoading, error } = useMessagesForUser();

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive font-semibold mt-8">
        Failed to load messages.
      </div>
    );
  }

  if (!data || data.messages.length === 0) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        No messages found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-foreground mb-6">Your Messages</h1>
      {data.messages.map((msg) => (
        <Card key={msg.id} className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base font-medium text-primary">
              From <span className="font-semibold">{msg.sender.username}</span>{" "}
              to <span className="font-semibold">{msg.receiver.username}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground">{msg.content}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AccountMessages;
