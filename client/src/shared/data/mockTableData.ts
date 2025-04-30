import ViratKohli from "../../assets/images/cricket/Virat Kohli.avif";
import RohitSharma from "../../assets/images/cricket/Rohit Sharma.png";
import JaspritBumrah from "../../assets/images/cricket/Jasprit Bumrah.avif";
import RishabhPant from "../../assets/images/cricket/Rishabh Pant.avif";
import HardikPandya from "../../assets/images/cricket/Hardik Pandya.webp";
import RavindraJadeja from "../../assets/images/cricket/Ravindra Jadeja.avif"
import SuryakumarYadav from "../../assets/images/cricket/Suryakumar Yadav.avif";
import KLRahul from "../../assets/images/cricket/KL Rahul.avif";
import MohammedShami from "../../assets/images/cricket/Mohammed Shami.png";
import YuzvendraChahal from "../../assets/images/cricket/Yuzvendra Chahal.webp";
import IshanKishan from "../../assets/images/cricket/Ishan Kishan.png";

export interface Player {
  player_name: string;
    player_team: string;
    position: string;
    price: number;
    pointsPerMatch: number;
    selectedPercentage: number;
    totalRuns: number;
    totalWickets: number;
    minutesPlayed: number;
	image_path: string;
}

export const playersData = [
  {
    name: "Virat Kohli",
    team: "Royal Challengers Bengaluru",
    position: "BAT",
    price: 300,
    pointsPerMatch: 12,
    selectedPercentage: 85,
    runs: 973,
    wickets: 0,
    matchesPlayed: 16,
    image: ViratKohli,
  },
  {
    name: "Rohit Sharma",
    team: "Mumbai Indians",
    position: "BAT",
    price: 280,
    pointsPerMatch: 10,
    selectedPercentage: 72,
    runs: 489,
    wickets: 0,
    matchesPlayed: 14,
    image: RohitSharma,
  },
  {
    name: "Jasprit Bumrah",
    team: "Mumbai Indians",
    position: "BOWL",
    price: 250,
    pointsPerMatch: 9,
    selectedPercentage: 65,
    runs: 15,
    wickets: 20,
    matchesPlayed: 14,
    image: JaspritBumrah,
  },
  {
    name: "Rishabh Pant",
    team: "Delhi Capitals",
    position: "WK",
    price: 260,
    pointsPerMatch: 8,
    selectedPercentage: 58,
    runs: 446,
    wickets: 0,
    matchesPlayed: 14,
    image: RishabhPant,
  },
  {
    name: "Hardik Pandya",
    team: "Mumbai Indians",
    position: "ALL",
    price: 240,
    pointsPerMatch: 8,
    selectedPercentage: 55,
    runs: 350,
    wickets: 8,
    matchesPlayed: 14,
    image: HardikPandya,
  },
  {
    name: "Ravindra Jadeja",
    team: "Chennai Super Kings",
    position: "ALL",
    price: 220,
    pointsPerMatch: 7,
    selectedPercentage: 45,
    runs: 190,
    wickets: 10,
    matchesPlayed: 16,
    image: RavindraJadeja,
  },
  {
    name: "Suryakumar Yadav",
    team: "Mumbai Indians",
    position: "BAT",
    price: 270,
    pointsPerMatch: 9,
    selectedPercentage: 60,
    runs: 605,
    wickets: 0,
    matchesPlayed: 16,
    image: SuryakumarYadav,
  },
  {
    name: "KL Rahul",
    team: "Lucknow Super Giants",
    position: "BAT",
    price: 260,
    pointsPerMatch: 8,
    selectedPercentage: 50,
    runs: 616,
    wickets: 0,
    matchesPlayed: 15,
    image: KLRahul,
  },
  {
    name: "Mohammed Shami",
    team: "Gujarat Titans",
    position: "BOWL",
    price: 210,
    pointsPerMatch: 7,
    selectedPercentage: 40,
    runs: 20,
    wickets: 20,
    matchesPlayed: 14,
    image: MohammedShami,
  },
  {
    name: "Yuzvendra Chahal",
    team: "Rajasthan Royals",
    position: "BOWL",
    price: 200,
    pointsPerMatch: 7,
    selectedPercentage: 38,
    runs: 10,
    wickets: 21,
    matchesPlayed: 14,
    image: YuzvendraChahal,
  },
  {
    name: "Ishan Kishan",
    team: "Mumbai Indians",
    position: "WK",
    price: 220,
    pointsPerMatch: 6,
    selectedPercentage: 35,
    runs: 454,
    wickets: 0,
    matchesPlayed: 14,
    image: IshanKishan,
  },
];