export function CapabilityCallouts({ items }: { items: string[] }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#d5d5d5] bg-white px-4 py-2 text-[15px] tracking-[-0.15px] text-[#4d4d4d]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
