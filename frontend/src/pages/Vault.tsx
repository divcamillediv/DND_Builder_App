import { useEffect, useState } from "react";
import { supabase } from "../client/supabaseClient";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

import Account from "./Account";

const Vault = () => {
	const [user, setUser] = useState<User | null | undefined>(undefined);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();

			if (error) {
				setUser(null);
			} else {
				setUser(user);
			}
		};

		fetchUser();
	}, []);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate("/");
	};

	const slideMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		const slideMenu = document.querySelector(".slideMenu") as HTMLDivElement;
		slideMenu.style.transform = "translateX(0)";
	};

	const slideMenuEvent = (e: React.MouseEvent<HTMLElement>) => {
		const slideMenu = document.querySelector(".slideMenu") as HTMLDivElement;

		if (!(e.target as HTMLElement).closest(".slideMenu")) {
			slideMenu.style.transform = "translateX(100%)";
		}
	};

	if (user === undefined) {
		return (
			<div className="vaultContainer">
				<p>Loading...</p>
			</div>
		);
	}

	const isLoggedIn = !!user;

	return (
		<>
			<section className="vaultContainer" onClick={slideMenuEvent}>
				<header className="vaultHeader">
					<p className="description">My Vault</p>
					<div className="desktopVaultHeader">
						{!isLoggedIn && (
							<Link to="/login" className="btn vaultBtn">
								Login to save your characters
							</Link>
						)}
						<Link to="/spells" className="btn">
							Spells
						</Link>
						<Link to="/classes" className="btn">
							Classes
						</Link>
						<Link to="/races" className="btn">
							Races
						</Link>
						<Link to="/feats" className="btn">
							Feats
						</Link>
						<Link to="/backgrounds" className="btn">
							Backgrounds
						</Link>
						<Link to="/epicBoons" className="btn">
							Epic Boons
						</Link>
						<button className="btn btnLogout btnLogoutMobile" onClick={handleLogout}></button>
					</div>

					<div className="mobileMenuVault" onClick={slideMenu}></div>

					<div className="slideMenu">
						<div className="optionsMobile">
							{!isLoggedIn && (
								<Link to="/login" className="btn btnDarker">
									Login to save your characters
								</Link>
							)}
							<Link to="/spells" className="btn spellsLink">
								<img src="./spellsIcon.svg" alt="" />
								Spells
							</Link>
							<Link to="/classes" className="btn classesLink">
								<img src="./classesIcon.svg" alt="" />
								Classes
							</Link>
							<Link to="/races" className="btn racesLink">
								<img src="./racesIcon.svg" alt="" />
								Races
							</Link>
							<Link to="/feats" className="btn featsLink">
								<img src="./featsIcon.svg" alt="" />
								Feats
							</Link>
							<Link to="/backgrounds" className="btn backgroundsLink">
								<img src="./backgroundsIcon.svg" alt="" />
								Backgrounds
							</Link>
							<Link to="/epicBoons" className="btn epicBoonsLink">
								<img src="./epicIcon.svg" alt="" />
								Epic Boons
							</Link>

							<div className="logoutDiv">
								Log out
								<button className="btn btnLogout btnLogoutMobile" onClick={handleLogout}></button>
							</div>
						</div>

						<button className="closeX" onClick={() => ((document.querySelector(".slideMenu") as HTMLDivElement).style.transform = "translateX(100%)")}></button>
					</div>
				</header>

				<h1>
					Welcome to your Vault,{" "}
					{user?.email
						? (() => {
								const namePart = user.email.split(/[@.]/)[0];
								return namePart.charAt(0).toUpperCase() + namePart.slice(1);
						  })()
						: "Guest"}
				</h1>

				<div className="separation"></div>

				<Link to="/characterCreation" className="btn createNew">
					Create a character
				</Link>

				<div className="vaultCharactersContainer">{isLoggedIn ? <Account user={user} /> : <p>You must be logged in to view your characters.</p>}</div>
			</section>
		</>
	);
};

export default Vault;
