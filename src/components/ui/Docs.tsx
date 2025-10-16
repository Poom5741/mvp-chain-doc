import React, { useState, PropsWithChildren, useRef, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

type HeadingProps = PropsWithChildren<{
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
}>;

export function AnimatedHeading({
  as = "h2",
  className = "",
  children,
}: HeadingProps) {
  const Tag = as as any;
  const base = {
    h1: "text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100",
    h2: "text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100",
    h3: "text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200",
    h4: "text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200",
  }[as];
  return (
    <Tag className={`tracking-tight animate-fade-in-up ${base} ${className}`}>
      {children}
    </Tag>
  );
}

export function Section({
  className = "",
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={`rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm bg-white/70 dark:bg-black/40 backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}

export function Lead({
  className = "",
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <p
      className={`text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-2 ${className}`}
    >
      {children}
    </p>
  );
}

export function Callout({
  type = "note",
  className = "",
  children,
}: PropsWithChildren<{
  type?: "note" | "tip" | "warning" | "important";
  className?: string;
}>) {
  const ring =
    type === "warning"
      ? "border-amber-300"
      : type === "important"
        ? "border-sky-300"
        : type === "tip"
          ? "border-emerald-300"
          : "border-gray-200";
  return (
    <div
      className={`border ${ring} rounded-lg p-4 bg-white/80 dark:bg-black/30 ${className}`}
    >
      {children}
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <hr className={`my-6 border-t border-gray-200 dark:border-gray-800 ${className}`} />
  );
}

export function PageHeader({
  title,
  subtitle,
  children,
}: PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <div className="page-header">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
      )}
      {children}
    </div>
  );
}

export function Card({
  title,
  className = "",
  children,
}: PropsWithChildren<{ title?: string; className?: string }>) {
  return (
    <div className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/30 p-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {title}
        </h3>
      )}
      <div className="prose dark:prose-invert max-w-none">{children}</div>
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`mdx-figure ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function DisclaimerModal({
  title = "Disclaimer",
  buttonLabel = "Read Disclaimer",
  children,
}: PropsWithChildren<{ title?: string; buttonLabel?: string }>) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-md bg-gray-900 text-white px-4 py-2 font-medium hover:bg-gray-800 transition"
      >
        {buttonLabel}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-[92%] max-w-2xl rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SpecList({ children }: PropsWithChildren) {
  return (
    <ul className="grid md:grid-cols-2 gap-2 mt-4 list-none pl-0">
      {children}
    </ul>
  );
}

export function LangTabs({ children }: PropsWithChildren) {
  const { i18n } = useDocusaurusContext();
  const current = i18n?.currentLocale === "en" ? "en" : "th";
  return (
    <Tabs
      groupId="lang"
      defaultValue={current}
      values={[
        { label: "ภาษาไทย", value: "th" },
        { label: "English", value: "en" },
      ]}
    >
      {children}
    </Tabs>
  );
}

export const LangTabItem = TabItem;

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      const text = getText();
      if (!text) return;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // noop
    }
  };
  return (
    <button
      onClick={onCopy}
      aria-label="Copy to clipboard"
      className="ml-auto shrink-0 inline-flex items-center gap-1 rounded-md border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

type SpecItemProps = {
  label: string;
  value: React.ReactNode;
  copyText?: string;
};

function SpecItemBase({
  label,
  value,
  copyText,
  variant = "auto",
}: SpecItemProps & { variant?: "auto" | "light" | "dark" }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const [showCopy, setShowCopy] = useState(false);

  useEffect(() => {
    const el = valueRef.current;
    if (!el) return;
    const hasMedia = !!el.querySelector("img, svg, .mermaid, pre");
    const text = (el.innerText || "").trim();
    setShowCopy(
      !hasMedia && (copyText ? copyText.trim().length > 0 : text.length > 0)
    );
  }, [value, copyText]);

  const containerClass =
    variant === "light"
      ? "bg-gray-50 border border-gray-200"
      : variant === "dark"
        ? "bg-gray-900/40 border border-gray-700"
        : "bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-800";

  const labelClass =
    variant === "light"
      ? "text-sm text-gray-500"
      : variant === "dark"
        ? "text-sm text-gray-400"
        : "text-sm text-gray-500 dark:text-gray-400";

  const valueClass =
    variant === "light"
      ? "text-sm text-gray-900"
      : variant === "dark"
        ? "text-sm text-gray-100"
        : "text-sm text-gray-900 dark:text-gray-100";

  return (
    <li
      className={`flex flex-col md:flex-row items-start md:items-center gap-1 p-2 rounded-lg overflow-hidden ${containerClass}`}
    >
      <span className={`w-[100px] md:w-[120px] shrink-0 ${labelClass}`}>
        {label}
      </span>
      <span
        ref={valueRef}
        className={`flex-1 min-w-0 truncate break-words ${valueClass}`}
      >
        {value}
      </span>
      {showCopy && (
        <CopyButton
          getText={() => copyText ?? (valueRef.current?.innerText || "")}
        />
      )}
    </li>
  );
}

export function SpecItemLight(props: SpecItemProps) {
  return <SpecItemBase variant="light" {...props} />;
}

export function SpecItemDark(props: SpecItemProps) {
  return <SpecItemBase variant="dark" {...props} />;
}

export function SpecItem(props: SpecItemProps) {
  return <SpecItemBase variant="auto" {...props} />;
}

export default {};
