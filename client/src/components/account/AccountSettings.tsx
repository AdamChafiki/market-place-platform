import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthUser } from "@/hooks/authHook/useAuthUser";
import useUpdateProfile from "@/hooks/profileHook/useUpdateProfile";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

export default function AccountSettings() {
  const { data: user, isLoading } = useAuthUser();
  const { updateProfile, isLoading: loader, error } = useUpdateProfile();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        email: user.email,
      });
    }
  }, [user, form]);

  function onSubmit(values: FormData) {
    updateProfile(values);
  }

  if (isLoading) return <div>Loading user data...</div>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-md"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loader}>
          {loader ? "Updating..." : "Update"}
        </Button>
        {error && <p className="text-destructive mt-2">{error.message}</p>}
      </form>
    </Form>
  );
}
