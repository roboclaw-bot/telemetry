import { describe, expect, it } from "vitest";
import { experimental_readRawConfig } from "wrangler";

describe("deployment privacy", () => {
	it("keeps outcome and daily datasets separate", () => {
		const { rawConfig } = experimental_readRawConfig({ config: "wrangler.jsonc" });
		expect(rawConfig.analytics_engine_datasets).toEqual([
			{ binding: "TELEMETRY", dataset: "openclaw_telemetry" },
			{ binding: "UPDATE_RESULTS", dataset: "openclaw_update_results" },
		]);
	});
	it("explicitly disables Worker observability and request logging", () => {
		const { rawConfig } = experimental_readRawConfig({
			config: "wrangler.jsonc",
		});

		expect(rawConfig.observability).toMatchObject({
			enabled: false,
			logs: {
				enabled: false,
				invocation_logs: false,
			},
		});
	});
});
