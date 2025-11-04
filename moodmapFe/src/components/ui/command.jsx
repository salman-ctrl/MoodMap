"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import { cn } from "./utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

function Command({ className, ...props }) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn("bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md", className)}
      {...props}
    />
  );
}

function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, ...props }) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({ className, ...props }) {
  return (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn("placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden", className)}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }) {
  return <CommandPrimitive.List data-slot="command-list" className={cn("max-h-[300px] overflow-y-auto", className)} {...props} />;
}

function CommandEmpty(props) {
  return <CommandPrimitive.Empty data-slot="command-empty" className="py-6 text-center text-sm" {...props} />;
}

function CommandGroup({ className, ...props }) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn("text-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium", className)}
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }) {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn("bg-border -mx-1 h-px", className)} {...props} />;
}

function CommandItem({ className, ...props }) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
        className
      )}
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }) {
  return <span data-slot="command-shortcut" className={cn("text-muted-foreground ml-auto text-xs", className)} {...props} />;
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
