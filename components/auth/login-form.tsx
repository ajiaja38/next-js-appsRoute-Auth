"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import CardWrapper from "./card-wrapper";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form/form-error";
import FormSuccess from "@/components/form/form-success";
import { loginAction } from "@/actions/login.action";
import FormFieldWrapper from "../form/form-fields-wrapper";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      loginAction(values).then((data) => {
        setSuccess(data.success);
        setError(data.error);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/sign-up"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormFieldWrapper
              form={form}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              isPending={isPending}
            />
            <FormFieldWrapper
              form={form}
              name="password"
              label="Password"
              placeholder="******"
              type="password"
              isPending={isPending}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button size="lg" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
