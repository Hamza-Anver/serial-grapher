import React, { useState} from "react";
import { Container } from "@/components/ui/generic-card";
import GraphWrapper, {
  EditSection,
  GraphSection,
} from "../compoundui/genericgraph";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";

import { useToast } from "@/hooks/use-toast";

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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Enter a graph title",
    })
    .min(1)
    .default("Initial Title"),

  numrows: z.coerce
    .number({
      required_error: "Enter number of rows for graph",
    })
    .gte(1)
    .default(10),

  timeStamp: z.boolean().default(true),

  graphsource: z.string({
    required_error: "Select a source to use",
  }),
});

export default function EgGraph() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [selfParams, setSelfParams] = useState({
    title: "Initial Title",
    numRows: 10,
    timeStamp: true,
    datasource: "None",
  });

  const [data, setData] = useState<any[]>([]);

  const { toast } = useToast();

  function addData(newdata: any) {
    setData((data: any) => [...data, newdata]);
    console.log("Data added: ", data);
  }

  function onEditFormSubmit(values: z.infer<typeof formSchema>) {
    setSelfParams({
      title: values.title,
      numRows: values.numrows,
      timeStamp: values.timeStamp,
      datasource: values.graphsource,
    });

    setData([]);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(selfParams, null, 2)}
          </code>
        </pre>
      ),
    });

    if (values.graphsource === "None") {
      for (let i = 0; i < values.numrows; i++) {
        setTimeout(() => {
          addData({
            data: "New Data Point",
            timeStamp: new Date().toISOString(),
          });
        }, 2000 * i);

        toast({
          title: "Created new data point simulations",
          description: `${values.numrows} new data points will be added to the graph`,
        });
      }
    }

    console.log("Form submitted with values: ", values);
  }

  function renderGraph(data: any[], params: any) {
    console.log("Rendering graph with data: ", data, " and params: ", params);

    // Create a table
    return (
      <Table>
        <TableCaption>{params.title}</TableCaption>
        <TableHeader>
          <TableRow>
            {selfParams.timeStamp && <TableHead>Timestamp</TableHead>}
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: params.numRows }).map((_, i) => (
            <TableRow key={i}>
              {data.length > i && (
                <>
                  {selfParams.timeStamp && (
                    <TableCell>{data[data.length - i]?.timeStamp}</TableCell>
                  )}
                  <TableCell>{data[data.length - i]?.data}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <GraphWrapper>
      <GraphSection>
        <Container title={selfParams.title}>
          {renderGraph(data, selfParams)}
        </Container>
      </GraphSection>
      <EditSection>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onEditFormSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graph Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Initial Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the title of the graph at the top
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numrows"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Rows</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>Number of rows in the table</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeStamp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Enable timestamp</FormLabel>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a DataSource" defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="None" value="None">
                        None
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
      </EditSection>
    </GraphWrapper>
  );
}
