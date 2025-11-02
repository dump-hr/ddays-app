import { Injectable} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EventService } from './event.service';
import { FLY_TALK_APPLICATION_STATUS_CRON } from '@ddays-app/types';

@Injectable()
export class EventScheduler {
  constructor(private readonly eventService: EventService) {}

  @Cron(FLY_TALK_APPLICATION_STATUS_CRON, { timeZone: 'Europe/Zagreb' })
  async handleFlyTalkStatusUpdate() {
    console.log('Starting Fly Talk application status update job');
    const flyTalkEvents = await this.eventService.getAllFlyTalks();

    for (const event of flyTalkEvents) {
      try {
        await this.eventService.updateFlyTalkApplicationStatus(event.id);
      } catch (error) {
        console.log(`Failed to update event ${event.id}`, error);
      }
    }
  }
}
