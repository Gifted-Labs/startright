export interface Speaker {
    id?: number;
    name: string;
    bio?: string;
    imageUrl?: string;
    role?: string;
    title?: string; // Backend DTO uses title, mapped to role in frontend
    linkedinUrl?: string;
    twitterUrl?: string;
    displayOrder?: number;
    quote?: string;
    quoteAuthor?: string;
}

/**
 * Itinerary item types matching backend ItineraryItemType enum.
 * Using const object instead of enum for TypeScript erasableSyntaxOnly compatibility.
 */
export const ItineraryItemType = {
    CEREMONY: 'CEREMONY',
    SESSION: 'SESSION',
    WORKSHOP: 'WORKSHOP',
    PANEL: 'PANEL',
    BREAK: 'BREAK',
    MEAL: 'MEAL',
    NETWORKING: 'NETWORKING',
    WORSHIP: 'WORSHIP',
    REGISTRATION: 'REGISTRATION',
    ENTERTAINMENT: 'ENTERTAINMENT',
    AWARDS: 'AWARDS',
    CLOSING: 'CLOSING',
    OTHER: 'OTHER'
} as const;

export type ItineraryItemType = typeof ItineraryItemType[keyof typeof ItineraryItemType];

/**
 * ItineraryItem interface matching backend EventItineraryItemResponse DTO.
 */
export interface ItineraryItem {
    id?: number;
    title: string;
    description?: string;
    startTime: string; // HH:mm:ss format
    endTime: string;   // HH:mm:ss format
    speakerName?: string;
    venue?: string;
    displayOrder: number;
    itemType: ItineraryItemType;
    itemTypeDisplayName?: string;
    durationMinutes?: number;
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

export interface MerchandiseOrder {
    color: 'BLACK' | 'WHITE';
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
    quantity: number;
}

export interface EventRegistrationRequest {
    name: string;
    email: string;
    phone: string;
    note?: string;
    needsShirt: boolean;
    shirtSize?: string;
    merchandiseOrders?: MerchandiseOrder[];
    program?: string;
    university?: string;
    academicLevel?: string;
    referralSource?: string;
    referralSourceOther?: string;
}

export interface RegistrationDetailsResponse {
    registrationToken: string;
    qrCodeBase64: string;
    checkIn: boolean;
    shirtSize?: string;
    merchandiseOrders?: MerchandiseOrder[];
    merchandiseOrdersDisplay?: string;
    name: string;
    eventTitle: string;
}

export interface GalleryItem {
    id: number;
    mediaUrl: string;
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
    speakerName: string;
    imageUrl?: string;
    createdAt: string; // ISO Date
    updatedAt?: string;
}

export type AcademicLevel =
    | 'LEVEL_100'
    | 'LEVEL_200'
    | 'LEVEL_300'
    | 'LEVEL_400'
    | 'LEVEL_500'
    | 'LEVEL_600'
    | 'POSTGRADUATE'
    | 'ALUMNI'
    | 'OTHER';

export interface Review {
    id: number;
    eventId: number;
    userId?: number;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    guestName?: string;
    guestAcademicLevel?: AcademicLevel;
    guestProgram?: string;
    isGuest: boolean;
}

export interface ReviewPageResponse {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
    ratingDistribution: Record<number, number>;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface CreateReviewRequest {
    rating: number;
    comment: string;
    guestName?: string;
    guestAcademicLevel?: AcademicLevel;
    guestProgram?: string;
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
