import {
  Code2,
  Database,
  Brain,
  Globe,
  Palette,
  Cpu,
  LineChart,
  Shield,
  Box,
  Layers,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Code2,
  Database,
  Brain,
  Globe,
  Palette,
  Cpu,
  LineChart,
  Shield,
  Box,
  Layers,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = iconMap[name] ?? Code2;
  return <Icon {...props} />;
}
