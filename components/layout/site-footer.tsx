export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto w-full max-w-5xl px-6 py-6 text-sm text-muted">
        © {new Date().getFullYear()} Dama Venus
      </div>
    </footer>
  );
}
