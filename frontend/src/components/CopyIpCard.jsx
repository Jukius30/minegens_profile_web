import { useState } from 'react';

export default function CopyIpCard({ ipAddress }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(ipAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) { /* fallback */ }
  }

  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/[0.04] py-2 pl-[18px] pr-2 backdrop-blur">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">Server IP</div>
        <div className="text-base font-bold tracking-tight text-white">{ipAddress}</div>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-[10px] bg-gradient-to-b from-[#f59e0b] to-[#d97706] px-4 py-2.5 text-sm font-semibold text-[#1a0d07] transition hover:brightness-105 focus:outline-none"
      >
        {copied ? 'Copied!' : 'Copy IP'}
      </button>
    </div>
  );
}