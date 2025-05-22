import {
  ShopItemCreateDto,
  ShopItemDto,
  ShopItemModifyDto,
} from '@ddays-app/types';
import { TransactionCreateDto } from '@ddays-app/types/src/dto/shop';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { UserGuard } from 'src/auth/user.guard';

import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('buy')
  @UseGuards(UserGuard)
  buyItems(@Body() transactionItemDtos: TransactionCreateDto[]) {
    return this.shopService.buyItems(transactionItemDtos);
  }

  @Post('shopItem')
  @UseGuards(AdminGuard)
  createShopItem(@Body() shopItemDto: ShopItemCreateDto) {
    return this.shopService.createShopItem(shopItemDto);
  }

  @Get('items')
  getAllShopItems() {
    return this.shopService.getAllShopItems();
  }

  @Get('items/:id')
  @UseGuards(AdminGuard)
  getShopItem(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.getShopItemById(id);
  }

  @Get('points')
  @UseGuards(UserGuard)
  getUserPoints(@Req() { user }) {
    return this.shopService.getUserPoints(user.id);
  }

  @Get('transactions/user')
  @UseGuards(UserGuard)
  getAllUserTransactions(@Req() { user }) {
    return this.shopService.getAllUserTransactions(user.id);
  }

  @Patch('transaction/verify')
  @UseGuards(AdminGuard)
  verifyCollectedItem(
    @Body() verifyCollectedItemDto: { itemId: number; userId: number },
  ) {
    const { itemId, userId } = verifyCollectedItemDto;
    return this.shopService.verifyCollectedItem(itemId, userId);
  }

  @Patch('shopItem/:id')
  @UseGuards(AdminGuard)
  updateShopItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: ShopItemModifyDto,
  ) {
    return this.shopService.updateShopItem(id, updateShopDto);
  }

  @Delete('shopItem/:id')
  @UseGuards(AdminGuard)
  removeShopItem(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.removeShopItem(id);
  }

  @UseGuards(AdminGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch('/photo/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateShopItemPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ShopItemDto> {
    return this.shopService.updateShopItemPhoto(id, file);
  }

  @Delete('/photo/:id')
  @UseGuards(AdminGuard)
  async deleteShopItemPhoto(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.shopService.deleteShopItemPhoto(id);
  }
}
