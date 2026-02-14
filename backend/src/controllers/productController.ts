import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Product } from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const products = await productRepository.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id: req.params.id });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = productRepository.create(req.body);
        await productRepository.save(product);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
};
