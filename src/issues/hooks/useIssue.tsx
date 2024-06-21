import { useQuery } from "@tanstack/react-query";
import React from "react";
import { githubApi } from "../../api/githubApi";
import { Issue } from "../interfaces/issue";
import { sleep } from "../../helpers/sleep";

const getIssue = async (issueNumber: number) => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`, {
    headers: {
      Authorization: null,
    },
  });
  // console.log("data issue1", data);
  return data;
};

const getIssueComments = async (issueNumber: number) => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`,
    {
      headers: {
        Authorization: null,
      },
    }
  );
  //   console.log("data comments", data);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssue(issueNumber),
  });
  const commentsQuery = useQuery({
    queryKey: ["issue", issueNumber, "comments"],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    enabled: issueQuery.data !== undefined,
  });

  return { issueQuery, commentsQuery };
};
