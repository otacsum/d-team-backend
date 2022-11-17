import {Controller, Get} from '@nestjs/common';
import {HealthcheckService} from './healthcheck.service';

@Controller('Healthcheck')
export class HealthcheckController {
    constructor(private readonly healthcheckService: HealthcheckService) {}

    @Get()
    checkAll() {
        return this.healthcheckService.checkAll();
    }

}
