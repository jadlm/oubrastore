'use client';
import { Phone, Mail, MapPin, Truck } from 'lucide-react';
import { SITE_SERVICE_PHONE_DISPLAY, SITE_SERVICE_PHONE_TEL, SITE_WHATSAPP_URL } from '@/lib/site';

export default function Topbar() {
  return (
    <div className="bg-dark-DEFAULT text-white/80 text-xs sm:text-sm shrink-0">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 sm:justify-between min-h-9 sm:h-10 sm:min-h-0 py-1.5 sm:py-0">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:gap-6">
          <a href={`tel:${SITE_SERVICE_PHONE_TEL}`} className="flex items-center gap-1.5 hover:text-primary transition-colors whitespace-nowrap">
            <Phone size={13} className="shrink-0" /> <span className="hidden sm:inline">Service client </span>{SITE_SERVICE_PHONE_DISPLAY}
          </a>
          <a href="mailto:contact@oubrastore.ma" className="hidden md:flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail size={13} /> contact@oubrastore.ma
          </a>
          <span className="hidden lg:flex items-center gap-1.5">
            <MapPin size={13} className="text-primary" /> Casablanca, Maroc
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden md:flex items-center gap-1.5">
            <Truck size={13} className="text-primary" /> Livraison rapide partout au Maroc
          </span>
          <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.549 4.106 1.514 5.834L.045 23.5l5.834-1.469A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.97 0-3.867-.53-5.523-1.533l-.396-.236-3.465.872.912-3.33-.26-.413A9.784 9.784 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
