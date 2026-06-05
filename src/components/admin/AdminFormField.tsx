export function AdminInput({
  label,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-xl border border-card-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        {...props}
      />
    </div>
  );
}

export function AdminTextarea({
  label,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        className="w-full resize-none rounded-xl border border-card-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        {...props}
      />
    </div>
  );
}

export function AdminSelect({
  label,
  id,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        className="w-full rounded-xl border border-card-border bg-background px-4 py-2.5 text-sm outline-none focus:border-accent"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
