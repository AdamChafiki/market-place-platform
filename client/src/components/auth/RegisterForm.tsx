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
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useRegister from "@/hooks/authHook/useRegister";
import { Toaster } from "sonner";

const formSchema = z.object({
  username: z.string().min(4, { message: "Username is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["buyer", "seller"] as const, {
    error: "Role is required",
  }),
});

const step1Schema = formSchema.pick({
  username: true,
  email: true,
});

function RegisterForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const { signup, isLoading, error } = useRegister();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "buyer",
    },
  });

  // Handle step 1 validation and navigation
  const handleNextStep = async () => {
    // Validate only step 1 fields
    const step1Data = {
      username: form.getValues("username"),
      email: form.getValues("email"),
      password: form.getValues("password"),
    };

    try {
      step1Schema.parse(step1Data);

      const isValid = await form.trigger(["username", "email", "password"]);

      if (isValid) {
        setStep(2);
      }
    } catch (error) {
      console.log(error);
      await form.trigger(["username", "email", "password"]);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Submitted", values);
    signup(values);
    form.reset();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <Toaster position="bottom-right" richColors />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full border border-ring max-w-md bg-card text-card-foreground rounded-[var(--radius)] shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create your account
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="bg-muted border border-input text-foreground placeholder-muted-foreground"
                            {...field}
                          />
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
                        <FormLabel className="text-muted-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            className="bg-muted border border-input text-foreground placeholder-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="bg-muted border border-input text-foreground placeholder-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    className="w-full bg-primary cursor-pointer text-primary-foreground hover:bg-[oklch(0.6_0.2_47)] transition-all"
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <p className="mb-4 text-center text-lg font-medium">
                      Select your role
                    </p>
                    <div className="flex justify-center gap-4">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <>
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.95 }}
                              whileHover={{ scale: 1.05 }}
                              className={`w-32 rounded-md px-4 py-2 text-sm font-medium border ${
                                field.value === "buyer"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              onClick={() => field.onChange("buyer")}
                            >
                              Buyer
                            </motion.button>

                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.95 }}
                              whileHover={{ scale: 1.05 }}
                              className={`w-32 rounded-md px-4 py-2 text-sm font-medium border ${
                                field.value === "seller"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              onClick={() => field.onChange("seller")}
                            >
                              Seller
                            </motion.button>
                          </>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLoading}
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-primary text-primary-foreground hover:bg-[oklch(0.6_0.2_47)] transition-all"
                    >
                      Register
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </motion.div>
      {error && (
        <div className="mt-4 text-red-500 text-center">
          {error.message || "An error occurred. Please try again."}
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
