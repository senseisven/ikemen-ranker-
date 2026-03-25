import 'react-router';
declare module 'virtual:load-fonts.jsx' {
	export function LoadFonts(): null;
}
declare module 'react-router' {
	// Extend when passing custom load context from the server
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface AppLoadContext {}
}
declare module 'npm:stripe' {
	import Stripe from 'stripe';
	export default Stripe;
}
