import { Controller } from '@nestjs/common';

import { SwagBagService } from './swag-bag.service';

@Controller('swag-bag')
export class SwagBagController {
  constructor(private readonly swagBagService: SwagBagService) {}
}
