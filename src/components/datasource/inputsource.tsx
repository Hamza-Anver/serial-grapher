export interface InputSourceType {
  type: string;
  simulation: boolean;
  description: string;
}

export interface InputSourceProps {
  name: string;
}

import React, { useContext } from "react";

import { useToast } from "@/hooks/use-toast";

import { Container } from "@/components/ui/generic-card";
import { Button } from "../ui/button";

import { FilePenLine } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LocalStorageContext } from "../logical/localstorage";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  sourcename: z.string({
    required_error: "Enter a source name",
  }),

  sourcetype: z.string({
    required_error: "Select a source type to use",
  }),
});

interface InputFormProps {
  sourceName: string;
}

export function InputForm({ sourceName }: InputFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sourcename: sourceName,
      sourcetype: "Simulated Table Data",
    },
  });

  const { setKeyValue, getKeyValue } = useContext(LocalStorageContext);

  const { toast } = useToast();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // TODO: check for uniqueness and then inform user prior to saving
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    if (data.sourcename !== sourceName) {
      let sourceArray = JSON.parse(
        getKeyValue("sourcearray") as string
      ) as string[];
      if (!sourceArray) {
        sourceArray = [];
      }
      const newSourceArray = [];
      for (let i = 0; i < sourceArray.length; i++) {
        if (sourceArray[i] === sourceName) {
          newSourceArray.push(data.sourcename);
        } else {
          newSourceArray.push(sourceArray[i]);
        }
      }
      setKeyValue("sourcearray", newSourceArray);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="sourcename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Name</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sourcetype"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edit Input Source</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a DataSource" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Simulated Table Data">
                    Simulated Table Data
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Remember, still in dev mode</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default function InputSource({ name }: InputSourceProps) {
  const displaySourceData = (): React.ReactNode => {
    console.log("Displaying source data");
    return name;
  };

  return (
    <Dialog>
      <Container title={name}>
        <DialogTrigger asChild>
          <Button className="absolute top-2 right-3" variant="ghost">
            <FilePenLine />
          </Button>
        </DialogTrigger>
        <h1 className="text-2xl font-bold">{displaySourceData()}</h1>
      </Container>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Input Source</DialogTitle>
          <DialogDescription>STILL IN DEVELOPMENT</DialogDescription>
        </DialogHeader>
        <InputForm sourceName={name} />
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
