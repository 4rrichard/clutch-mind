function Footer() {
    return (
        <footer className="absolute bottom-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-t border-white/10 py-4">
            <div className="mx-auto max-w-6xl px-4 flex justify-between items-center gap-2 text-muted">
                <p className="font-semibold tracking-wide text-lg">What-Now?</p>

                <div className="flex gap-4 text-sm">
                    <a href="#" className="hover:text-text transition-colors">
                        About
                    </a>
                    <a href="#" className="hover:text-text transition-colors">
                        Contact
                    </a>
                    <a href="#" className="hover:text-text transition-colors">
                        Privacy
                    </a>
                </div>

                <p className="text-xs">
                    © {new Date().getFullYear()} What-Now. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
