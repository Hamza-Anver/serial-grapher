"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ContainerProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: string;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  title,
  description,
  footer,
}) => {
  return (
    <Card className={`${className || "relative m-3"}`}>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

