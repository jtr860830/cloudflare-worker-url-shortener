/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env) {
		const alias = new URL(request.url).pathname.substring(1);
		const sheetApiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${env["GOOGLE_SHEET_ID"]}/values/A2:B${env["URL_MAX_NUM"] + 1}?key=${env["GOOGLE_SHEET_API_KEY"]}`;
		const res = await fetch(sheetApiUrl);
		const data = await res.json();
		const row = data.values.find((el) => el[0] === alias);
		if (row === undefined) return new Response("Not found", { status: 404 });
		const url = row[1];
		return Response.redirect(url, 302);
	},
};
