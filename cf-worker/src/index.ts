/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

type RequestBody = {
	sms_message: string;
	notification_message: string;
};

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === 'POST') {
			const body: RequestBody = await request.json();
			const { sms_message, notification_message } = body;
			console.log('sms_message:', sms_message);
			console.log('notification_message:', notification_message);
			return new Response('Messages received successfully.');
		}
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
