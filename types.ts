export interface ServiceVariant {
  id: string;
  name: string;
  price: string;
  duration: string;
  description?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  image: string;
  variants: ServiceVariant[];
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingState {
  serviceId: string | null;
  date: Date | null;
  timeSlotId: string | null;
  notes: string;
}