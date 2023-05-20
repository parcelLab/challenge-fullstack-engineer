import * as Form from "@radix-ui/react-form";
import { FormEvent, useState } from "react";
import { useApi } from "../hooks/useApi";

interface FormData {
	email: { value: string };
}

function SignInScreen() {
	const { signin } = useApi();
	const [signInError, setSignInError] = useState<string>();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { email } = event.target as typeof event.target & FormData;

		console.log({ email: email.value });

		// post to backend
		const result = await signin(email.value);

		if (result.error) {
			setSignInError(result.error);
		}
		if (result.data) {
			console.log(result.data);
		}
	};
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="w-80 p-8 border-4 border-slate-800 rounded bg-blue-100">
				<h1 className="text-xl mb-10 text-center">Sign In</h1>
				<Form.Root className="FormRoot" onSubmit={handleSubmit}>
					<Form.Field className="FormField" name="email">
						<div className="flex">
							<Form.Label className="FormLabel">Email</Form.Label>
						</div>
						<Form.Control asChild>
							<input
								className="w-full mb-1 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-blue-600 block rounded-md sm:text-sm focus:ring-1"
								type="email"
								name="email"
								required
							/>
						</Form.Control>
						<Form.Message
							className="text-red-800"
							match="valueMissing"
						>
							Please enter your email
						</Form.Message>
						<Form.Message
							className="text-red-800"
							match="typeMismatch"
						>
							Please provide a valid email
						</Form.Message>
						{signInError ? (
							<Form.Message className="text-red-800">
								{signInError}
							</Form.Message>
						) : null}
					</Form.Field>
					<Form.Submit asChild>
						<button className="mt-4 p-4 rounded bg-blue-400 w-full">
							Sign in
						</button>
					</Form.Submit>
				</Form.Root>
			</div>
		</div>
	);
}

export default SignInScreen;
