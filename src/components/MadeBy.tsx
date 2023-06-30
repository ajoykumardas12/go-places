import ExternalLink from "./icons/ExternalLink";

function MadeBy() {
  return (
    <div className="absolute bottom-4 right-0 xs:right-2 sm:right-6 text-white/40 hover:text-white/60 text-xs sm:text-sm group">
      <a
        href="https://ajoykumardas.vercel.app/"
        target="_blank"
        rel="noopener"
        className="font-semibold flex items-center gap-1"
      >
        Made by Ajoy{" "}
        <div className="opacity-0 group-hover:opacity-100 transition">
          <ExternalLink />
        </div>
      </a>
    </div>
  );
}

export default MadeBy;
