export function PoolsPunctuation() {
    return (
      <section id="pools-punctuation">
        <div>
          <h2 className="py-2 text-left text-3xl">Pools punctuation</h2>
          <p className="text-left">
            Each pool will have a different rewarding, the rules to win points in the pools are the following:
          </p>
  
          <div className="overflow-x-auto pt-5 pb-5 w-full">
            <table className="cricket-table w-full border border-white">
              <thead>
                <tr className="bg-[#3730A3] text-center">
                  <th colSpan={2} className="py-2 text-xl">
                    Prediction scoring pool
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-center">Exact number of points on game</td>
                  <td className="p-2 text-center">+25 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">-2 goals of local or visit</td>
                  <td className="p-2 text-center">+10 points bonus</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">+2 goals of local or visit</td>
                  <td className="p-2 text-center">+10 points bonus</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Accert one of the numbers</td>
                  <td className="p-2 text-center">+15 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Accert winner</td>
                  <td className="p-2 text-center">+10 points</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Acert correct score</td>
                  <td className="p-2 text-center">+50 points</td>
                </tr>
              </tbody>
  
              <thead>
                <tr className="bg-[#3730A3] text-center">
                  <th colSpan={2} className="py-2 text-xl">
                    Special pools
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 text-center">Accert correct top scorer of the round</td>
                  <td className="p-2 text-center">*5 your bet</td>
                </tr>
                <tr>
                  <td className="p-2 text-center">Accert correct top keeper of the round</td>
                  <td className="p-2 text-center">*5 your bet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }