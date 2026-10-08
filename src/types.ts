export interface Inquiry {
  id: string;
  parentName: string;
  childName: string;
  childAge: string;
  email: string;
  phone: string;
  inquiryType: 'general' | 'fees' | 'tour' | 'registration' | 'special';
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'enrolled' | 'archived';
}

export interface TourBooking {
  id: string;
  parentName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  numberOfAttendees: number;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'completed' | 'cancelled';
}

export interface RegistrationSubmission {
  id: string;
  parentName: string;
  childName: string;
  childDOB: string;
  program: string;
  email: string;
  phone: string;
  address: string;
  specialNeeds?: string;
  appliedSpecial: boolean;
  createdAt: string;
  status: 'pending_review' | 'accepted' | 'waitlisted';
}

export interface QrItem {
  id: string;
  title: string;
  category: 'social' | 'admissions' | 'tour' | 'flyer' | 'whatsapp' | 'website';
  url: string;
  description: string;
  qrColor: string;
  bgColor: string;
  frameText: string;
  scanCount: number;
}

export interface FlyerItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tag: string;
  targetUrl: string;
}
