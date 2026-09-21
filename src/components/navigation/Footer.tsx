import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRightLeft, Lock, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { CATEGORIES } from '../../utils/categories';
import { RentBackLogo } from '../brand/RentBackLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-[#0B132B] text-slate-400 text-xs mt-auto">
      {/* Platform Value Pillars Banner */}
      <div className="border-b border-slate-800/80 bg-[#070D1F] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800/90 text-[#1EC2A4]">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Managed Handover & Return</h4>
              <p className="mt-1 text-slate-400 text-xs leading-relaxed">
                Rent Back inspects, transports, and verifies items. No direct contact or meetup between stranger parties.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800/90 text-[#1EC2A4]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">50% Protected Security Deposit</h4>
              <p className="mt-1 text-slate-400 text-xs leading-relaxed">
                Deposits equal strictly 50% of declared item value, safely held in escrow and released upon certified return check.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800/90 text-[#1EC2A4]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Transparent 10% Platform Fee</h4>
              <p className="mt-1 text-slate-400 text-xs leading-relaxed">
                Clear flat 10% commission on rental fees. Security deposits remain 100% separate from platform fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2 md:col-span-2">
            <RentBackLogo variant="full" size="md" theme="dark" className="mb-4" />
            <p className="text-slate-400 text-xs leading-relaxed mb-4 max-w-sm">
              Egypt's premier curated peer-to-peer rental marketplace for cameras, designer apparel, electronics, and specialized equipment with certified hub custody.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#social-twitter"
                className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social-instagram"
                className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social-linkedin"
                className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#social-facebook"
                className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm">Categories</h5>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="hover:text-[#1EC2A4] transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company & Support */}
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm">Platform</h5>
            <ul className="space-y-2.5">
              <li>
                <Link to="/how-it-works" className="hover:text-[#1EC2A4] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#1EC2A4] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#1EC2A4] transition-colors">
                  Help / FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#1EC2A4] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="text-slate-500 hover:text-slate-300 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm">Legal & Safety</h5>
            <ul className="space-y-2.5">
              <li>
                <Link to="/terms" className="hover:text-[#1EC2A4] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-[#1EC2A4] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/escrow-policy" className="hover:text-[#1EC2A4] transition-colors">
                  Escrow Guarantee (50%)
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-[#1EC2A4] transition-colors">
                  Cancellation Policy (70%)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Rent Back. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <span>•</span>
            <span>Escrow Protection: 50%</span>
            <span>•</span>
            <span>Platform Commission: 10%</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
