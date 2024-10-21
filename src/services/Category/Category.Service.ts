import { CategoryResI } from "../../interfaces/Category/CategoryType";
import { ResponseI } from "../../interfaces/Res/ResponseType";
import { Category } from "../../models/Category/CategorySchema";
import ResponseService from "../../utils/res/ResponseService";

class CategoryService {
  async createCategory(Payload: any): Promise<ResponseI> {
    try {
      const category = new Category(Payload);

      const saveCategory: CategoryResI = await category.save();

      return ResponseService.success("Category  created successfully", saveCategory);
    } catch (error: any) {
      return ResponseService.internalServerError("internal server Error", error.message);
    }
  }

  async GetAllCategories(): Promise<ResponseI> {
    try {
      const category: CategoryResI[] = await Category.find();
      return ResponseService.success("successfully  fetched categories", category);
    } catch (error) {
      return ResponseService.internalServerError("internal server error", error);
    }
  }
}

export default CategoryService;
