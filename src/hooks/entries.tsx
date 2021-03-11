import { useQuery } from "react-query";
import axios from "axios";

import { parseRedditResponse } from "../utils/reddit-utils";

const ENTRIES_LIMIT = 50;
const DEFAULT_SUB_REDDIT = "funny";

export interface IRedditEntry {
  title: string;
  thumbnail: string;
  url: string;
  author: string;
  clicked: boolean;
  id: string;
  created: number;
}

export function useFetchRedditEntries(
  limit = ENTRIES_LIMIT,
  subReddit = DEFAULT_SUB_REDDIT,
  options?: any
) {
  return useQuery<any>(
    ["reddit-entries", subReddit],
    async () => {
      const { data } = await axios.get<any>(
        `https://www.reddit.com/r/${subReddit}/top.json?limit=${limit}`
      );
      return parseRedditResponse(data);
    },
    options
  );
}
