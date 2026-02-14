import "reflect-metadata";
import { app } from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server", error);
    }
};

startServer();
