import { createElement, PropsWithChildren } from "react";

type TypographyProps = PropsWithChildren & { className?: string };

export const H1 = ({ className, ...props }: TypographyProps) =>
  createElement("h1", {
    className: `text-6xl leading-none ${className}`,
    ...props,
  });

export const H2 = ({ className, ...props }: TypographyProps) =>
  createElement("h2", {
    className: `text-5xl leading-none ${className}`,
    ...props,
  });

export const H3 = ({ className, ...props }: TypographyProps) =>
  createElement("h3", {
    className: `text-h5 leading-none ${className}`,
    ...props,
  });

export const H4 = ({ className, ...props }: TypographyProps) =>
  createElement("h4", {
    className: `text-h6 leading-none ${className}`,
    ...props,
  });

export const H5 = ({ className, ...props }: TypographyProps) =>
  createElement("h5", {
    className: `text-body-lg leading-none ${className}`,
    ...props,
  });

export const H6 = ({ className, ...props }: TypographyProps) =>
  createElement("h6", {
    className: `text-body-lg leading-none ${className}`,
    ...props,
  });

export const TextLarge = ({ className, ...props }: TypographyProps) =>
  createElement("p", {
    className: `text-body-lg leading-normal ${className}`,
    ...props,
  });

export const Text = ({ className, ...props }: TypographyProps) =>
  createElement("p", {
    className: `text-base ${className}`,
    ...props,
  });

export const TextSmall = ({ className, ...props }: TypographyProps) =>
  createElement("p", {
    className: `text-body-sm leading-relaxed ${className}`,
    ...props,
  });

export const TextMicro = ({ className, ...props }: TypographyProps) =>
  createElement("span uppercase", {
    className: `text-body-xs leading-normal ${className}`,
    ...props,
  });

export const Strong = ({ className, ...props }: TypographyProps) =>
  createElement("strong", {
    className: `font-bold ${className}`,
    ...props,
  });

export const Em = ({ className, ...props }: TypographyProps) =>
  createElement("em", {
    className: `italic ${className}`,
    ...props,
  });

export const Caption = ({ className, ...props }: TypographyProps) =>
  createElement("span uppercase", {
    className: `text-body-xs leading-tight ${className}`,
    ...props,
  });
