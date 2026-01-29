interface Testimonial {
    quote: string;
    author: string;
    role: string;
    image: string;
}

interface BrandInfo {
    name: string;
    shortName: string;
    tagline: string;
    description: string;
    mission: string;
    vision: string;
    story: {
        title: string;
        content: string[];
    };
    values: {
        title: string;
        description: string;
        icon: string;
    }[];
    partners: {
        name: string;
        logo: string;
    }[];
    testimonials: Testimonial[];
    logo: string;
}

export const brandInfo: BrandInfo = {
    name: "Start Right Conference",
    shortName: "Start Right",
    tagline: "SETTING YOURSELF UP FOR SUCCESS",
    description: "The premier conference for university students and young professionals to kickstart their careers.",
    mission: "To empower the next generation of leaders with the knowledge, network, and skills needed to succeed in the modern world.",
    vision: "A world where every young person has the guidance and resources to achieve their full potential.",
    story: {
        title: "Starting Right",
        content: [
            "Start Right Conference is an annual event dedicated to helping students and fresh graduates navigate the complexities of career and personal development.",
            "We bring together industry leaders, innovators, and mentors to share their experiences and insights, providing a roadmap for success.",
            "Visualizing a future where every student is equipped to take on the world."
        ]
    },
    values: [
        {
            title: "Empowerment",
            description: "We provide the tools and confidence to take action.",
            icon: "HiLightBulb"
        },
        {
            title: "Networking",
            description: "Connecting ambitious minds with established leaders.",
            icon: "HiUserGroup"
        },
        {
            title: "Excellence",
            description: "Striving for the highest standards in personal and professional growth.",
            icon: "HiStar"
        }
    ],
    partners: [
        { name: "MerbsConnect", logo: "https://placehold.co/150?text=MerbsConnect" }
    ],
    testimonials: [
        {
            quote: "Start Right Conference completely changed my perspective on career planning. The networking opportunities were invaluable!",
            author: "Sarah Chen",
            role: "Software Engineer, Google",
            image: "https://placehold.co/100x100?text=SC"
        },
        {
            quote: "The mentorship sessions gave me clarity on my career path. I landed my dream job within 3 months of attending.",
            author: "Michael Okonkwo",
            role: "Product Manager, Microsoft",
            image: "https://placehold.co/100x100?text=MO"
        },
        {
            quote: "An incredible experience that every university student should have. The speakers were world-class!",
            author: "Aisha Patel",
            role: "Founder, TechStart Inc.",
            image: "https://placehold.co/100x100?text=AP"
        }
    ],
    logo: "/images/startright_logo.png"
};
