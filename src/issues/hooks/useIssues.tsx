import React from "react";
import { Issue } from "../interfaces/issue";
import { githubApi } from "../../api/githubApi";
import { useQuery } from "@tanstack/react-query";

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>("/issues", {
    headers: {
      Authorization: null,
    },
  });
  console.log("data issue", data);
  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery({ queryKey: ["issues"], queryFn: getIssues });
  return { issuesQuery };
};
