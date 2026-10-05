import { MessageCircle } from 'lucide-react'
import { company } from '../constants/company'

/** Quiet floating WhatsApp button. No sound, no auto-popping tooltip. */
export default function WhatsAppFloat() {
    const message = encodeURIComponent('Hello Trovina, I would like to know more about your services.')

    return (
        <a
            href={`https://wa.me/${company.whatsapp}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Trovina on WhatsApp"
            title="Chat on WhatsApp"
            className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:bottom-6 md:right-6"
        >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </a>
    )
}
