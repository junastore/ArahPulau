/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DestinationList } from './components/DestinationList';
import { TicketSection } from './components/TicketSection';
import { BookingModal } from './components/BookingModal';
import { EmailNotificationModal } from './components/EmailNotificationModal';
import { EmailInboxDrawer } from './components/EmailInboxDrawer';
import { FerryScheduleModal } from './components/FerryScheduleModal';
import { TicketLookupModal } from './components/TicketLookupModal';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { IslandGuideSection } from './components/IslandGuideSection';
import { Footer } from './components/Footer';

import {
  TIDUNG_DESTINATIONS,
  TIDUNG_TICKETS
} from './data/tidungData';
import {
  DestinationItem,
  TicketOption,
  BookingTransaction
} from './types';
import { getSavedBookings } from './utils/storage';
import { Mail, ArrowRight } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [passengers, setPassengers] = useState<number>(2);

  // Saved bookings (persisted in localStorage)
  const [bookings, setBookings] = useState<BookingTransaction[]>([]);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedTicketForBooking, setSelectedTicketForBooking] = useState<TicketOption | null>(null);

  const [activeCompletedBooking, setActiveCompletedBooking] = useState<BookingTransaction | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);

  const [isInboxOpen, setIsInboxOpen] = useState<boolean>(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [isLookupOpen, setIsLookupOpen] = useState<boolean>(false);

  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);
  const [isDestinationDetailOpen, setIsDestinationDetailOpen] = useState<boolean>(false);

  // Notification toast
  const [recentNotificationToast, setRecentNotificationToast] = useState<{
    id: string;
    email: string;
    booking: BookingTransaction;
  } | null>(null);

  // Load bookings on mount
  useEffect(() => {
    const loaded = getSavedBookings();
    setBookings(loaded);
  }, []);

  // Filtered destinations based on search query
  const filteredDestinations = useMemo(() => {
    if (!searchQuery.trim()) return TIDUNG_DESTINATIONS;
    const term = searchQuery.toLowerCase().trim();
    return TIDUNG_DESTINATIONS.filter(
      (d) =>
        d.name.toLowerCase().includes(term) ||
        d.shortDesc.toLowerCase().includes(term) ||
        d.categoryLabel.toLowerCase().includes(term) ||
        d.tags.some((t) => t.toLowerCase().includes(term))
    );
  }, [searchQuery]);

  // Handle Search Submission (scrolls to destination section)
  const handleSearchSubmit = () => {
    const el = document.getElementById('destinasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
    const el = document.getElementById('destinasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open booking modal with a preselected ticket
  const handleOpenBooking = (ticket?: TicketOption) => {
    setSelectedTicketForBooking(ticket || TIDUNG_TICKETS[0]);
    setIsBookingOpen(true);
  };

  const handleQuickBookCategory = (category?: string) => {
    let targetTicket: TicketOption | undefined;
    if (category === 'homestay') {
      targetTicket = TIDUNG_TICKETS.find((t) => t.id === 'homestay-ac-pesisir') || TIDUNG_TICKETS[0];
    } else if (category === 'speedboat') {
      targetTicket = TIDUNG_TICKETS.find((t) => t.id === 'speedboat-marina-pp') || TIDUNG_TICKETS[0];
    } else if (category === 'paket-wisata') {
      targetTicket = TIDUNG_TICKETS.find((t) => t.id === 'paket-2d1n-komplit') || TIDUNG_TICKETS[0];
    }
    handleOpenBooking(targetTicket);
  };

  // When user clicks "Pesan Tiket Terkait" on a destination
  const handleBookRelatedTicket = (dest: DestinationItem) => {
    let targetTicket: TicketOption | undefined;
    if (dest.category === 'homestay') {
      targetTicket = TIDUNG_TICKETS.find((t) => t.id === 'homestay-ac-pesisir') || TIDUNG_TICKETS[0];
    } else if (dest.category === 'nemo') {
      targetTicket = TIDUNG_TICKETS.find((t) => t.id === 'paket-2d1n-komplit') || TIDUNG_TICKETS[0];
    } else if (dest.category === 'museum' || dest.category === 'penyu') {
      targetTicket = TIDUNG_TICKETS.find((t) => t.id === 'rental-sepeda-ontel') || TIDUNG_TICKETS[0];
    } else {
      targetTicket = TIDUNG_TICKETS.find((t) => t.id === 'speedboat-marina-pp') || TIDUNG_TICKETS[0];
    }
    handleOpenBooking(targetTicket);
  };

  // When user clicks "Lihat Detail" on destination
  const handleSelectDestination = (dest: DestinationItem) => {
    setSelectedDestination(dest);
    setIsDestinationDetailOpen(true);
  };

  // When payment is finished: Trigger email notification modal
  const handleBookingSuccess = (newBooking: BookingTransaction) => {
    setBookings((prev) => [newBooking, ...prev.filter((b) => b.id !== newBooking.id)]);
    setIsBookingOpen(false);
    setActiveCompletedBooking(newBooking);
    setIsEmailModalOpen(true);

    // Toast alert
    setRecentNotificationToast({
      id: newBooking.id,
      email: newBooking.customer.email,
      booking: newBooking
    });
    setTimeout(() => {
      setRecentNotificationToast(null);
    }, 7000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-cyan-600 selection:text-white">
      {/* Toast alert after transaction completion */}
      {recentNotificationToast && (
        <div className="fixed bottom-18 md:bottom-5 right-5 z-50 max-w-sm bg-slate-900 text-white p-4 rounded-2xl shadow-xl border border-slate-700 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <p className="font-bold text-white">E-Tiket Terkirim ke Email!</p>
            <p className="text-slate-300 mt-0.5">
              Terkirim ke: <strong className="text-cyan-300">{recentNotificationToast.email}</strong>
            </p>
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveCompletedBooking(recentNotificationToast.booking);
                  setIsEmailModalOpen(true);
                  setRecentNotificationToast(null);
                }}
                className="font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer hover:underline"
              >
                <span>Lihat Email</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => setRecentNotificationToast(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        onOpenInbox={() => setIsInboxOpen(true)}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenLookup={() => setIsLookupOpen(true)}
        onQuickBook={() => handleOpenBooking()}
        inboxCount={bookings.length}
      />

      {/* Professional Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onSelectTag={handleSelectTag}
        onQuickBookTicket={handleQuickBookCategory}
      />

      {/* Active Search Filter Status */}
      {searchQuery.trim() && (
        <div className="bg-cyan-50 border-b border-cyan-100 py-2.5 px-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-cyan-900">
            <span>
              Menampilkan hasil untuk: <strong>"{searchQuery}"</strong> ({filteredDestinations.length} ditemukan)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-cyan-700 font-bold hover:underline cursor-pointer"
            >
              Hapus Pencarian
            </button>
          </div>
        </div>
      )}

      {/* Destinations List */}
      <DestinationList
        destinations={filteredDestinations}
        onSelectDestination={handleSelectDestination}
      />

      {/* Tickets & Tour Packages */}
      <TicketSection
        tickets={TIDUNG_TICKETS}
        onSelectTicket={handleOpenBooking}
      />

      {/* Practical Guide & FAQs */}
      <IslandGuideSection />

      {/* Attractive Professional Footer */}
      <Footer
        onOpenInbox={() => setIsInboxOpen(true)}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        inboxCount={bookings.length}
      />

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingModal
          initialTicket={selectedTicketForBooking}
          initialDate={selectedDate}
          initialPassengers={passengers}
          onClose={() => setIsBookingOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Email Notification & E-Ticket Preview Modal */}
      {isEmailModalOpen && activeCompletedBooking && (
        <EmailNotificationModal
          booking={activeCompletedBooking}
          onClose={() => setIsEmailModalOpen(false)}
        />
      )}

      {/* Email Inbox Drawer */}
      {isInboxOpen && (
        <EmailInboxDrawer
          bookings={bookings}
          onClose={() => setIsInboxOpen(false)}
          onOpenBookingDetail={(b) => {
            setIsInboxOpen(false);
            setActiveCompletedBooking(b);
            setIsEmailModalOpen(true);
          }}
        />
      )}

      {/* Ferry Timetable Modal */}
      {isScheduleOpen && (
        <FerryScheduleModal
          onClose={() => setIsScheduleOpen(false)}
          onBookFerry={() => {
            setIsScheduleOpen(false);
            handleOpenBooking(TIDUNG_TICKETS[0]);
          }}
        />
      )}

      {/* Ticket Lookup Modal */}
      {isLookupOpen && (
        <TicketLookupModal
          bookings={bookings}
          onClose={() => setIsLookupOpen(false)}
          onSelectBooking={(b) => {
            setIsLookupOpen(false);
            setActiveCompletedBooking(b);
            setIsEmailModalOpen(true);
          }}
        />
      )}

      {/* Destination Story Detail Modal */}
      {isDestinationDetailOpen && selectedDestination && (
        <DestinationDetailModal
          destination={selectedDestination}
          onClose={() => setIsDestinationDetailOpen(false)}
          onBookRelatedTicket={handleBookRelatedTicket}
        />
      )}
    </div>
  );
}
