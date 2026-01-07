export interface ScheduleItem {
  id: string;
  dateRange: string;
  activity: string;
  description: string;
  location?: string;
}

export interface TimelineItem {
  id: string;
  status: "Selesai" | "Sedang Berlangsung" | "Akan Datang";
  date: string;
  title: string;
  description: string;
  location?: string;
}

export interface WaveData {
  gelombang: "1" | "2" | "3";
  isOpened: boolean;
  kegiatan: ScheduleItem[];
  timeline: TimelineItem[];
}

export interface InstitutionSchedule {
  id: string; // Matches lembaga ID
  waves: {
    "1": WaveData;
    "2": WaveData;
    "3": WaveData;
  };
}
