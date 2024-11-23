export interface InputSourceType {
  type: string;
  simulation: boolean;
  description: string;
}

export interface InputSourceProps {
  name: string;
}

import { Container } from "@/components/ui/generic-card";

export default function InputSource({ name }: InputSourceProps) {
  return (
    <Container>
      <h1 className="text-2xl font-bold">{name}</h1>
    </Container>
  );
}
