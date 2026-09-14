'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabaseBrowser';

type AdminEventFormProps = {
  eventId: string;
};

type EventFormState = {
  title: string;
  category: string;
  format: string;
  start_date: string;
  end_date: string;
  venue_name: string;
  address: string;
  city: string;
  region: string;
  short_description: string;
  description: string;
  lineup: string;
  official_url: string;
  booking_url: string;
  instagram_handle: string;
  price_label: string;
  budget_range: string;
  free: boolean;
  editorial_status: string;
  internal_notes: string;
  image_url: string;
  image_path: string;
  image_alt: string;
  image_credit: string;
};

const initialFormState: EventFormState = {
  title: '',
  category: '',
  format: '',
  start_date: '',
  end_date: '',
  venue_name: '',
  address: '',
  city: '',
  region: '',
  short_description: '',
  description: '',
  lineup: '',
  official_url: '',
  booking_url: '',
  instagram_handle: '',
  price_label: '',
  budget_range: '',
  free: false,
  editorial_status: 'draft',
  internal_notes: '',
  image_url: '',
  image_path: '',
  image_alt: '',
  image_credit: '',
};

export function AdminEventForm({ eventId }: AdminEventFormProps) {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  const [form, setForm] = useState<EventFormState>(initialFormState);
  const [whyGo, setWhyGo] = useState('');
  const [radarNote, setRadarNote] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadEvent() {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          event_editorial (*)
        `)
        .eq('id', eventId)
        .single();

      if (error) {
        console.error(error);
        setMessage('Errore nel caricamento evento.');
        setIsLoading(false);
        return;
      }

      setForm({
        title: data.title ?? '',
        category: data.category ?? '',
        format: data.format ?? '',
        start_date: data.start_date ?? '',
        end_date: data.end_date ?? '',
        venue_name: data.venue_name ?? '',
        address: data.address ?? '',
        city: data.city ?? '',
        region: data.region ?? '',
        short_description: data.short_description ?? '',
        description: data.description ?? '',
        lineup: data.lineup ?? '',
        official_url: data.official_url ?? '',
        booking_url: data.booking_url ?? '',
        instagram_handle: data.instagram_handle ?? '',
        price_label: data.price_label ?? '',
        budget_range: data.budget_range ?? '',
        free: data.free ?? false,
        editorial_status: data.editorial_status ?? 'draft',
        internal_notes: data.internal_notes ?? '',
        image_url: data.image_url ?? '',
        image_path: data.image_path ?? '',
        image_alt: data.image_alt ?? '',
        image_credit: data.image_credit ?? '',
      });

      setWhyGo(data.event_editorial?.why_go ?? '');
      setRadarNote(data.event_editorial?.radar_note ?? '');

      setIsLoading(false);
    }

    loadEvent();
  }, [eventId, supabase]);

  function updateField<K extends keyof EventFormState>(
    field: K,
    value: EventFormState[K]
  ) {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  }

  async function uploadImageIfNeeded() {
    if (!selectedImage) {
      return {
        image_url: form.image_url || null,
        image_path: form.image_path || null,
      };
    }

    const safeTitle = slugify(form.title || `event-${eventId}`);
    const extension = selectedImage.name.split('.').pop() || 'jpg';
    const filePath = `events/${safeTitle}-${eventId}/cover.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(filePath, selectedImage, {
        cacheControl: '3600',
        upsert: true,
        contentType: selectedImage.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('event-images')
      .getPublicUrl(filePath);

    return {
      image_url: data.publicUrl,
      image_path: filePath,
    };
  }

  async function handleSave(statusOverride?: string) {
    setIsSaving(true);
    setMessage('');

    try {
      const imageData = await uploadImageIfNeeded();

      const nextEditorialStatus = statusOverride ?? form.editorial_status;
      const isPublished = nextEditorialStatus === 'published';

      const { error: eventError } = await supabase
        .from('events')
        .update({
          title: emptyToNull(form.title),
          category: emptyToNull(form.category),
          format: emptyToNull(form.format),
          start_date: emptyToNull(form.start_date),
          end_date: emptyToNull(form.end_date),
          venue_name: emptyToNull(form.venue_name),
          address: emptyToNull(form.address),
          city: emptyToNull(form.city),
          region: emptyToNull(form.region),
          short_description: emptyToNull(form.short_description),
          description: emptyToNull(form.description),
          lineup: emptyToNull(form.lineup),
          official_url: emptyToNull(form.official_url),
          booking_url: emptyToNull(form.booking_url),
          instagram_handle: emptyToNull(form.instagram_handle),
          price_label: emptyToNull(form.price_label),
          budget_range: emptyToNull(form.budget_range),
          free: form.free,
          editorial_status: nextEditorialStatus,
          published_at: isPublished ? new Date().toISOString() : null,
          internal_notes: emptyToNull(form.internal_notes),
          image_url: imageData.image_url,
          image_path: imageData.image_path,
          image_alt: emptyToNull(form.image_alt),
          image_credit: emptyToNull(form.image_credit),
          updated_at: new Date().toISOString(),
        })
        .eq('id', eventId);

      if (eventError) {
        throw eventError;
      }

      const { error: editorialError } = await supabase
        .from('event_editorial')
        .upsert({
          event_id: Number(eventId),
          why_go: emptyToNull(whyGo),
          radar_note: emptyToNull(radarNote),
        });

      if (editorialError) {
        throw editorialError;
      }

      setForm((previousForm) => ({
        ...previousForm,
        editorial_status: nextEditorialStatus,
        image_url: imageData.image_url ?? '',
        image_path: imageData.image_path ?? '',
      }));

      setMessage(
        isPublished
          ? 'Evento salvato e pubblicato correttamente.'
          : 'Evento salvato correttamente.'
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage('Errore durante il salvataggio.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await handleSave();
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      'Vuoi eliminare definitivamente questo evento? Questa azione non può essere annullata.'
    );

    if (!confirmed) {
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      if (form.image_path) {
        await supabase.storage
          .from('event-images')
          .remove([form.image_path]);
      }

      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) {
        throw error;
      }

      router.push('/admin/events');
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage('Errore durante l’eliminazione.');
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <p className="fomo-body mt-10 text-neutral-400">
        Caricamento evento...
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 grid gap-10 xl:grid-cols-[1fr_360px]">
      <section className="space-y-10">
        <AdminFormSection title="Dati base">
          <AdminInput
            label="Titolo"
            value={form.title}
            onChange={(value) => updateField('title', value)}
            required
          />

          <div className="grid gap-6 md:grid-cols-2">
            <AdminInput
              label="Categoria"
              value={form.category}
              onChange={(value) => updateField('category', value)}
              required
            />

            <AdminInput
              label="Format"
              value={form.format}
              onChange={(value) => updateField('format', value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AdminInput
              label="Data inizio"
              type="date"
              value={form.start_date}
              onChange={(value) => updateField('start_date', value)}
            />

            <AdminInput
              label="Data fine"
              type="date"
              value={form.end_date}
              onChange={(value) => updateField('end_date', value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AdminInput
              label="Venue"
              value={form.venue_name}
              onChange={(value) => updateField('venue_name', value)}
            />

            <AdminInput
              label="Indirizzo"
              value={form.address}
              onChange={(value) => updateField('address', value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AdminInput
              label="Città"
              value={form.city}
              onChange={(value) => updateField('city', value)}
            />

            <AdminInput
              label="Regione"
              value={form.region}
              onChange={(value) => updateField('region', value)}
            />
          </div>
        </AdminFormSection>

        <AdminFormSection title="Contenuto editoriale">
          <AdminTextarea
            label="Short description / mood text"
            value={form.short_description}
            onChange={(value) => updateField('short_description', value)}
          />

          <AdminTextarea
            label="Descrizione / line-up"
            value={form.description}
            onChange={(value) => updateField('description', value)}
          />

          <AdminTextarea
            label="Line-up"
            value={form.lineup}
            onChange={(value) => updateField('lineup', value)}
          />

          <AdminTextarea
            label="Perché inserirlo"
            value={whyGo}
            onChange={setWhyGo}
          />

          <AdminTextarea
            label="Radar note"
            value={radarNote}
            onChange={setRadarNote}
          />
        </AdminFormSection>

        <AdminFormSection title="Link e prezzo">
          <div className="grid gap-6 md:grid-cols-2">
            <AdminInput
              label="Official URL"
              value={form.official_url}
              onChange={(value) => updateField('official_url', value)}
            />

            <AdminInput
              label="Booking URL"
              value={form.booking_url}
              onChange={(value) => updateField('booking_url', value)}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <AdminInput
              label="Instagram handle"
              value={form.instagram_handle}
              onChange={(value) => updateField('instagram_handle', value)}
            />

            <AdminInput
              label="Budget range"
              value={form.budget_range}
              onChange={(value) => updateField('budget_range', value)}
            />

            <AdminInput
              label="Price label"
              value={form.price_label}
              onChange={(value) => updateField('price_label', value)}
            />
          </div>

          <label className="fomo-body-medium flex items-center gap-3 text-sm uppercase tracking-wide text-white">
            <input
              type="checkbox"
              checked={form.free}
              onChange={(event) => updateField('free', event.target.checked)}
              className="h-5 w-5"
            />
            Evento gratuito
          </label>
        </AdminFormSection>
      </section>

      <aside className="space-y-6">
        <div className="sticky top-28 space-y-6">
          <AdminFormSection title="Pubblicazione">
            <label className="block">
              <span className="fomo-body-medium text-xs uppercase tracking-[0.2em] text-[#00ff19]">
                Stato editoriale
              </span>

              <select
                value={form.editorial_status}
                onChange={(event) => updateField('editorial_status', event.target.value)}
                className="fomo-body mt-2 h-12 w-full border border-white/30 bg-black px-4 text-white outline-none focus:border-[#00ff19]"
              >
                <option value="draft">Bozza</option>
                <option value="to_review">Da revisionare</option>
                <option value="needs_info">Mancano info</option>
                <option value="approved">Approvato</option>
                <option value="published">Pubblicato</option>
                <option value="archived">Archiviato</option>
              </select>
            </label>

            <AdminTextarea
              label="Note interne"
              value={form.internal_notes}
              onChange={(value) => updateField('internal_notes', value)}
            />

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSaving}
                className="fomo-body-medium w-full rounded-full border-2 border-[#00ff19] px-6 py-4 text-sm uppercase tracking-wide text-[#00ff19] transition hover:bg-[#00ff19] hover:text-black disabled:opacity-50"
              >
                {isSaving ? 'Salvataggio...' : 'Salva modifiche'}
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleSave('published')}
                className="fomo-body-medium w-full rounded-full bg-[#00ff19] px-6 py-4 text-sm uppercase tracking-wide text-black transition hover:bg-white disabled:opacity-50"
              >
                Salva e pubblica
              </button>

              <button
                type="button"
                disabled={isSaving}
                onClick={handleDelete}
                className="fomo-body-medium w-full rounded-full border-2 border-red-500 px-6 py-4 text-sm uppercase tracking-wide text-red-400 transition hover:bg-red-500 hover:text-black disabled:opacity-50"
              >
                Elimina evento
              </button>
            </div>

            {message && (
              <p className="fomo-body text-sm text-neutral-300">
                {message}
              </p>
            )}
          </AdminFormSection>

          <AdminFormSection title="Immagine">
            {form.image_url && (
              <img
                src={form.image_url}
                alt={form.image_alt || form.title}
                className="aspect-[4/3] w-full border border-white/20 object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setSelectedImage(event.target.files?.[0] ?? null);
              }}
              className="fomo-body w-full text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-[#00ff19] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
            />

            {selectedImage && (
              <p className="fomo-body text-xs text-neutral-400">
                Nuova immagine: {selectedImage.name}
              </p>
            )}

            <AdminInput
              label="Alt text"
              value={form.image_alt}
              onChange={(value) => updateField('image_alt', value)}
            />

            <AdminInput
              label="Credit"
              value={form.image_credit}
              onChange={(value) => updateField('image_credit', value)}
            />
          </AdminFormSection>
        </div>
      </aside>
    </form>
  );
}

type AdminFormSectionProps = {
  title: string;
  children: React.ReactNode;
};

function AdminFormSection({ title, children }: AdminFormSectionProps) {
  return (
    <section className="border border-white p-5">
      <h2 className="fomo-display mb-6 text-4xl leading-none text-white">
        {title}
      </h2>

      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}

type AdminInputProps = {
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

function AdminInput({
                      label,
                      value,
                      type = 'text',
                      required = false,
                      onChange,
                    }: AdminInputProps) {
  return (
    <label className="block">
      <span className="fomo-body-medium text-xs uppercase tracking-[0.2em] text-[#00ff19]">
        {label}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="fomo-body mt-2 h-12 w-full border border-white/30 bg-black px-4 text-white outline-none focus:border-[#00ff19]"
      />
    </label>
  );
}

type AdminTextareaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function AdminTextarea({ label, value, onChange }: AdminTextareaProps) {
  return (
    <label className="block">
      <span className="fomo-body-medium text-xs uppercase tracking-[0.2em] text-[#00ff19]">
        {label}
      </span>

      <textarea
        value={value}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        className="fomo-body mt-2 w-full border border-white/30 bg-black px-4 py-3 text-white outline-none focus:border-[#00ff19]"
      />
    </label>
  );
}

function emptyToNull(value: string) {
  const trimmedValue = value.trim();

  return trimmedValue === '' ? null : trimmedValue;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
