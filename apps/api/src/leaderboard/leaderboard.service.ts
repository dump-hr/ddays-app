import {
  LeaderboardEntryDto,
  LeaderboardQueryDto,
  LeaderboardResponseDto,
  UserRankResponseDto,
} from '@ddays-app/types/src/dto/leaderboard';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard(
    query: LeaderboardQueryDto,
  ): Promise<LeaderboardResponseDto> {
    const { page, pageSize = 5, includeDeleted = false } = query;

    const pageNum = Number(page) || 1;
    const skip = (pageNum - 1) * pageSize;

    const where = {
      ...(includeDeleted ? {} : { isDeleted: false }),
      points: { not: null },
    };

    const totalEntries = await this.prisma.user.count({ where });

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
      orderBy: [{ points: 'desc' }],
      skip,
      take: Number(pageSize),
    });

    const entries = users.map((user, index) => {
      const rank = skip + index + 1;

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        points: user.points || 0,
        rank,
        profilePhotoUrl: user.profilePhotoUrl,
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

    const formatUser = (u, r): LeaderboardEntryDto => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      points: u.points || 0,
      rank: r,
      profilePhotoUrl: u.profilePhotoUrl,
    });

    return {
      user: formatUser(user, rank),
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
    }));
  }
}
