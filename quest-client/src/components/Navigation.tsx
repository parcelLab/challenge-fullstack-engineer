import { useAuthorizedRoute } from "../hooks/useAuthorizedRoute";

export const Navigation = () => {
	const { logout, checkIfLoggedIn } = useAuthorizedRoute();

	if (!checkIfLoggedIn()) return null;

	return (
		<nav className="w-full max-w-screen-md mx-auto">
			<div className="p-8 bg-blue-400 text-right">
				<strong
					className="text-white text-2xl cursor-pointer"
					onClick={logout}
				>
					Log Out
				</strong>
			</div>
		</nav>
	);
};
