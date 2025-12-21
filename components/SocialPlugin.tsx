import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function SocialPlugin() {
    const socials = [
        { name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700', url: '#' },
        { name: 'Twitter', icon: Twitter, color: 'from-sky-400 to-sky-600', url: '#' },
        { name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600', url: '#' },
        { name: 'YouTube', icon: Youtube, color: 'from-red-600 to-red-700', url: '#' },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-900/80 to-black/60 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Connect With Us
            </h3>

            <div className="grid grid-cols-2 gap-3">
                {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                        <button
                            key={social.name}
                            className={`bg-gradient-to-r ${social.color} p-3 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-${social.color}/20 transition-all duration-200 flex items-center justify-center gap-2 group`}
                        >
                            <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="font-medium text-sm">{social.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}