import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

// Mount a fresh dialog on each opening: no previous review or form state survives.
function BookingDialog({ onClose, planName }: Omit<BookingModalProps, 'isOpen'>) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const [plan, setPlan] = useState(planName ?? 'Essential');
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    heading.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus();
    };
  }, []);

  useEffect(() => { heading.current?.focus(); }, [reviewed]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="booking-title"
      aria-describedby="booking-description"
      className="booking-dialog w-full max-w-lg bg-white shadow-2xl"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]',
        )).filter((control) => control.getClientRects().length > 0);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === heading.current)) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }}
    >
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative p-7 md:p-12">
        <button type="button" onClick={onClose} aria-label="Закрыть демо-бронирование" className="absolute top-3 right-3 p-3 text-text-secondary hover:text-text-main">
          <X size={20} aria-hidden="true" />
        </button>
        <p className="mb-4 text-xs uppercase tracking-widest text-text-secondary">UI-демо · без отправки</p>
        <h2 id="booking-title" ref={heading} tabIndex={-1} className="text-3xl font-serif mb-4 outline-none">
          {reviewed ? 'Демонстрационный итог' : 'Пример бронирования'}
        </h2>
        <p id="booking-description" className="text-sm text-text-secondary leading-relaxed mb-7">
          Вымышленный фотограф и тестовые данные. Контакты вводить не нужно: сайт не отправляет заявки и не бронирует даты.
        </p>
        {!reviewed ? (
          <form autoComplete="off" onSubmit={(event) => { event.preventDefault(); setReviewed(true); }} className="flex flex-col gap-5">
            <div>
              <label htmlFor="booking-name" className="block text-xs font-medium mb-2">Тестовый персонаж</label>
              <input id="booking-name" type="text" readOnly value="Демо-пара" className="w-full border border-gray-300 px-3 py-3 bg-bg-secondary text-text-secondary" />
            </div>
            <div>
              <label htmlFor="booking-date" className="block text-xs font-medium mb-2">Пример даты · не проверка доступности</label>
              <input id="booking-date" type="date" readOnly value="2030-06-15" className="w-full border border-gray-300 px-3 py-3 bg-bg-secondary text-text-secondary" />
            </div>
            <div>
              <label htmlFor="booking-plan" className="block text-xs font-medium mb-2">Демонстрационный пакет</label>
              <select id="booking-plan" value={plan} onChange={(event) => setPlan(event.target.value)} className="w-full border border-gray-300 px-3 py-3 bg-white">
                {['Essential', 'Premium', 'Deluxe'].map((name) => <option key={name}>{name}</option>)}
              </select>
            </div>
            <button type="submit" className="mt-3 w-full py-4 bg-text-main text-white uppercase tracking-widest text-xs font-bold hover:bg-black">Посмотреть демо-итог</button>
          </form>
        ) : (
          <div>
            <CheckCircle size={32} className="mb-4 text-text-secondary" aria-hidden="true" />
            <p role="status" className="text-sm leading-relaxed text-text-secondary">Заявка не отправлялась. Дата не бронировалась. Обратная связь не предусмотрена.</p>
            <dl className="my-6 border-y border-gray-200 py-4 text-sm space-y-2">
              <div><dt className="inline font-medium">Пакет: </dt><dd className="inline">{plan}</dd></div>
              <div><dt className="inline font-medium">Тестовая дата: </dt><dd className="inline">15 июня 2030</dd></div>
            </dl>
            <button type="button" onClick={() => setReviewed(false)} className="w-full py-4 border border-text-main text-xs font-semibold">Вернуться к примеру</button>
          </div>
        )}
      </motion.div>
    </dialog>
  );
}

export default function BookingModal({ isOpen, onClose, planName }: BookingModalProps) {
  return isOpen ? <BookingDialog onClose={onClose} planName={planName} /> : null;
}
