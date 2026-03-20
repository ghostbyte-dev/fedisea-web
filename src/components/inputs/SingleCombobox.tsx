"use client";

import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import { Check, ChevronsUpDown, SearchIcon, X } from "lucide-react";
import * as React from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SingleComboboxProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value?: string) => void;
  label?: string;
  className?: string;
  emptyMessage?: string;
  clearable?: boolean;
}

const SingleCombobox = ({
  options,
  placeholder = "Select option...",
  value,
  onValueChange,
  label,
  className,
  emptyMessage = "No results found.",
  clearable = true,
}: SingleComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    if (val === value && clearable) {
      onValueChange?.(undefined);
    } else {
      onValueChange?.(val);
    }
    setOpen(false);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        // biome-ignore lint/a11y/noLabelWithoutControl: <>
        <label>{label}</label>
      )}

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            className="flex items-center justify-between gap-2 px-3 py-2 min-h-[42px] bg-card text-sm border border-border rounded-xl outline-none hover:bg-slate-800 transition-all focus:ring-2 focus:ring-blue-500/50 w-full text-left"
          >
            <div className="flex items-center justify-between w-full truncate">
              {selectedOption ? (
                <>
                  <span className="truncate">{selectedOption.label}</span>
                  {clearable && (
                    <X
                      className="w-4 h-4 hover:text-white cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onValueChange?.(undefined);
                      }}
                    />
                  )}
                </>
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="w-4 h-4 shrink-0 text-gray-500 ml-auto" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={5}
            onPointerDownOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.closest('[role="combobox"]')
              ) {
                e.preventDefault();
              }
            }}
            className="z-50 w-(--radix-popover-trigger-width) p-0 overflow-hidden bg-card border border-border rounded-xl shadow-2xl"
          >
            <Command
              className="flex flex-col h-full w-full"
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            >
              <div className="flex items-center px-3 border-b border-border">
                <SearchIcon className="h-4 w-4" />
                <Command.Input
                  placeholder="Search..."
                  autoFocus
                  className="flex h-10 w-full bg-transparent py-3 text-sm outline-none border-none ring-0 text-white placeholder:text-gray-500 ml-2"
                />
              </div>

              <Command.List className="p-1 max-h-64 overflow-y-auto overflow-x-hidden">
                <Command.Empty className="py-6 text-center text-sm">
                  {emptyMessage}
                </Command.Empty>

                <Command.Group>
                  {options.map((opt) => {
                    const isSelected = value === opt.value;

                    return (
                      <Command.Item
                        key={opt.value}
                        value={opt.label}
                        disabled={opt.disabled}
                        onSelect={() => handleSelect(opt.value)}
                        className="relative flex items-center w-full px-8 py-2 text-sm rounded-lg outline-none cursor-default select-none 
                                   data-[selected='true']:bg-slate-800 data-[selected='true']:text-white transition-colors"
                      >
                        <span className="truncate">{opt.label}</span>
                        {isSelected && (
                          <span className="absolute left-2 inline-flex items-center">
                            <Check className="w-4 h-4 text-primary" />
                          </span>
                        )}
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              </Command.List>
            </Command>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export default SingleCombobox;
