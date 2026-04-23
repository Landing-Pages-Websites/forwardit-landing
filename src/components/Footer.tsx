import { BRAND } from "@/lib/content";

/**
 * Legal-only footer per landing-page-architect Rule #4.
 * No nav, no social, no outbound links.
 */
export function Footer() {
  return (
    <footer className="bg-[var(--color-accent)] text-[var(--color-ink-on-dark)] py-10 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-3">
        <p className="text-sm text-white/80">
          © {new Date().getFullYear()} {BRAND.fullName} · {BRAND.address.street}, {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
        </p>
        <p className="text-xs text-white/55">
          Federal-grade AI & automation for US SMBs. Woman-owned. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
