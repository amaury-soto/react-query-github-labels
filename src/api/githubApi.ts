import axios from "axios";

export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization:'Bearer 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'
  },
});
