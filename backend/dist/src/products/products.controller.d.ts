import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly cloudinaryService;
    constructor(productsService: ProductsService, cloudinaryService: CloudinaryService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        category: string;
        price: number;
        stock: number;
        image: string | null;
        deletedAt: Date | null;
    }>;
    findAll(lang?: string): Promise<any[]>;
    getFeatured(lang?: string): Promise<{
        categories: {
            key: string;
            label: string;
            viewsCount: number;
            productCount: number;
        }[];
        products: any[];
    }>;
    findOne(id: string, lang?: string): Promise<any>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        category: string;
        price: number;
        stock: number;
        image: string | null;
        deletedAt: Date | null;
    }>;
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        name: string;
        id: number;
        description: string | null;
        category: string;
        price: number;
        stock: number;
        image: string | null;
        deletedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
        category: string;
        price: number;
        stock: number;
        image: string | null;
        deletedAt: Date | null;
    }>;
}
