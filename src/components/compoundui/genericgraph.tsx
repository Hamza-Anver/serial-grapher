import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";

type GraphWrapperProps = {
  children: React.ReactNode; // Will include GraphSection and EditSection
};

const GraphWrapper: React.FC<GraphWrapperProps> = ({ children }) => {
  // Separate children into GraphSection and EditSection
  const graphSection = React.Children.toArray(children).find(
    (child: any) => child.type.displayName === "GraphSection"
  );
  const editSection = React.Children.toArray(children).find(
    (child: any) => child.type.displayName === "EditSection"
  );

  return (
    <>
      <Dialog>
        <div className="relative">
          {graphSection}
          <DialogTrigger asChild>
            <Button className="absolute top-1 right-4 p-0" variant="ghost">
              <EllipsisVertical />
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Graph</DialogTitle>
            <DialogDescription>STILL IN DEVELOPMENT</DialogDescription>
          </DialogHeader>
          {editSection}
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GraphWrapper;

export const GraphSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="space-y-4">{children}</div>;
};

GraphSection.displayName = "GraphSection";

export const EditSection: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="space-y-4">{children}</div>;
};

EditSection.displayName = "EditSection";
