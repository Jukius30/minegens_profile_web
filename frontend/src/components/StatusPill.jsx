export default function StatusPill({ serverStatus }) {
  const online = serverStatus.online && !serverStatus.loading;
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-[11px] text-sm font-semibold ${
      serverStatus.loading ? 'border-white/15 bg-white/[0.04] text-zinc-400' : online ? 'border-emerald-500/30 bg-emerald-500/10 text-white' : 'border-rose-500/30 bg-rose-500/10 text-white'
    }`}>
      <span className={`h-2.5 w-2.5 rounded-full ${
        serverStatus.loading ? 'animate-pulse bg-zinc-400' : online ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]' : 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.9)]'
      }`} />
      <span>{serverStatus.loading ? 'Checking…' : online ? 'Online' : 'Offline'}</span>
      <span className="font-medium text-zinc-400">
        {online ? `${serverStatus.players}/${serverStatus.maxPlayers} players` : ''}
      </span>
    </span>
  );
}