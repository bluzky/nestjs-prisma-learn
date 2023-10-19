import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }
  @Get("drafts")
  findDrafs() {
    return this.articlesService.findDrafs();
  }

  @Get(":id")
  // @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(+id);
    if (!article) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }
    return article;
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.articlesService.remove(id);
  }
}
