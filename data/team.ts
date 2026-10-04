import type { TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
    {
        id: "member-1",
        name: "Alex Morgan",
        email: "alex@novaai.com",
        role: "Owner",
        status: "Active",
        joinedAt: "Jan 12, 2026",
    },
    {
        id: "member-2",
        name: "Sarah Chen",
        email: "sarah@novaai.com",
        role: "Admin",
        status: "Active",
        joinedAt: "Feb 04, 2026",
    },
    {
        id: "member-3",
        name: "David Wilson",
        email: "david@novaai.com",
        role: "Member",
        status: "Active",
        joinedAt: "Mar 18, 2026",
    },
    {
        id: "member-4",
        name: "Emma Davis",
        email: "emma@novaai.com",
        role: "Member",
        status: "Invited",
        joinedAt: "Apr 02, 2026",
    },
    {
        id: "member-5",
        name: "James Lee",
        email: "james@novaai.com",
        role: "Viewer",
        status: "Inactive",
        joinedAt: "Apr 16, 2026",
    },
];