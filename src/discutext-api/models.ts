export interface DiscussionSection {
  header: string;
  paragraphs: string[];
}

export interface Discussion {
  text: string;
  wfo_id: string;
  valid_at: string;
  sections: DiscussionSection[];
}
