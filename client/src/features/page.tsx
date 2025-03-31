import Footer from "../shared/components/footer";
import Header from "../shared/components/header/page";
import WelcomePage from "./LandingPage/WelcomePage";

export default function HomePage() {
	return (
		<>
			<Header />
			<WelcomePage />
			<Footer />
		</>
	);
}
