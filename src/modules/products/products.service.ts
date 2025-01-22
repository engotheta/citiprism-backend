import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, Product, UpdateProductDto } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { Event } from '../events/entitities/event.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepo: Repository<Product>,
    private readonly dataSource: DataSource
  ) {}

  async getProduct(uid: string) {
    const product = await this.productsRepo.findOne({ where: { id: +uid } });
    if (!product) throw new HttpException(`Product (${uid}) not Found`, HttpStatus.NOT_FOUND);
    return product;
  }

  async findAll() {
    const products: Product[] = await this.productsRepo.find();
    return products;
  }

  async findOne(uid: string) {
    const product: Product = await this.getProduct(uid);
    return product;
  }

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    await this.productsRepo.save(product);
    return product;
  }

  async update(uid: string, dto: UpdateProductDto) {
    let product: Product = await this.getProduct(uid);
    product = await this.productsRepo.save({ ...product, ...dto });
    return product;
  }

  async remove(uid: string) {
    let product: Product = await this.getProduct(uid);
    product = await this.productsRepo.remove({ id: +uid, ...product });
    return product;
  }

  async recommendProduct(product: Product) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      product.recommendations++;

      const event = new Event();
      event.name = 'recommend_product';
      event.type = 'product';
      event.payload = { productId: product.id };

      await queryRunner.manager.save(product);
      await queryRunner.manager.save(event);
      //
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
