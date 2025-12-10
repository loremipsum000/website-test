import { SwitchProps } from "@radix-ui/react-switch";
import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";

export const UserArchetypeSwitch = ({ ...props }: SwitchProps) => {
  return (
    <Switch
      {...props}
      className={cn(
        "[&>span]:text-white data-[state=unchecked]:bg-primary data-[state=checked]:bg-primary",
        props.className
      )}
    />
  );
};
