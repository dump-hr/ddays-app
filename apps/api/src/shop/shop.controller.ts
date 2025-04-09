import {
  ShopItemDto,
  TransactionCreateDto,
} from '@ddays-app/types/src/dto/shop';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/auth/admin.guard';
import { UserGuard } from 'src/auth/user.guard';

import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('buy')
  @UseGuards(UserGuard)
  buyItem(@Body() transactionItemDto: TransactionCreateDto) {
    return this.shopService.buyItem(transactionItemDto);
  }

  @Post('items')
  @UseGuards(AdminGuard)
  createShopItem(@Body() shopItemDto: ShopItemDto) {
    return this.shopService.createShopItem(shopItemDto);
  }

  @Post()
  @Get('items')
  @UseGuards(UserGuard, AdminGuard)
  getAllShopItems() {
    return this.shopService.getAllShopItems();
  }

  @Get('transactions/:userId')
  @UseGuards(UserGuard, AdminGuard)
  getAllUserTransactions(@Param('userId', ParseIntPipe) userId: number) {
    return this.shopService.getAllUserTransactions(userId);
  }

  @Patch('shopItem/:id')
  @UseGuards(AdminGuard)
  updateShopItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShopDto: ShopItemDto,
  ) {
    return this.shopService.updateShopItem(id, updateShopDto);
  }

  @Delete('shopItem/:id')
  @UseGuards(AdminGuard)
  removeShopItem(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.removeShopItem(id);
  }
}
