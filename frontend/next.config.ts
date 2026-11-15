import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
	sassOptions: {
		implementation: "sass-embedded",
		prependData: `@use  "@styles/utils/index.scss" as *;`, // Assuming your variables file is in styles/_variables.scss
	},
};

export default nextConfig;
