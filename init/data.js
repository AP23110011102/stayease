const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "beachfront-cottage"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    geometry: { type: "Point", coordinates: [-118.7798, 34.0259] }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "modern-loft"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    geometry: { type: "Point", coordinates: [-74.006, 40.7128] }
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "mountain-retreat"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    geometry: { type: "Point", coordinates: [-106.8175, 39.1911] }
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "tuscany-villa"
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    geometry: { type: "Point", coordinates: [11.2558, 43.7699] }
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "treehouse-getaway"
    },
    price: 800,
    location: "Portland",
    country: "United States",
    geometry: { type: "Point", coordinates: [-122.6765, 45.5231] }
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: {
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "beachfront-paradise"
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
  },
  {
    title: "Countryside Bed & Breakfast",
    description: "Charming B&B with a rustic feel, delicious homemade breakfasts, and scenic views.",
    image: {
      url: "https://tse4.mm.bing.net/th/id/OIP.CF7lJHpGQ0uZd6ukxkwBTQHaEO?rs=1&pid=ImgDetMain",
      filename: "countryside-bnb"
    },
    price: 600,
    location: "Napa Valley",
    country: "United States",
    geometry: { type: "Point", coordinates: [-122.2869, 38.5025] }
  },
  {
    title: "Tropical Bungalow",
    description: "Private bungalow surrounded by palm trees and tropical gardens. Perfect for couples!",
    image: {
      url: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "tropical-bungalow"
    },
    price: 1100,
    location: "Bali",
    country: "Indonesia",
    geometry: { type: "Point", coordinates: [115.1889, -8.4095] }
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this luxury ski chalet with hot tub and fireplace.",
    image: {
      url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "ski-chalet"
    },
    price: 2200,
    location: "Zermatt",
    country: "Switzerland",
    geometry: { type: "Point", coordinates: [7.7491, 46.0207] }
  },
  {
    title: "Desert Glamping",
    description: "Luxury camping under the stars in the middle of the desert. A once-in-a-lifetime experience.",
    image: {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "desert-glamping"
    },
    price: 900,
    location: "Wadi Rum",
    country: "Jordan",
    geometry: { type: "Point", coordinates: [35.4194, 29.5328] }
  },
  {
    title: "Lakefront Cabin",
    description: "Cozy cabin with a private dock on the lake. Perfect for fishing and kayaking.",
    image: {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "lakefront-cabin"
    },
    price: 1300,
    location: "Lake Tahoe",
    country: "United States",
    geometry: { type: "Point", coordinates: [-120.0324, 39.0968] }
  },
  {
    title: "City Penthouse with Skyline View",
    description: "Luxurious penthouse apartment with breathtaking views of the city skyline.",
    image: {
      url: "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "city-penthouse"
    },
    price: 3000,
    location: "Dubai",
    country: "United Arab Emirates",
    geometry: { type: "Point", coordinates: [55.2708, 25.2048] }
  },
  {
    title: "Rustic Farmhouse",
    description: "Traditional farmhouse with modern amenities, surrounded by fields and fresh air.",
    image: {
      url: "https://assets.architecturaldesigns.com/plan_assets/347004696/original/16925WG_render_001_1674244291.jpg",
      filename: "rustic-farmhouse"
    },
    price: 700,
    location: "Tuscany",
    country: "Italy",
    geometry: { type: "Point", coordinates: [11.2558, 43.7699] }
  },
  {
    title: "Clifftop Villa",
    description: "Dramatic villa perched on a cliff with panoramic views of the ocean.",
    image: {
      url: "https://tse1.mm.bing.net/th/id/OIP.09Y_7KyCv0UyaJERUK4kLQHaEK?pid=Api&P=0&h=180",
      filename: "clifftop-villa"
    },
    price: 4000,
    location: "Santorini",
    country: "Greece",
    geometry: { type: "Point", coordinates: [25.432, 36.3932] }
  },
  {
    title: "Japanese Ryokan",
    description: "Stay in a traditional Japanese inn with tatami mats, hot springs, and kaiseki meals.",
    image: {
      url: "https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "japanese-ryokan"
    },
    price: 1800,
    location: "Kyoto",
    country: "Japan",
    geometry: { type: "Point", coordinates: [135.7681, 35.0116] }
  },
  {
    title: "African Safari Lodge",
    description: "Luxury lodge in the heart of the savannah. Guided tours and wildlife at your doorstep.",
    image: {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      filename: "safari-lodge"
    },
    price: 2700,
    location: "Maasai Mara",
    country: "Kenya",
    geometry: { type: "Point", coordinates: [35.1446, -1.4061] }
  }
];

module.exports = { data: sampleListings };
