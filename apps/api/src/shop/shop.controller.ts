import { ShopItemCreateDto, ShopItemModifyDto } from '@ddays-app/types';

import { TransactionCreateDto } from '@ddays-app/types/src/dto/shop';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
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

  @Patch('transaction/:id/verify')
  @UseGuards(UserGuard)
  verifyCollectedItem(@Param('id', ParseIntPipe) id: number, @Req() { user }) {
    return this.shopService.verifyCollectedItem(id, user.id);
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
}
