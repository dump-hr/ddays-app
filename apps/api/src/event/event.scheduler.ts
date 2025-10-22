import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';
import { EventService } from './event.service';

@Injectable()
export class EventScheduler {
  private readonly logger = new Logger(EventScheduler.name);

  constructor(private readonly eventService: EventService) {
    this.scheduleFlyTalkStatusUpdate(new Date('2025-10-22T18:46:00'));
  }

  private scheduleFlyTalkStatusUpdate(scheduledDate: Date) {
    const cronExpression = this.getCronExpression(scheduledDate);

    cron.schedule(
      cronExpression,
      async () => {
        const flyTalkEvents = await this.eventService.getAllFlyTalks();

        for (const event of flyTalkEvents) {
          try {
            await this.eventService.updateFlyTalkApplicationStatus(event.id);
          } catch (error) {
            console.error(`Failed to update event ${event.id}`, error);
          }
        }
      },
      {
        timezone: 'Europe/Zagreb',
      },
    );
  }

  private getCronExpression(date: Date) {
    const minute = date.getMinutes();
    const hour = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${minute} ${hour} ${day} ${month} *`;
  }
}
