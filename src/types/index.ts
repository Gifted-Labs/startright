export interface Speaker {
    id?: number;
    name: string;
    bio?: string;
    imageUrl?: string;
    role?: string;
    title?: string; // Backend DTO uses title, mapped to role in frontend
}

export interface ItineraryItem {
    id?: number;
    time: string;
    title: string;
    description: string;
}

export interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    imageUrl: string;
    videoUrl?: string;
    theme?: string;
    speakersV2: Speaker[];
    itinerary: ItineraryItem[];
}

export interface EventRegistrationRequest {
    name: string;
    email: string;
    phone: string;
    needsShirt: boolean;
    shirtSize?: string;
    program?: string;
    university?: string;
    academicLevel?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    referralSource?: string;
}

export interface RegistrationDetailsResponse {
    registrationToken: string;
    qrCodeBase64: string;
    checkIn: boolean;
}

export interface GalleryItem {
    id: number;
    url: string;
    type: 'IMAGE' | 'VIDEO';
    caption?: string;
}

export interface GalleryResponse {
    items: GalleryItem[];
    googleDriveFolderLink?: string;
}

export interface EventArticle {
    id: number;
    title: string;
    content: string;
    author: string;
    publishDate: string; // ISO Date
}

export interface Review {
    id: number;
    rating: number;
    comment: string;
    userName: string;
}

export interface ReviewPageResponse {
    content: Review[];
    averageRating: number;
    totalReviews: number;
}

export interface VolunteerApplicationRequest {
    eventId: number;
    fullName: string;
    email: string;
    phone: string;
    motivation: string;
    areaOfInterest: string;
}

export interface SponsorApplicationRequest {
    eventId: number;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    sponsorshipLevel: string;
    message?: string;
}
