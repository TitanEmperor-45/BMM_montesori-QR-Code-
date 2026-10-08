import { FlyerItem, Inquiry, QrItem, TourBooking, RegistrationSubmission } from '../types';

export const INITIAL_WHATSAPP_NUMBER = '27814977181'; 
export const DEFAULT_WEBSITE = 'https://BMMmontesori.netlify.app/';
export const DEFAULT_REGISTRATION_URL = 'https://BMMmontesori.netlify.app/registration';
export const DEFAULT_INSTAGRAM = 'https://www.instagram.com/bmmmontessori/?hl=en';

export const INITIAL_FLYERS: FlyerItem[] = [
  {
    id: 'flyer-1',
    title: 'Registration Now Open for 2027',
    subtitle: 'The FIRST Inclusive Montessori School in the Township!',
    description: 'Proudly Local • Legit • Authentic • Compliant. Women Owned certified business, Gauteng Department of Education (GDE) member, and South African Montessori Association (SAMA) accredited member.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    tag: '2027 Admissions',
    targetUrl: 'https://BMMmontesori.netlify.app/registration'
  },
  {
    id: 'flyer-2',
    title: 'School Viewing Tours & Open Days',
    subtitle: 'Weekends Now Open for Viewing: Oct 10-11 | 17-18 | 24-25',
    description: 'Catch a glimpse of children in their natural learning environment (09:00AM - 11:00AM). Weekdays Tue & Thu by appointment at Funda Community College, Diepkloof Zone 6, Soweto. Contact Mapule Chuene: 082 228 5300 | Zani Jacobs WhatsApp: 081 497 7181.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    tag: 'School Tours',
    targetUrl: 'https://BMMmontesori.netlify.app/#tour'
  },
  {
    id: 'flyer-3',
    title: 'Be Part of Our Class',
    subtitle: 'Authentic Montessori learning environment in Soweto',
    description: 'Individualised, child-centred learning with small classes. Practical Life, Sensorial, Language, Mathematics & Cultural Studies. Contact Maria Chuene: 082 228 3500 | Zani Jacobs: 068 933 7112.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    tag: 'Our Class',
    targetUrl: 'https://BMMmontesori.netlify.app/registration'
  },
  {
    id: 'flyer-4',
    title: 'Registration Special & Open Days 2026',
    subtitle: 'Reduced Registration Fee Valid 10th October - 10th November!',
    description: 'Come and experience Montessori education in the heart of Soweto at Funda Community College, 8642 Diepkloof Zone 6. Contact Mapule Chuene 082 228 5300 | Zani Jacobs 081 497 7181.',
    imageUrl: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80',
    tag: 'Registration Special',
    targetUrl: 'https://BMMmontesori.netlify.app/registration'
  }
];

export const INITIAL_QR_ITEMS: QrItem[] = [
  {
    id: 'qr-1',
    title: 'Main School Website',
    category: 'website',
    url: 'https://BMMmontesori.netlify.app/',
    description: 'Official portal for BMM-Montessori Soweto',
    qrColor: '#1e3a8a',
    bgColor: '#ffffff',
    frameText: 'Scan to Visit Website',
    scanCount: 1420
  },
  {
    id: 'qr-2',
    title: '2027 Student Registration Portal',
    category: 'admissions',
    url: 'https://BMMmontesori.netlify.app/registration',
    description: 'New student admissions and 2027 registration special',
    qrColor: '#047857',
    bgColor: '#ffffff',
    frameText: 'Scan to Register for 2027',
    scanCount: 1290
  },
  {
    id: 'qr-3',
    title: 'Instagram Community',
    category: 'social',
    url: 'https://www.instagram.com/bmmmontessori/?hl=en',
    description: 'Daily classroom activities and moments',
    qrColor: '#be185d',
    bgColor: '#ffffff',
    frameText: 'Follow @bmmmontessori',
    scanCount: 654
  },
  {
    id: 'qr-4',
    title: 'Direct WhatsApp Chat (Zani Jacobs)',
    category: 'whatsapp',
    url: 'https://wa.me/27814977181?text=Hello%20BMM-Montessori%20Soweto,%20I%20would%20like%20to%20inquire%20about%20admissions.',
    description: 'Instant chat with admissions office',
    qrColor: '#15803d',
    bgColor: '#ffffff',
    frameText: 'Chat on WhatsApp 081 497 7181',
    scanCount: 1525
  },
  {
    id: 'qr-5',
    title: 'Weekend School Tours Calendar',
    category: 'tour',
    url: 'https://BMMmontesori.netlify.app/#tour',
    description: 'Book weekend open days at Funda Community College',
    qrColor: '#b45309',
    bgColor: '#ffffff',
    frameText: 'Scan to Book Tour',
    scanCount: 830
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    parentName: 'Thabo Khumalo',
    childName: 'Lesedi Khumalo',
    childAge: '3.5 years',
    email: 'thabo.k@example.com',
    phone: '+27 82 555 1234',
    inquiryType: 'fees',
    message: 'Good day, please send me the fee structure for 2027 registration special at Funda Community College.',
    createdAt: '2026-10-06 09:30',
    status: 'new'
  },
  {
    id: 'inq-2',
    parentName: 'Zanele Dlamini',
    childName: 'Sipho Dlamini',
    childAge: '2 years',
    email: 'zanele.d@example.com',
    phone: '+27 73 444 5678',
    inquiryType: 'tour',
    message: 'I would love to book a weekend tour for October 10th open day.',
    createdAt: '2026-10-05 14:15',
    status: 'contacted'
  }
];

export const INITIAL_TOURS: TourBooking[] = [
  {
    id: 'tour-1',
    parentName: 'Lerato Molefe',
    phone: '+27 81 999 0000',
    email: 'lerato.m@example.com',
    preferredDate: '2026-10-10',
    preferredTime: '09:00 AM',
    numberOfAttendees: 2,
    notes: 'Open Day Weekend Viewing at Funda Community College.',
    createdAt: '2026-10-04 11:20',
    status: 'confirmed'
  }
];

export const INITIAL_REGISTRATIONS: RegistrationSubmission[] = [
  {
    id: 'reg-1',
    parentName: 'Palesa Mokoena',
    childName: 'Kopano Mokoena',
    childDOB: '2023-05-14',
    program: 'Primary Casa Class (3 - 6yrs)',
    email: 'palesa.m@example.com',
    phone: '+27 76 333 8888',
    address: 'Diepkloof Zone 6, Soweto',
    specialNeeds: 'None',
    appliedSpecial: true,
    createdAt: '2026-10-07 16:45',
    status: 'pending_review'
  }
];
