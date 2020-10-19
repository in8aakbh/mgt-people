export interface IRequestProps {
  Requests: string;
  RequestedBy: string;
  RequestedOn: string;
  RequestSource: string;
  DueOn?: string;
  ActionTakenOn?: string;
}