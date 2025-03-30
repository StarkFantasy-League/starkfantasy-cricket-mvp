import Footer from "../components/footer";
import Header from "../components/header/page";
import WelcomePage from "./LandingPage/WelcomePage";
import PoolsPage from "./Pools/page";

export default function HomePage() {
	return (
		<>
			<Header />
			<PoolsPage />
			<Footer />
		</>
	);
}
