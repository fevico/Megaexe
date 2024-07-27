import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './dto/category.schema';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly CategoryModel: Model<Category>,
  ) {}

  async createCategory(categoryDto: CategoryDto) {
    // const newCategory = new this.CategoryModel(category);
    const { name, description } = categoryDto;
    const newCategory = new this.CategoryModel({ name, description });
    await newCategory.save();
    return newCategory;
  }

  async getCategory() {
    const categories = await this.CategoryModel.find().exec();
    return categories;
  }
}
