export function EntryFee() {
    return (
      <section id="entry-fee">
        <div>
          <h2 className="text-left py-3 text-3xl">Entry Fee</h2>
          <p className="text-left">
            Each official competition will have{" "}
            <span className="text-[#FF6900]">
              <a href="#" className="hover:underline">
                different entry fee
              </a>
            </span>
            , this is calculated based in the league performance and the amount of users in the platform.
            <br />
            The private leagues or{" "}
            <span className="text-[#FF6900]">
              <a href="#" className="hover:underline">
                friends league
              </a>
            </span>{" "}
            will have a entry fee of <span className="text-[#FF6900] font-bold">210 STRK</span>.
          </p>
        </div>
      </section>
    )
  }