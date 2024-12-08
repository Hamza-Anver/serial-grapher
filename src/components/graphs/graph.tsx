import React, { useContext } from "react";
import ReactDOM from "react-dom";

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
  graphname: z.string({
    required_error: "Enter a source name",
  }),

  graphsource: z.string({
    required_error: "Select a source to use",
  }),
});

interface GraphProps {
  graphName: string;
}

const arraykey = "grapharray";

export function GraphEditForm({ graphName }: GraphProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      graphname: graphName,
      graphsource: "None",
    },
  });

  const { setKeyValue, getKeyValue } = useContext(LocalStorageContext);

  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // TODO: check for uniqueness and then inform user prior to saving
    console.log("HUH");
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    if (data.graphname !== graphName) {
      let graphArray = JSON.parse(getKeyValue(arraykey) as string) as string[];
      if (!graphArray) {
        graphArray = [];
      }
      const newGraphArray = [];
      for (let i = 0; i < graphArray.length; i++) {
        if (graphArray[i] === graphName) {
          newGraphArray.push(data.graphname);
          console.log("Replacing graph name");
        } else {
          newGraphArray.push(graphArray[i]);
        }
      }
      console.log("Attempting to set new graph array");
      setKeyValue("grapharray", newGraphArray);
    }
  }

  const sourceList = JSON.parse(
    getKeyValue("sourcearray") as string
  ) as string[];

  const sourceOptions = sourceList.map((source) => (
    <SelectItem key={source} value={source}>
      {source}
    </SelectItem>
  ));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="graphname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Graph Name</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="graphsource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Set Graph Source</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a DataSource" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{sourceOptions}</SelectContent>
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

export default function GraphComponent({ graphName }: GraphProps) {
  return (
    <Dialog>
      <Container title={graphName}>
        <DialogTrigger asChild>
          <Button className="absolute top-2 right-3" variant="ghost">
            <FilePenLine />
          </Button>
        </DialogTrigger>
      </Container>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Graph</DialogTitle>
          <DialogDescription>STILL IN DEVELOPMENT</DialogDescription>
        </DialogHeader>
        <GraphEditForm graphName={graphName} />
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
