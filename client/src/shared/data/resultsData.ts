export interface TeamInfo {
    imgSrc: string;
    teamName: string;
    score: number;
}

export interface Player {
    playerName: string;
    teamName: string;
    playerType: string;
    score: number;
    avatarSrc: string;
    position: number;
}

export interface Match {
    date: Date;
    teams: [TeamInfo, TeamInfo];
}

export const resultStatsData = {
    matchesPlayed: 24,
    matchesTotal: 60,
    rankingCurrent: 45,
    rankingPercentage: 20,
    totalPoints: 2456,
    teamGrade: 9.1,
};

export const matchesData: Match[] = Array.from({ length: 7 }, () => ({
    date: new Date(),
    teams: [
        {
            imgSrc: "",
            teamName: "Team 1",
            score: 165,
        },
        {
            imgSrc: "",
            teamName: "Team 2",
            score: 185,
        },
    ],
}));

export const topPlayersData: Player[] = 
[
    {
        playerName: "Player name",
        teamName: "Team name",
        playerType: "Bowler",
        score: 320,
        avatarSrc: "",
        position: 1,
    },
    {
        playerName: "Player name",
        teamName: "Team name",
        playerType: "Bowler",
        score: 316,
        avatarSrc: "",
        position: 2,
    },
    {
        playerName: "Player name",
        teamName: "Team name",
        playerType: "Bowler",
        score: 294,
        avatarSrc: "",
        position: 3,
    },
    {
        playerName: "Player name",
        teamName: "Team name",
        playerType: "Bowler",
        score: 286,
        avatarSrc: "",
        position: 4,
    },
    {
        playerName: "Player name",
        teamName: "Team name",
        playerType: "Bowler",
        score: 286,
        avatarSrc: "",
        position: 4,
    }
];

export const weeklyProgressData =
{
    chartCategories: [
        "",
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
    ],
    chartSeries: [null, 100, 150, 170, 80, 200, 160, null],
    totalPoints: 856,
    pointsPercentage: 12,
    rank: 2,
};

export const poolResultsData =
{
    chartCategories: [
        "",
        1,
        7,
        10,
        15,
        30,
        34,
        40,
        45,
        50,
        55,
        60,
        65,
        70
    ],
    chartSeries: [null, 15, 70, 80, 85, 70, 25, 50, 85, 75, 30, 45, 75, 50, 55, null],
    chartYannotation: 70,
    successRate: 57,
    totalEarnings: 652,
    bestPrediction: 84,
    avgAccuracy: 59,
}

