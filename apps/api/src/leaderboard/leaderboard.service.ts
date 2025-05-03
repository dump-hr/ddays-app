import {
  LeaderboardEntryDto,
  LeaderboardQueryDto,
  LeaderboardResponseDto,
  UserRankResponseDto,
} from '@ddays-app/types/src/dto/leaderboard';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { getLevelFromPoints } from './leaderboard.helper';

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
      },
      orderBy: [
        { points: 'desc' },
        { id: 'asc' }, // Add secondary sort by ID to match tie-breaking rule
      ],
      skip,
      take: Number(pageSize),
    });

    const entries = users.map((user, index) => {
      const rank = skip + index + 1;

      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        level: getLevelFromPoints(user.points || 0).level,
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
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const usersAbove = await this.prisma.user.count({
      where: {
        isDeleted: false,
        OR: [
          { points: { gt: user.points || 0 } },
          {
            AND: [
              { points: user.points || 0 }, // Same points
              { id: { lt: user.id } }, // But created earlier (lower ID)
            ],
          },
        ],
      },
    });

    const rank = usersAbove + 1;

    const formatUser = (u, r): LeaderboardEntryDto => ({
      id: u.id,
      name: `${u.firstName} ${u.lastName}`,
      points: u.points || 0,
      rank: r,
      level: getLevelFromPoints(u.points || 0).level,
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
      orderBy: [{ points: 'desc' }, { id: 'asc' }],
      take: count,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        points: true,
        profilePhotoUrl: true,
      },
    });

    return topUsers.map((user, index) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      level: getLevelFromPoints(user.points || 0).level,
      points: user.points || 0,
      rank: index + 1,
      profilePhotoUrl: user.profilePhotoUrl,
    }));
  }
}
