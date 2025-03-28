export function Rewards() {
    return (
      <section id="rewards">
        <div>
          <h2 className="py-2 text-left text-3xl">Rewards</h2>
          <div className="text-left">
            <p>Each tournament offers different rewards based on the entry fee.</p>
            <p className="py-1">
              🏆 Top 3 Winners – Earn a{" "}
              <span className="text-[#FF6900]">
                <a href="#" className="hover:underline">
                  STRK
                </a>
              </span>{" "}
              prize.
            </p>
            <p className="py-1">
              🏅 4th & 5th Place – Receive an{" "}
              <span className="text-[#FF6900]">
                <a href="#" className="hover:underline">
                  exclusive NFT
                </a>
              </span>
              .
            </p>
          </div>
          <div className="flex rounded-md bg-[#0F172A] mt-4 p-5">
            <p>
              <span className="inline-block mr-2">⚠️</span> <span className="font-bold">Note:</span> Private
              tournaments (
              <span className="text-[#FF6900]">
                <a href="#" className="hover:underline">
                  Friends League
                </a>
              </span>
              ) do not qualify for rewards. Play in <span className="text-[#FF6900]">official</span> competitions to
              win!
            </p>
          </div>
        </div>
      </section>
    )
  }