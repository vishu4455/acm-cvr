export function TraceDivider() {
  return (
    <div className="relative w-full h-px bg-border-subtle my-16" aria-hidden="true">
      <span className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-[7px] h-[7px] rounded-full bg-circuit-node-idle" />
    </div>
  );
}
