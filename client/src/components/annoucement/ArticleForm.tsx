"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import useCreateAnnouncement from "@/hooks/announcementHook/useCreateAnnouncement";

// ✅ Updated schema with price
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description too short"),
  location: z.string().min(2, "Location is required"),
  phone: z.string().min(6, "Phone number too short"),
  price: z
    .number({ message: "Price must be a number" })
    .min(0, "Price is required"),
  image: z.any().optional(),
  hidePhone: z.boolean().optional(),
});

export default function ArticleForm() {
  const { createAnnoucement, isLoading } = useCreateAnnouncement();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      phone: "",
      price: 0,
      hidePhone: false,
      image: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("phoneNumber", values.phone);
    formData.append("price", values.price.toString());
    formData.append("hidePhone", String(values.hidePhone));
    if (values.image) {
      formData.append("image", values.image);
    }
    createAnnoucement(formData);
    form.reset();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Toaster position="bottom-right" richColors />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-card p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-primary">
          Post Announcement
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your item..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Rabat, Morocco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. +212 612 345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (MAD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price in dirhams"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hide Phone */}
            <FormField
              control={form.control}
              name="hidePhone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Hide phone number from public</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
