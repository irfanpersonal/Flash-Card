'use client';

import Link from 'next/link';
import {useSelector} from 'react-redux';
import {type useSelectorType} from './store';

const HomePage: React.FunctionComponent = () => {
	const {user} = useSelector((store: useSelectorType) => store.user);
  	return (
		<div className="flex flex-col items-center justify-center">
			<header className="bg-white shadow w-full p-6">
				<h1 className="text-3xl font-bold text-center text-gray-800">Flash Card</h1>
				<p className="text-center text-gray-600">Store and organize your flashcards with ease.</p>
			</header>
			<section className="mt-10 max-w-4xl w-full px-4">
				<article className="bg-white rounded-lg shadow-md p-8 mb-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">Create Packs</h2>
					<p className="text-gray-600">Organize your flashcards into packs to easily manage different categories and subjects.</p>
				</article>
				<article className="bg-white rounded-lg shadow-md p-8 mb-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">Store Flashcards</h2>
					<p className="text-gray-600">Save your flashcards securely and access them anytime, anywhere.</p>
				</article>
				<article className="bg-white rounded-lg shadow-md p-8 mb-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">Learn and Review</h2>
					<p className="text-gray-600">Use our minimalistic style to study your flashcards and enhance your learning.</p>
				</article>
				{!user && (
					<div className="text-center mt-10">
						<Link href='/auth' className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">Get Started</Link>
					</div>
				)}
			</section>
		</div>
  	);
};

export default HomePage;