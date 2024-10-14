import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CronService {
  public constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_WEEK)
  async handleCron() {
    console.log('Deleting unecessary ranking entries')

    const top100Entries = await this.prisma.ranking_global.findMany({
      take: 100,
      orderBy: {
        score: 'desc'
      },
      select: {
        id: true
      }
    })

    const top100ids = top100Entries.map(entry => entry.id)

    await this.prisma.ranking_global.deleteMany({
      where: {
        id: {
          notIn: top100ids
        }
      }
    })
  }
}