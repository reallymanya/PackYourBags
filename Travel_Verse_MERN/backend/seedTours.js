import dotenv from 'dotenv';
import { mongoDBconnect } from './config/mongoDBConn.js';
import Tour from './models/Tour.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Sample tour data
const tours = [
  {
    title: "Westminister Bridge",
    city: "London",
    address: "Somewhere in London",
    distance: 300,
    price: 99,
    maxGroupSize: 10,
    desc: "Experience the iconic Westminister Bridge in the heart of London",
    photo: "/tour-images/tour-img01.jpg",
    featured: true,
    beach: false,
    wild: false,
    si: false,
    dev: false,
    old: false,
    cul: false,
    honey: false,
    hill: false
  },
  {
    title: "Bali, Indonesia",
    city: "Bali",
    address: "Somewhere in Indonesia",
    distance: 400,
    price: 99,
    maxGroupSize: 8,
    desc: "Discover the beautiful beaches and culture of Bali, Indonesia. Experience the tropical paradise of Indonesia with stunning beaches, rich culture, and amazing food.",
    photo: "/tour-images/tour-img02.jpg",
    featured: true,
    beach: true,
    cul: true,
    honey: true
  },
  {
    title: "Snowy Mountains, Thailand",
    city: "Bangkok",
    address: "Somewhere in Thailand",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "Explore the snowy mountains and natural beauty of Thailand. Experience the amazing culture, food, and landscapes of Thailand.",
    photo: "/tour-images/tour-img03.jpg",
    featured: true,
    hill: true,
    wild: true
  },
  {
    title: "Beautiful Sunrise, Thailand",
    city: "Phuket",
    address: "Somewhere in Thailand",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "Witness breathtaking sunrises in beautiful Phuket, Thailand",
    photo: "/tour-images/tour-img04.jpg",
    featured: true,
    beach: true,
    honey: true
  },
  {
    title: "Nusa Pendia Bali, Indonesia",
    city: "Bali",
    address: "Somewhere in Indonesia",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "Visit the stunning Nusa Pendia in Bali, Indonesia",
    photo: "/tour-images/tour-img05.jpg",
    featured: true,
    beach: true
  },
  {
    title: "Cherry Blossoms Spring",
    city: "Tokyo",
    address: "Somewhere in Japan",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "Experience the magical cherry blossoms in Tokyo, Japan. Explore the beautiful culture and traditions of Japan during the spring season.",
    photo: "/tour-images/tour-img06.jpg",
    featured: true,
    cul: true
  },
  {
    title: "Holmen Lofoten, France",
    city: "Paris",
    address: "Somewhere in France",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "Explore the beautiful Holmen Lofoten region in France. Discover the rich history, culture, and stunning landscapes of France.",
    photo: "/tour-images/tour-img07.jpg",
    featured: true,
    cul: true,
    old: true
  },
  {
    title: "Jaflong, Sylhet",
    city: "Sylhet",
    address: "Somewhere in Sylhet",
    distance: 100,
    price: 99,
    maxGroupSize: 5,
    desc: "Discover the natural beauty of Jaflong in Sylhet",
    photo: "/tour-images/tour-img08.jpg",
    featured: false,
    hill: true
  },
  {
    title: "Cox's Bazar Sea Beach",
    city: "Chittagong",
    address: "Somewhere in Chittagong",
    distance: 500,
    price: 99,
    maxGroupSize: 8,
    desc: "Relax on the world's longest sea beach at Cox's Bazar",
    photo: "/tour-images/tour-img09.jpg",
    featured: false,
    beach: true
  }
];

const seedTours = async () => {
  try {
    await mongoDBconnect();
    console.log('Connected to MongoDB');

    // Clear existing tours
    await Tour.deleteMany({});
    console.log('Cleared existing tours');

    // Insert sample tours
    await Tour.insertMany(tours);
    console.log(`Successfully seeded ${tours.length} tours`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding tours:', error);
    process.exit(1);
  }
};

seedTours();

