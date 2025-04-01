export function SideNavigation() {
    return (
      <div className="relative hidden md:block pt-5">
        <span className="sticky top-10">
          <ul className="border-l-2 border-white pl-4">
            <li className="hover:text-[#FF6900] py-1">
              <a href="#introduction">· Introduction</a>
            </li>
            <li className="hover:text-[#FF6900] py-1">
              <a href="#cricket-rules">· Cricket Rules</a>
            </li>
            <li className="hover:text-[#FF6900] py-1 ml-3">
              <a href="#additional-rules">· Additional rules</a>
            </li>
            <li className="hover:text-[#FF6900] py-1">
              <a href="#entry-fee">· Entry Fee</a>
            </li>
            <li className="hover:text-[#FF6900] py-1">
              <a href="#rewards">· Rewards</a>
            </li>
          </ul>
        </span>
      </div>
    )
  }