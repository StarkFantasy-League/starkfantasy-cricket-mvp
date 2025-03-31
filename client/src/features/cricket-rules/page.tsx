import { Introduction } from './components/introduction';
import { CricketRulesTable } from './components/cricketRulesTable';
import { AdditionalRules } from './components/additionalRules';
import { EntryFee } from './components/entryFee';
import { Rewards } from './components/rewards';
import { PoolsPunctuation } from './components/poolsPunctuation';
import { RewardsPool } from './components/rewardsPool';
import { SideNavigation } from './components/sideNavigation';
import Header from '../../shared/components/header/page';

export default function CricketRulesContent() {
  return (
    <>
      <Header />
      <div className="flex justify-center bg-[#020617] text-white pb-5 pt-[100px]">
        <div className="container max-w-[1250px] pt-9 flex">
          <div id="content" className="px-2 max-w-[1000px] flex flex-col gap-10">
            <h1 className="text-left font-semibold text-4xl">
              Game <span className="text-[#FF6900]">Rules</span>
            </h1>

            <Introduction />
            <CricketRulesTable />
            <AdditionalRules />
            <EntryFee />
            <Rewards />
            <PoolsPunctuation />
            <RewardsPool />
          </div>

          <SideNavigation />
        </div>
      </div>
    </>
  );
}
