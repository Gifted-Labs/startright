import api from './api';
import type {
    Event,
    RegistrationDetailsResponse,
    EventRegistrationRequest,
    Speaker,
    GalleryResponse,
    EventArticle,
    ReviewPageResponse,
    Review,
    CreateReviewRequest
} from '../types';

export const eventService = {
    // --- Events ---
    getAllEvents: async (page = 0, size = 10) => {
        const response = await api.get<{ content: Event[], totalPages: number }>(`/events?page=${page}&size=${size}`);
        return response.data;
    },

    getUpcomingEvents: async (page = 0, size = 5) => {
        const response = await api.get<{ content: Event[], totalPages: number }>(`/events/upcoming?page=${page}&size=${size}`);
        return response.data;
    },

    getPastEvents: async (page = 0, size = 10) => {
        const response = await api.get<{ content: Event[], totalPages: number }>(`/events/past?page=${page}&size=${size}`);
        return response.data;
    },

    getEventById: async (eventId: string | number) => {
        const response = await api.get<Event>(`/events/${eventId}`);
        return response.data;
    },

    // --- Registration ---
    registerForEvent: async (eventId: string | number, data: EventRegistrationRequest) => {
        const response = await api.post<RegistrationDetailsResponse>(`/events/${eventId}/register-v2`, data);
        return response.data;
    },

    getRegistrationByToken: async (eventId: string | number, token: string) => {
        const response = await api.get<RegistrationDetailsResponse>(`/events/${eventId}/registration?token=${token}`);
        return response.data;
    },

    // --- Speakers ---
    getEventSpeakers: async (eventId: string | number) => {
        const response = await api.get<Speaker[]>(`/events/${eventId}/speakers-v2`);
        return response.data;
    },

    // --- Gallery ---
    getEventGallery: async (eventId: string | number) => {
        const response = await api.get<GalleryResponse>(`/events/${eventId}/gallery`);
        return response.data;
    },

    // --- Articles ---
    getEventArticles: async (eventId: string | number) => {
        const response = await api.get<EventArticle[]>(`/events/${eventId}/articles`);
        return response.data;
    },

    getArticleById: async (eventId: string | number, articleId: string | number) => {
        const response = await api.get<EventArticle>(`/events/${eventId}/articles/${articleId}`);
        return response.data;
    },

    // --- Itinerary ---
    getEventItinerary: async (eventId: string | number) => {
        const response = await api.get<any[]>(`/events/${eventId}/itinerary`);
        return response.data;
    },

    // --- Reviews ---
    getEventReviews: async (eventId: string | number, page = 0, size = 10) => {
        const response = await api.get<ReviewPageResponse>(`/events/${eventId}/reviews?page=${page}&size=${size}`);
        return response.data;
    },

    createReview: async (eventId: string | number, data: CreateReviewRequest) => {
        const response = await api.post<Review>(`/events/${eventId}/reviews`, data);
        return response.data;
    },

    updateReview: async (eventId: string | number, reviewId: number, data: CreateReviewRequest) => {
        const response = await api.put<Review>(`/events/${eventId}/reviews/${reviewId}`, data);
        return response.data;
    },

    deleteReview: async (eventId: string | number, reviewId: number) => {
        await api.delete(`/events/${eventId}/reviews/${reviewId}`);
    },

    // --- Applications ---
    applyToVolunteer: async (data: any) => {
        const response = await api.post<any>(`/applications/volunteer`, data);
        return response.data;
    },

    applyToSponsor: async (data: any) => {
        const response = await api.post<any>(`/applications/sponsor`, data);
        return response.data;
    },
};

