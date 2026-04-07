import { Mail, Phone } from "lucide-react";

interface ContactProps {
  name: string;
  role: string;
  email?: string;
  phone?: string;
}

export default function ContactCard({ name, role, email, phone }: ContactProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-hitam-green/30 group">
      <div className="w-24 h-24 mb-5 rounded-full bg-hitam-green/10 flex items-center justify-center text-hitam-green font-bold text-3xl border-4 border-white shadow-sm group-hover:scale-105 transition-transform">
        {name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2)}
      </div>
      <h3 className="font-bold text-xl text-gray-900 mb-1">{name}</h3>
      <p className="text-xs text-hitam-green font-bold uppercase tracking-widest mb-6">{role}</p>
      
      <div className="space-y-3 mt-auto w-full pt-6 border-t border-gray-50 text-sm">
        {email && (
          <a href={`mailto:${email}`} className="flex items-center justify-center gap-3 text-gray-500 hover:text-hitam-green transition-colors font-medium">
            <Mail size={16} className="text-hitam-green" />
            <span>{email}</span>
          </a>
        )}
        {phone && (
          <a href={`tel:${phone}`} className="flex items-center justify-center gap-3 text-gray-500 hover:text-hitam-green transition-colors font-medium">
            <Phone size={16} className="text-hitam-green" />
            <span>{phone}</span>
          </a>
        )}
        {!email && !phone && (
          <span className="text-gray-400 italic">Contact info securely held</span>
        )}
      </div>
    </div>
  );
}
