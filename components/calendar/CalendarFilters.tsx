'use client';

import {
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  Moon,
  Search,
  Sparkles,
  Sun,
  Ticket,
  X
} from 'lucide-react';

type DatePreset = 'all' | 'tonight' | 'tomorrow' | 'weekend' | 'week' | 'custom';
type TimePreset = 'all' | 'morning' | 'afternoon' | 'evening';

type CalendarFiltersProps = {
  categories: string[];
  cities: string[];
  moods: string[];

  searchQuery: string;
  selectedCategory: string;
  selectedCity: string;
  selectedMood: string;
  selectedDatePreset: DatePreset;
  selectedTimePreset: TimePreset;
  onlyFree: boolean;
  customDateFrom: string;
  customDateTo: string;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onMoodChange: (value: string) => void;
  onDatePresetChange: (value: DatePreset) => void;
  onTimePresetChange: (value: TimePreset) => void;
  onOnlyFreeChange: (value: boolean) => void;
  onCustomDateFromChange: (value: string) => void;
  onCustomDateToChange: (value: string) => void;
  onReset: () => void;
};

export function CalendarFilters({
                                  categories,
                                  cities,
                                  moods,
                                  searchQuery,
                                  selectedCategory,
                                  selectedCity,
                                  selectedMood,
                                  selectedDatePreset,
                                  selectedTimePreset,
                                  onlyFree,
                                  customDateFrom,
                                  customDateTo,
                                  onSearchChange,
                                  onCategoryChange,
                                  onCityChange,
                                  onMoodChange,
                                  onDatePresetChange,
                                  onTimePresetChange,
                                  onOnlyFreeChange,
                                  onCustomDateFromChange,
                                  onCustomDateToChange,
                                  onReset,
                                }: CalendarFiltersProps) {
  return (
    <section className="mb-8 border border-white bg-black p-4 text-white md:p-5">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="fomo-body-medium mb-3 inline-flex bg-[#00ff19] px-3 py-1 text-xs uppercase tracking-wide text-black">
            Filtri Radar
          </p>

          <h2 className="fomo-display text-5xl leading-none md:text-6xl">
            Trova la tua vibe
          </h2>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="fomo-body-medium w-fit rounded-full border border-white px-5 py-2 text-xs uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
        >
          Reset
        </button>
      </div>

      <div className="mb-6 max-w-xl">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#00ff19]" />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Cerca eventi..."
            className="fomo-body h-14 w-full rounded-full border border-white/20 bg-white px-12 text-base text-black outline-none transition placeholder:text-neutral-500 focus:border-[#00ff19] focus:ring-2 focus:ring-[#00ff19]/40"
          />
        </label>
      </div>

      <div className="space-y-5">
        <FilterRow icon={<CalendarDays className="h-5 w-5" />}>
          <FilterButton
            label="Tutti"
            value="all"
            selectedValue={selectedDatePreset}
            onChange={(value) => onDatePresetChange(value as DatePreset)}
          />
          <FilterButton
            label="Stasera"
            value="tonight"
            selectedValue={selectedDatePreset}
            onChange={(value) => onDatePresetChange(value as DatePreset)}
          />
          <FilterButton
            label="Domani"
            value="tomorrow"
            selectedValue={selectedDatePreset}
            onChange={(value) => onDatePresetChange(value as DatePreset)}
          />
          <FilterButton
            label="Questo weekend"
            value="weekend"
            selectedValue={selectedDatePreset}
            onChange={(value) => onDatePresetChange(value as DatePreset)}
          />
          <FilterButton
            label="Questa settimana"
            value="week"
            selectedValue={selectedDatePreset}
            onChange={(value) => onDatePresetChange(value as DatePreset)}
          />
          <FilterButton
            label="Scegli data"
            value="custom"
            selectedValue={selectedDatePreset}
            onChange={(value) => onDatePresetChange(value as DatePreset)}
          />
        </FilterRow>

        {selectedDatePreset === 'custom' && (
          <div className="ml-0 grid gap-3 md:ml-10 md:max-w-xl md:grid-cols-2">
            <DateInput
              label="Da"
              value={customDateFrom}
              onChange={onCustomDateFromChange}
            />

            <DateInput
              label="A"
              value={customDateTo}
              onChange={onCustomDateToChange}
            />
          </div>
        )}

        {/*<FilterRow icon={<Sun className="h-5 w-5" />}>*/}
        {/*  <FilterButton*/}
        {/*    label="Tutto il giorno"*/}
        {/*    value="all"*/}
        {/*    selectedValue={selectedTimePreset}*/}
        {/*    onChange={(value) => onTimePresetChange(value as TimePreset)}*/}
        {/*  />*/}
        {/*  <FilterButton*/}
        {/*    label="Mattina"*/}
        {/*    value="morning"*/}
        {/*    selectedValue={selectedTimePreset}*/}
        {/*    onChange={(value) => onTimePresetChange(value as TimePreset)}*/}
        {/*  />*/}
        {/*  <FilterButton*/}
        {/*    label="Pomeriggio"*/}
        {/*    value="afternoon"*/}
        {/*    selectedValue={selectedTimePreset}*/}
        {/*    onChange={(value) => onTimePresetChange(value as TimePreset)}*/}
        {/*  />*/}
        {/*  <FilterButton*/}
        {/*    label="Sera"*/}
        {/*    value="evening"*/}
        {/*    selectedValue={selectedTimePreset}*/}
        {/*    onChange={(value) => onTimePresetChange(value as TimePreset)}*/}
        {/*    icon={<Moon className="h-4 w-4" />}*/}
        {/*  />*/}
        {/*</FilterRow>*/}

        <FilterRow icon={<Sparkles className="h-5 w-5" />}>
          <FilterButton
            label="Tutte"
            value="all"
            selectedValue={selectedCategory}
            onChange={onCategoryChange}
          />

          {categories.map((category) => (
            <FilterButton
              key={category}
              label={category}
              value={category}
              selectedValue={selectedCategory}
              onChange={onCategoryChange}
            />
          ))}
        </FilterRow>

        <FilterRow icon={<MapPin className="h-5 w-5" />}>
          <InputSelectFilter
            value={selectedCity}
            values={cities}
            placeholder="Tutte le città"
            datalistId="city-options"
            onChange={onCityChange}
          />

          <SelectFilter
            value={selectedMood}
            values={moods}
            placeholder="Tutti i mood"
            onChange={onMoodChange}
          />
        </FilterRow>

        <FilterRow icon={<Ticket className="h-5 w-5" />}>
          <button
            type="button"
            onClick={() => onOnlyFreeChange(!onlyFree)}
            className={[
              'fomo-body-medium inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm uppercase tracking-wide transition',
              onlyFree
                ? 'border-[#00ff19] bg-[#00ff19] text-black'
                : 'border-white/30 bg-white/10 text-white hover:border-[#00ff19] hover:text-[#00ff19]',
            ].join(' ')}
          >
            Solo eventi gratuiti
          </button>
        </FilterRow>
      </div>
    </section>
  );
}

type FilterRowProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

function FilterRow({ icon, children }: FilterRowProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[24px_1fr] md:items-start">
      <div className="hidden pt-3 text-[#00ff19] md:block">
        {icon}
      </div>

      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  );
}
type InputSelectFilterProps = {
  value: string;
  values: string[];
  placeholder: string;
  datalistId: string;
  onChange: (value: string) => void;
};

function InputSelectFilter({
                             value,
                             values,
                             placeholder,
                             datalistId,
                             onChange,
                           }: InputSelectFilterProps) {
  const hasValue = value !== 'all' && value.trim() !== '';

  return (
    <label className="relative inline-flex">
      <input
        type="text"
        list={datalistId}
        value={hasValue ? value : ''}
        onChange={(event) => {
          const nextValue = event.target.value;

          onChange(nextValue.trim() === '' ? 'all' : nextValue);
        }}
        placeholder={placeholder}
        className="fomo-body-medium h-12 min-w-56 rounded-full border border-white/30 bg-white/10 px-5 pr-20 text-sm uppercase tracking-wide text-white outline-none transition placeholder:text-white hover:border-[#00ff19] focus:border-[#00ff19]"
      />

      <datalist id={datalistId}>
        {values.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>

      {hasValue && (
        <button
          type="button"
          onClick={() => onChange('all')}
          aria-label="Rimuovi filtro città"
          className="absolute right-10 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-sm text-white transition hover:bg-white hover:text-black"
        >
          <X className="h-5 w-5 stroke-[2.5]" />
        </button>
      )}

      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
    </label>
  );
}

type FilterButtonProps = {
  label: string;
  value: string;
  selectedValue: string;
  icon?: React.ReactNode;
  onChange: (value: string) => void;
};



function FilterButton({
                        label,
                        value,
                        selectedValue,
                        icon,
                        onChange,
                      }: FilterButtonProps) {
  const isActive = selectedValue === value;

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={[
        'fomo-body-medium inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm uppercase tracking-wide transition',
        isActive
          ? 'border-[#00ff19] bg-[#00ff19] text-black'
          : 'border-white/30 bg-white/10 text-white hover:border-[#00ff19] hover:text-[#00ff19]',
      ].join(' ')}
    >
      {icon}
      {label}
    </button>
  );
}

type SelectFilterProps = {
  value: string;
  values: string[];
  placeholder: string;
  onChange: (value: string) => void;
};

function SelectFilter({
                        value,
                        values,
                        placeholder,
                        onChange,
                      }: SelectFilterProps) {
  return (
    <label className="relative inline-flex">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="fomo-body-medium h-12 min-w-56 appearance-none rounded-full border border-white/30 bg-white/10 px-5 pr-12 text-sm uppercase tracking-wide text-white outline-none transition hover:border-[#00ff19] focus:border-[#00ff19]"
      >
        <option value="all" className="bg-black text-white">
          {placeholder}
        </option>

        {values.map((item) => (
          <option key={item} value={item} className="bg-black text-white">
            {item}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
    </label>
  );
}

type DateInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function DateInput({ label, value, onChange }: DateInputProps) {
  return (
    <label className="fomo-body-medium flex flex-col gap-2 text-xs uppercase tracking-wide text-neutral-400">
      {label}

      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="fomo-body h-12 rounded-full border border-white/30 bg-white px-5 text-sm text-black outline-none focus:border-[#00ff19] focus:ring-2 focus:ring-[#00ff19]/40"
      />
    </label>
  );



}
