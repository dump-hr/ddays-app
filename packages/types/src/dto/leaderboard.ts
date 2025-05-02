export type LeaderboardEntryDto = {
  id: number;
  firstName: string;
  lastName: string;
  points: number;
  rank: number;
  profilePhotoUrl?: string;
}

export type LeaderboardResponseDto = {
  entries: LeaderboardEntryDto[];
  totalEntries: number;
  page: number;
  pageSize: number;
}

export type UserRankResponseDto = {
  user: LeaderboardEntryDto;
}

export type LeaderboardQueryDto = {
  page?: number;
  pageSize?: number;
  includeDeleted?: boolean
}
