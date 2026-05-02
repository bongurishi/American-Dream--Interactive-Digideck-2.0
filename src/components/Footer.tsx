export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-serif font-semibold tracking-wider text-white">
          AMERICAN DREAM.
        </div>
        <div className="text-sm text-white/50 font-light">
          &copy; {new Date().getFullYear()} American Dream. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm font-medium text-white/70">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
