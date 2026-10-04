export type TeamMemberRole =
    | "Owner"
    | "Admin"
    | "Member"
    | "Viewer";

export type TeamMemberStatus =
    | "Active"
    | "Invited"
    | "Inactive";

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: TeamMemberRole;
    status: TeamMemberStatus;
    joinedAt: string;
}