export interface WeddingEvent {
  id: 'haldi' | 'mehendi' | 'sangeet' | 'ceremony' | 'reception';
  name: string;
  sanskritTitle: string;
  date: string;
  dayOfWeek: string;
  time: string;
  venueName: string;
  venueAddress: string;
  dressCode: string;
  description: string;
  image?: string;
  imageFocus?: string;
  showInCards: boolean;
  coordinates: { lat: number; lng: number };
  theme: {
    surface: string;
    border: string;
    accentText: string;
    markerBg: string;
    markerBorder: string;
  };
}

export const WEDDING_CONFIG = {
  bride: {
    firstName: 'Ananya',
    fullName: 'Ananya Sharma',
    parents: 'Daughter of Smt. Meera & Sri Rajeshwar Sharma',
  },
  groom: {
    firstName: 'Vikram',
    fullName: 'Vikramaditya Rao',
    parents: 'Son of Smt. Kavita & Sri Devendra Rao',
  },
  tagline: 'Two Hearts, One Beautiful Journey',
  weddingDateDisplay: 'February 19 – 21, 2027',
  muhuratDateDisplay: 'Sunday, February 21, 2027 · 10:30 AM IST',
  cityDisplay: 'Udaipur, Rajasthan',
  targetIsoDate: '2027-02-21T10:30:00+05:30',
  monogram: 'A ♥ V',
  hashtag: '#AnanyaFoundHerVikram',
  rsvpDeadline: 'January 15, 2027',
  conciergeEmail: 'celebrations@ananyaandvikram.in',
  welcomeBackdrop: '/assets/aistudio/4e757ac3ab391aca4924ceb205285da0_bbec26c5.jpg',
};

export const MANDAP_SHOWCASE = {
  title: 'The Sacred Wedding Mandap',
  subtitle: 'Moonlit Courtyard · Lake Pichola',
  description:
    'Draped in crimson damask roses, gold-embroidered silk curtains, and lotus-lined waters beneath the crescent moon—our sacred mandap awaits the Vedic vows.',
  image: '/assets/aistudio/6baf8c0f925ed72d3abf4c36512d3f32_7ac2db73.jpg',
};

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'haldi',
    name: 'Haldi Ceremony',
    sanskritTitle: 'Sunehri Rasam · Ubtan Utsav',
    date: 'February 19, 2027',
    dayOfWeek: 'Friday',
    time: '10:30 AM Onwards',
    venueName: 'Chunda Courtyard, The Lalit Laxmi Vilas',
    venueAddress: 'Fateh Sagar Road, Udaipur, Rajasthan 313001',
    dressCode: 'Marigold Yellow, Mustard & Ivory',
    description:
      'Sunlit turmeric blessings, marigold canopies, and joyous folk melodies in the open courtyard.',
    image: '/assets/aistudio/ad7363071759487f99bc37188193d17c_38cfdecd.jpg',
    imageFocus: 'object-bottom',
    showInCards: true,
    coordinates: { lat: 24.5912, lng: 73.6798 },
    theme: {
      surface: 'bg-[#FFF9E6]',
      border: 'border-[#E5C158]',
      accentText: 'text-[#8A4F0E]',
      markerBg: '#D9822B',
      markerBorder: '#FFF4CC',
    },
  },
  {
    id: 'mehendi',
    name: 'Mehendi Soiree',
    sanskritTitle: 'Haridra & Henna',
    date: 'February 19, 2027',
    dayOfWeek: 'Friday',
    time: '3:30 PM Onwards',
    venueName: 'Zenana Mahal Terrace, City Palace',
    venueAddress: 'Old City, Silawatwari, Udaipur, Rajasthan 313001',
    dressCode: 'Emerald Green & Rose Pink',
    description:
      'Heirloom bridal henna overlooking Lake Pichola with rose sharbat and live sitar.',
    showInCards: false,
    coordinates: { lat: 24.5764, lng: 73.6835 },
    theme: {
      surface: 'bg-[#F8EFF1]',
      border: 'border-[#D88B94]',
      accentText: 'text-[#7A2334]',
      markerBg: '#B55464',
      markerBorder: '#FCEEEF',
    },
  },
  {
    id: 'sangeet',
    name: 'Royal Sangeet',
    sanskritTitle: 'Jharokha Night · Swara Sandhya',
    date: 'February 20, 2027',
    dayOfWeek: 'Saturday',
    time: '7:00 PM Onwards',
    venueName: 'Jagmandir Island Palace Pavilion',
    venueAddress: 'Lake Pichola Island, Pichola, Udaipur, Rajasthan 313001',
    dressCode: 'Deep Maroon, Ivory & Antique Gold',
    description:
      'An enchanted night of classical fusion, family dances, and lantern glow across the palace garden.',
    image: '/assets/aistudio/49a3a26e8079a2c6c7af7211d9ddd397_0c5346de.jpg',
    imageFocus: 'object-center',
    showInCards: true,
    coordinates: { lat: 24.5674, lng: 73.6778 },
    theme: {
      surface: 'bg-[#2C0910]',
      border: 'border-[#C59B40]/50',
      accentText: 'text-[#E2C578]',
      markerBg: '#4A0E17',
      markerBorder: '#E2C578',
    },
  },
  {
    id: 'ceremony',
    name: 'Wedding Ceremony',
    sanskritTitle: 'Shubha Vivaha & Varmala',
    date: 'February 21, 2027',
    dayOfWeek: 'Sunday',
    time: '10:30 AM Muhurat',
    venueName: 'Lily Pond Courtyard, Taj Lake Palace',
    venueAddress: 'Lake Pichola, Udaipur, Rajasthan 313001',
    dressCode: 'Crimson, Royal Maroon & Kanjeevaram Silk',
    description:
      'Sacred Varmala garlands, Vedic chanting, and seven steps around the ceremonial fire beneath red roses.',
    image: '/assets/aistudio/ddf53e04ccf6bfaa433a16fda2adc9fe_731085f6.jpg',
    imageFocus: 'object-center',
    showInCards: true,
    coordinates: { lat: 24.5754, lng: 73.6801 },
    theme: {
      surface: 'bg-[#FAF2E6]',
      border: 'border-[#C59B40]',
      accentText: 'text-[#6B1220]',
      markerBg: '#6B1220',
      markerBorder: '#FAF5EB',
    },
  },
  {
    id: 'reception',
    name: 'Grand Reception',
    sanskritTitle: 'Aashirwad & Royal Banquet',
    date: 'February 21, 2027',
    dayOfWeek: 'Sunday',
    time: '7:30 PM Onwards',
    venueName: 'Durbar Hall, Fateh Prakash Palace',
    venueAddress: 'The City Palace Complex, Udaipur, Rajasthan 313001',
    dressCode: 'Heritage Black Tie, Velvet & Gold',
    description:
      'Celebrating beneath the golden floral arch with sparklers, royal Mewari dining, and blessings.',
    image: '/assets/aistudio/ff122724b08e3a951edbb99cc570bb68_b4e0cce6.jpg',
    imageFocus: 'object-center',
    showInCards: true,
    coordinates: { lat: 24.5758, lng: 73.6826 },
    theme: {
      surface: 'bg-[#F5EFE4]',
      border: 'border-[#B8903D]',
      accentText: 'text-[#6E5016]',
      markerBg: '#8F6B24',
      markerBorder: '#FFF8EB',
    },
  },
];
