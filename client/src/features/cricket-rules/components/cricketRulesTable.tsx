export function CricketRulesTable() {
    return (
      <section id="cricket-rules">
        <div>
          <h2 className="text-left pt-3 pb-2 lg:pt-5 text-3xl">Cricket Rules</h2>
          <p className="text-left py-2">
            Create your team with a max of{" "}
            <span className="text-[#FF6900]">
              <a href="#" className="hover:underline">
                11 players per Cricket team
              </a>
            </span>
            , there will be <span className="text-[#FF6900]">11</span> in the{" "}
            <span className="text-[#FF6900]">
              <a href="#" className="hover:underline">
                initial team
              </a>
            </span>
            , the initial players will receive the following metrics for punctuation based in the different
            positions:
          </p>
  
          <div className="overflow-x-auto pt-5 pb-5 w-full">
            <table className="cricket-table w-full border border-white">
              <thead>
                <tr className="bg-[#3730A3] text-center">
                  <th colSpan={2} className="py-2 text-xl">
                    Batsmen
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-center">1 run</td>
                  <td className="p-2 text-center">+1 point</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Boundary bonus</td>
                  <td className="p-2 text-center">+4 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Six bonus</td>
                  <td className="p-2 text-center">+6 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">25 run bonus</td>
                  <td className="p-2 text-center">+4 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Half-century bonus</td>
                  <td className="p-2 text-center">+8 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">75 run bonus</td>
                  <td className="p-2 text-center">+12 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Century</td>
                  <td className="p-2 text-center">+16 points</td>
                </tr>
              </tbody>
  
              <thead>
                <tr className="bg-[#3730A3] text-center">
                  <th colSpan={2} className="py-2 text-xl">
                    Bowlers
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-center">Dot ball</td>
                  <td className="p-2 text-center">+1 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Wicket</td>
                  <td className="p-2 text-center">+25 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">3 Wickets</td>
                  <td className="p-2 text-center">+4 points bonus</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">4 wickets</td>
                  <td className="p-2 text-center">+8 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">5 wickets</td>
                  <td className="p-2 text-center">+12 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Maiden over</td>
                  <td className="p-2 text-center">+12 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Bonus(LBW/BOWLED)</td>
                  <td className="p-2 text-center">+8 points</td>
                </tr>
              </tbody>
  
              <thead>
                <tr className="bg-[#3730A3] text-center">
                  <th colSpan={2} className="py-2 text-xl">
                    Fielders
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-center">Catch</td>
                  <td className="p-2 text-center">+8 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">3 catch</td>
                  <td className="p-2 text-center">+4 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Stumping</td>
                  <td className="p-2 text-center">+12 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Run-out</td>
                  <td className="p-2 text-center">+12 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">not a direct hit run-out</td>
                  <td className="p-2 text-center">+6 points</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }