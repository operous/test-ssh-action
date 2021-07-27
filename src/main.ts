import { main } from "./lib";
import { setFailed } from "@actions/core";

main().catch((err) => {
  setFailed(err);
});
