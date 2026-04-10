import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faWandSparkles } from "@fortawesome/free-solid-svg-icons";

export function FeaturedBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-violet-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm shadow-sm shrink-0">
      <FontAwesomeIcon icon={faStar} className="w-2.5 h-2.5" />
      Featured
    </span>
  );
}

export function NewBadge() {
  return (
    <span className="new-badge inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm shrink-0">
      <FontAwesomeIcon icon={faWandSparkles} className="w-2.5 h-2.5" />
      New
    </span>
  );
}

export function CurrentBadge() {
  return (
    <span className="current-badge inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm shrink-0">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
      </span>
      Current
    </span>
  );
}
