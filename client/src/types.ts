
interface PlayerStats {
    id: string;
    player_name: string;
    player_team: string;
    image_path: string;
    selected_percentage: number;
    reward_rate: number;
    points: number;
    runs: number;
}

interface PlayerTableViewStats {
    id: string;
    position: string;
    player_name: string;
    player_team: string;
    image_path: string;
    price: number;
    pointsPerMatch: number;
    selectedPercentage: number;
    totalRuns: number;
    totalWickets: number;
    minutesPlayed: number;
}

interface PaginatedPlayerStats {
    data: PlayerStats[];
    total: number;
    page: number;
    limit: number;
}

interface Team {
    id: string;
    name: string;
    image_path: string;
}

interface Match {
    id: string;
    homeTeamId: string;
    awayTeamId: string;
    matchDate: Date;
    homeTeam: Team;
    awayTeam: Team;
    pool: unknown;
}

interface HomeData {
    topPlayers: PlayerStats[];
    upcomingMatches: Match[];
}

export type { HomeData, Team, Match, PlayerStats, PlayerTableViewStats, PaginatedPlayerStats };
