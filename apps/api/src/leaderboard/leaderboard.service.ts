import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  LeaderboardResponseDto,
  UserRankResponseDto,
  LeaderboardQueryDto,
  LeaderboardEntryDto,
} from '@ddays-app/types/src/dto/leaderboard';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard(
    query: LeaderboardQueryDto,
  ): Promise<LeaderboardResponseDto> {
    const { page, pageSize = 5, includeDeleted = false } = query;

    const pageNum = Number(page) || 1;
    const skip = (pageNum - 1) * pageSize;

    // Get users with points, filtering deleted users if needed
    const where = {
      ...(includeDeleted ? {} : { isDeleted: false }),
      points: { not: null },
    };

    // Get total count for pagination
    const totalEntries = await this.prisma.user.count({ where });

    // Get users ordered by points (descending) and last achievement time
    const users = await this.prisma.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        points: true,
        profilePhotoUrl: true,
        userToAchievement: {
          orderBy: {
            timeOfAchievement: 'desc',
          },
          take: 1,
          select: {
            timeOfAchievement: true,
          },
        },
      },
      orderBy: [
        { points: 'desc' },
        // Ordering by the latest achievement time
        // (as a proxy for last points update time)
      ],
      skip,
      take: Number(pageSize),
    });

    // Map users to leaderboard entries with ranks
    const entries = users.map((user, index) => {
      const rank = skip + index + 1;

      /*      // Use the most recent achievement time or current date if no achievements
      const lastPointsUpdate = user.userToAchievement[0]?.timeOfAchievement || new Date(); */

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        points: user.points || 0,
        rank,
        profilePhotoUrl: user.profilePhotoUrl,
        /*  lastPointsUpdate, */
      };
    });

    return {
      entries,
      totalEntries,
      page,
      pageSize,
    };
  }

  async getUserRank(userId: number): Promise<UserRankResponseDto> {
    // Get the user with their points
    const user = await this.prisma.user.findUnique({
      where: { id: userId, isDeleted: false },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        points: true,
        profilePhotoUrl: true,
        isDeleted: true,
        userToAchievement: {
          orderBy: {
            timeOfAchievement: 'desc',
          },
          take: 1,
          select: {
            timeOfAchievement: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Count users with more points to determine rank
    const usersAbove = await this.prisma.user.count({
      where: {
        isDeleted: false,
        points: {
          gt: user.points || 0,
        },
      },
    });

    const rank = usersAbove + 1;

    // Get 3 users above and below the current user for context
    /*  const aboveUsers = await this.prisma.user.findMany({
      where: {
        isDeleted: false,
        points: {
          gt: user.points || 0,
        },
      },
      orderBy: [
        { points: 'asc' },
      ],
      take: 3,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        points: true,
        profilePhotoUrl: true,
        userToAchievement: {
          orderBy: {
            timeOfAchievement: 'desc',
          },
          take: 1,
          select: {
            timeOfAchievement: true,
          },
        },
      },
    });

    const belowUsers = await this.prisma.user.findMany({
      where: {
        isDeleted: false,
        points: {
          lte: user.points || 0,
        },
        id: {
          not: userId,
        },
      },
      orderBy: [
        { points: 'desc' },
      ],
      take: 3,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        points: true,
        profilePhotoUrl: true,
        userToAchievement: {
          orderBy: {
            timeOfAchievement: 'desc',
          },
          take: 1,
          select: {
            timeOfAchievement: true,
          },
        },
      },
    });
 */
    // Format the entries
    const formatUser = (u, r): LeaderboardEntryDto => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      points: u.points || 0,
      rank: r,
      profilePhotoUrl: u.profilePhotoUrl,
      /*    lastPointsUpdate: u.userToAchievement[0]?.timeOfAchievement || new Date(), */
    });

    return {
      user: formatUser(user, rank),
      /*    aboveUsers: aboveUsers.map((u, index) => formatUser(u, rank - index - 1)),
        belowUsers: belowUsers.map((u, index) => formatUser(u, rank + index + 1)), */
    };
  }

  async getTopUsers(count = 3): Promise<LeaderboardEntryDto[]> {
    const topUsers = await this.prisma.user.findMany({
      where: {
        isDeleted: false,
        points: { not: null },
      },
      orderBy: [{ points: 'desc' }],
      take: count,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        points: true,
        profilePhotoUrl: true,
        userToAchievement: {
          orderBy: {
            timeOfAchievement: 'desc',
          },
          take: 1,
          select: {
            timeOfAchievement: true,
          },
        },
      },
    });

    return topUsers.map((user, index) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      points: user.points || 0,
      rank: index + 1,
      profilePhotoUrl: user.profilePhotoUrl,
      lastPointsUpdate:
        user.userToAchievement[0]?.timeOfAchievement || new Date(),
    }));
  }
}
