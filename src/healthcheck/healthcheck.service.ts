import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Healthcheck} from './models/healthcheck.model';

@Injectable()
export class HealthcheckService {
    
    constructor(
        @InjectModel(Healthcheck)
        private healthModel: typeof Healthcheck,
    ) {}

    async checkAll() {
        let healthResult = {
            'API': 'Available',
            'Database-Write': 'Unhealthy',
            'Database-Read': 'Unhealthy',
        };

        try {
            // Write first
            const healthEntity = await this.healthModel.create();

            if (healthEntity.id) {
                healthResult['Database-Write'] = 'Healthy';
            }

            // Then read the new item
            const result: Healthcheck = await this.healthModel.findOne(
                {
                    where: {
                        id: healthEntity.id
                    }
                }
            );

            if (result.id == healthEntity.id) {
                healthResult['Database-Read'] = 'Healthy';
                healthResult['Last-Check'] = result.createdAt;
            }

            return healthResult;
        } catch(err) {
            console.log(err);
            healthResult['Error-Message'] = err;
            return healthResult;
        }
         
    }

}
