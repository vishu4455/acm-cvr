import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { useCursorStore } from '@/store/cursorStore';

const fieldBase =
  'w-full bg-surface-card border border-border-subtle rounded-sm px-4 py-3 text-body-sm text-text-primary placeholder:text-text-muted transition-colors duration-150 ease-power2-out focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-focus-ring';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, ...props }: InputProps) {
  const setMode = useCursorStore((s) => s.setMode);
  return (
    <label htmlFor={id} className="block">
      <span className="block font-mono text-label uppercase tracking-widest text-text-muted mb-2">
        {label}
      </span>
      <input
        id={id}
        className={fieldBase}
        onMouseEnter={() => setMode('text')}
        onMouseLeave={() => setMode('default')}
        {...props}
      />
    </label>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, id, ...props }: TextareaProps) {
  const setMode = useCursorStore((s) => s.setMode);
  return (
    <label htmlFor={id} className="block">
      <span className="block font-mono text-label uppercase tracking-widest text-text-muted mb-2">
        {label}
      </span>
      <textarea
        id={id}
        className={`${fieldBase} resize-none`}
        onMouseEnter={() => setMode('text')}
        onMouseLeave={() => setMode('default')}
        {...props}
      />
    </label>
  );
}
