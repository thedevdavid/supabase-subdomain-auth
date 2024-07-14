/**
 * Test file for the rewrites in next.config.js. This is useful to test the logic for rewriting
 * paths to multi zones to make sure that the logic is correct before deploying the application.
 */

import { type MatchResult, compile, match } from "path-to-regexp";
import nextConfig from "../next.config";

function getDestination(destination: string, pathMatch: MatchResult): string {
  const hasDifferentHost = destination.startsWith("https://");
  if (hasDifferentHost) {
    const destinationUrl = new URL(destination);
    destinationUrl.pathname = compile(destinationUrl.pathname, {
      encode: encodeURIComponent,
    })(pathMatch.params);
    return destinationUrl.toString();
  }
  return compile(destination, {
    encode: encodeURIComponent,
  })(pathMatch.params);
}

const APP_URL = "http://localhost:3001";

describe("next.config.js test", () => {
  describe("rewrites", () => {
    let rewrites: Awaited<ReturnType<NonNullable<typeof nextConfig.rewrites>>>;

    beforeAll(async () => {
      process.env.APP_URL = APP_URL;
      console.log("beforeAll");
      console.log("process.env.APP_URL", process.env.APP_URL);
      console.log(
        "process.env.NEXT_PUBLIC_APP_URL",
        process.env.NEXT_PUBLIC_APP_URL
      );
      rewrites = await nextConfig.rewrites!();
      console.log(rewrites);
    });

    function getRewrittenUrl(path: string): string | undefined {
      const allRewrites =
        "beforeFiles" in rewrites
          ? [...rewrites.beforeFiles, ...rewrites.afterFiles]
          : rewrites;
      for (const rewrite of allRewrites) {
        console.log("start iteration");
        console.log("rewrite", rewrite.source, " -> ", rewrite.destination);
        if (rewrite.has?.length) {
          console.log("rewrite has length", rewrite.has?.length);
          continue;
        }
        const rewriteMatch = match(rewrite.source)(path);
        if (rewriteMatch) {
          console.log("match", rewriteMatch);
          return getDestination(rewrite.destination, rewriteMatch);
        }
      }
      console.log("donsies");
      return undefined;
    }

    it("root gets rewritten to /home", () => {
      expect(getRewrittenUrl("/")).toEqual("/home");
    });

    it("non app pages are not rewritten", () => {
      expect(getRewrittenUrl("/app-not")).toEqual(undefined);
      expect(getRewrittenUrl("/app2")).toEqual(undefined);
    });

    it("/app is rewritten to child zone", () => {
      expect(getRewrittenUrl("/app")).toEqual(`${APP_URL}/app`);
      expect(getRewrittenUrl("/app/dashboard")).toEqual(
        `${APP_URL}/app/dashboard`
      );
    });
  });
});
