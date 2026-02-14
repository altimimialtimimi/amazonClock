import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { Product } from "./models/Product";
import { User, UserRole } from "./models/User";
import bcrypt from "bcryptjs";

const seed = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected for seeding");

        const productRepository = AppDataSource.getRepository(Product);
        const userRepository = AppDataSource.getRepository(User);

        // Seed Users
        const adminEmail = "admin@freshmarket.com";
        const existingAdmin = await userRepository.findOneBy({ email: adminEmail });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            const admin = userRepository.create({
                fullName: "Admin User",
                email: adminEmail,
                password: hashedPassword,
                role: UserRole.ADMIN
            });
            await userRepository.save(admin);
            console.log("Admin user created");
        }

        // Seed Products
        const count = await productRepository.count();
        if (count === 0) {
            const products = [
                {
                    name: "Organic Roma Tomatoes - Fresh from Farm, 2 lb Bag",
                    description: "Premium organic tomatoes grown without pesticides. Perfect for salads, sauces, and sandwiches.",
                    price: 4.99,
                    category: "Vegetables",
                    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400",
                    stock: 100
                },
                {
                    name: "Baby Spinach - Pre-Washed, Ready to Eat, 10 oz Package",
                    description: "Fresh, tender baby spinach leaves. Pre-washed and ready to use in salads or cooking.",
                    price: 2.49,
                    category: "Leafy Greens",
                    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400",
                    stock: 80
                },
                {
                    name: "Fresh Avocados - Hass, Ready to Eat, 6 Count",
                    description: "Creamy, distinctive, and delicious Hass avocados. Ripened to perfection.",
                    price: 5.49,
                    category: "Fruits",
                    imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400",
                    stock: 50
                },
                {
                    name: "Fresh Organic Carrots - Sweet & Crunchy, 3 lb Bag",
                    description: "Crunchy, sweet, and full of flavor. These organic carrots are great for snacking or cooking.",
                    price: 3.29,
                    category: "Root Vegetables",
                    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400",
                    stock: 120
                },
                {
                    name: "Crown Broccoli - Non-GMO, Farm Direct, per lb",
                    description: "Fresh, nutrient-dense broccoli crowns. Excellent steamed, roasted, or raw.",
                    price: 2.99,
                    category: "Vegetables",
                    imageUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=400",
                    stock: 60
                }
            ];

            await productRepository.save(products);
            console.log("Products seeded successfully");
        } else {
            console.log("Products already exist, skipping seed");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error during seeding", error);
        process.exit(1);
    }
};

seed();
