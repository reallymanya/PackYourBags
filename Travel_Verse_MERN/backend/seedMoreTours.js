import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from './models/Tour.js';
import { mongoDBconnect } from './config/mongoDBConn.js';

dotenv.config();

// Rough conversion or manual realistic pricing in INR
const newTours = [
    // --- Beach Tours ---
    {
        title: "Maldives Paradise Escape",
        city: "Maldives",
        address: "North Malé Atoll, Maldives",
        distance: 200, price: 85000, maxGroupSize: 4,
        desc: "Relax in overwater bungalows and enjoy the crystal clear waters of the Maldives.",
        photo: "/tour-images/maldives.png",
        featured: true, beach: true, honey: true
    },
    {
        title: "Goa Beach Party",
        city: "Goa",
        address: "Baga Beach, Goa, India",
        distance: 100, price: 15000, maxGroupSize: 15,
        desc: "Experience the vibrant nightlife and sunny beaches of Goa.",
        photo: "/tour-images/tour-img09.jpg",
        featured: false, beach: true, si: true
    },
    {
        title: "Bora Bora Luxury Retreat",
        city: "Bora Bora",
        address: "French Polynesia",
        distance: 500, price: 250000, maxGroupSize: 2,
        desc: "The ultimate romantic getaway in the South Pacific.",
        photo: "/tour-images/beach.jpg",
        featured: true, beach: true, honey: true
    },

    // --- Hill Station Tours ---
    {
        title: "Manali Adventure",
        city: "Manali",
        address: "Himachal Pradesh, India",
        distance: 300, price: 12000, maxGroupSize: 10,
        desc: "Snow-capped mountains, trekking, and paragliding in the Himalayas.",
        photo: "/tour-images/Hill-Tours.jpg",
        featured: true, hill: true, wild: true
    },
    {
        title: "Swiss Alps Ski Trip",
        city: "Zermatt",
        address: "Switzerland",
        distance: 600, price: 150000, maxGroupSize: 8,
        desc: "World-class skiing and breathtaking alpine views from the Matterhorn.",
        photo: "/tour-images/swiss_alps.png",
        featured: true, hill: true, si: true
    },
    {
        title: "Ooty Tea Gardens",
        city: "Ooty",
        address: "Tamil Nadu, India",
        distance: 200, price: 10000, maxGroupSize: 12,
        desc: "Walk through lush green tea plantations and ride the toy train.",
        photo: "/tour-images/tour-img08.jpg",
        featured: false, hill: true, cul: true
    },

    // --- Wildlife Tours ---
    {
        title: "Masai Mara Safari",
        city: "Narok",
        address: "Kenya",
        distance: 400, price: 120000, maxGroupSize: 6,
        desc: "Witness the Big Five in their natural habitat during the Great Migration.",
        photo: "/tour-images/safari.png",
        featured: true, wild: true, si: true
    },
    {
        title: "Jim Corbett National Park",
        city: "Ramnagar",
        address: "Uttarakhand, India",
        distance: 250, price: 18000, maxGroupSize: 8,
        desc: "Jungle safari in the oldest national park in India, home of the Bengal Tiger.",
        photo: "/tour-images/wild.jpg",
        featured: false, wild: true
    },
    {
        title: "Amazon Rainforest Expedition",
        city: "Manaus",
        address: "Brazil",
        distance: 800, price: 180000, maxGroupSize: 5,
        desc: "Deep jungle trek and river cruise in the lungs of the Earth.",
        photo: "/tour-images/tour-img04.jpg",
        featured: true, wild: true
    },

    // --- Devotional Tours ---
    {
        title: "Spiritual Varanasi",
        city: "Varanasi",
        address: "Uttar Pradesh, India",
        distance: 100, price: 5000, maxGroupSize: 20,
        desc: "Experience the Ganga Aarti and the ancient spiritual energy of Kashi.",
        photo: "/tour-images/dev.webp",
        featured: true, dev: true, cul: true
    },
    {
        title: "Golden Temple Visit",
        city: "Amritsar",
        address: "Punjab, India",
        distance: 150, price: 4000, maxGroupSize: 15,
        desc: "Visit the holiest Gurudwara of Sikhism and enjoy the Langar.",
        photo: "/tour-images/golden_temple.png",
        featured: false, dev: true, cul: true
    },
    {
        title: "Mecca Pilgrimage",
        city: "Mecca",
        address: "Saudi Arabia",
        distance: 500, price: 90000, maxGroupSize: 50,
        desc: "A spiritual journey to the holiest city in Islam.",
        photo: "/tour-images/mecca.png", 
        featured: true, dev: true
    },

    // --- Heritage/History Tours (Old) ---
    {
        title: "Pyramids of Giza",
        city: "Cairo",
        address: "Egypt",
        distance: 400, price: 60000, maxGroupSize: 10,
        desc: "Explore the ancient wonders of the world and the Sphinx.",
        photo: "/tour-images/tour-img10.jpg",
        featured: true, old: true, si: true
    },
    {
        title: "Machu Picchu Trek",
        city: "Cusco",
        address: "Peru",
        distance: 900, price: 140000, maxGroupSize: 8,
        desc: "Hike the Inca Trail to the lost city in the clouds.",
        photo: "/tour-images/heritage.jpg",
        featured: true, old: true, wild: true
    },
    {
        title: "Taj Mahal Tour",
        city: "Agra",
        address: "Uttar Pradesh, India",
        distance: 150, price: 2000, maxGroupSize: 20,
        desc: "Visit the symbol of love, one of the Seven Wonders of the World.",
        photo: "/tour-images/taj_mahal.png",
        featured: true, old: true, cul: true, honey: true
    },

     // --- Cultural Tours ---
    {
         title: "Kyoto Cultural Walk",
         city: "Kyoto",
         address: "Japan",
         distance: 600, price: 75000, maxGroupSize: 10,
         desc: "Tea ceremonies, geishas, and ancient temples in Japan's cultural capital.",
         photo: "/tour-images/cultural.jpg",
         featured: true, cul: true, old: true
    },
    {
        title: "Rajasthan Royal Tour",
        city: "Jaipur",
        address: "Rajasthan, India",
        distance: 200, price: 35000, maxGroupSize: 12,
        desc: "Forts, palaces, and vibrant colors of the Pink City.",
        photo: "/tour-images/rajasthan_royal.png",
        featured: true, cul: true, old: true
    },
    {
         title: "Rome City Tour",
         city: "Rome",
         address: "Italy",
         distance: 500, price: 85000, maxGroupSize: 15,
         desc: "Colosseum, Vatican, and authentic Italian pasta.",
         photo: "/tour-images/tour-img07.jpg",
         featured: true, cul: true, old: true, si: true
    }
];

const seedMoreTours = async () => {
    try {
        await mongoDBconnect();
        console.log('Connected to MongoDB');

        await Tour.deleteMany({}); 
        console.log('Cleared existing tours');

        await Tour.insertMany(newTours);
        console.log(`Successfully added ${newTours.length} new tours with INR prices!`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedMoreTours();
