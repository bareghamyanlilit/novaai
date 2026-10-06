"use client";

import {
    CheckCircle2,
    Clock3,
    Mail,
    MoreHorizontal,
    Search,
    Users,
} from "lucide-react";
import {
    useEffect,
    useMemo,
    useState,
    useSyncExternalStore,
} from "react";

import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import {
    getTeamServerSnapshot,
    getTeamSnapshot,
    saveTeamMembers,
    subscribeToTeamStore,
} from "@/lib/teamStorage";
import type {
    TeamMember,
    TeamMemberRole,
    TeamMemberStatus,
} from "@/types/team";

function createMemberId() {
    return `member-${crypto.randomUUID()}`;
}

export default function TeamPage() {
    const teamSnapshot =
        useSyncExternalStore(
            subscribeToTeamStore,
            getTeamSnapshot,
            getTeamServerSnapshot,
        );

    const members = useMemo(() => {
        if (!teamSnapshot) {
            return [];
        }

        try {
            return JSON.parse(
                teamSnapshot,
            ) as TeamMember[];
        } catch {
            return [];
        }
    }, [teamSnapshot]);

    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] =
        useState<"all" | TeamMemberRole>("all");

    const [statusFilter, setStatusFilter] =
        useState<"all" | TeamMemberStatus>("all");

    const [inviteOpen, setInviteOpen] =
        useState(false);

    const [inviteName, setInviteName] =
        useState("");

    const [inviteEmail, setInviteEmail] =
        useState("");

    const [inviteRole, setInviteRole] =
        useState<TeamMemberRole>("Member");

    const [openMenuId, setOpenMenuId] =
        useState<string | null>(null);

    const [editingMember, setEditingMember] =
        useState<TeamMember | null>(null);

    const [editingRole, setEditingRole] =
        useState<TeamMemberRole>("Member");

    const [removingMember, setRemovingMember] =
        useState<TeamMember | null>(null);

    const filteredMembers = useMemo(() => {
        const query = search.trim().toLowerCase();

        return members.filter((member) => {
            const matchesSearch =
                !query ||
                member.name
                    .toLowerCase()
                    .includes(query) ||
                member.email
                    .toLowerCase()
                    .includes(query);

            const matchesRole =
                roleFilter === "all" ||
                member.role === roleFilter;

            const matchesStatus =
                statusFilter === "all" ||
                member.status === statusFilter;

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });
    }, [
        members,
        search,
        roleFilter,
        statusFilter,
    ]);

    const activeCount = members.filter(
        (member) => member.status === "Active",
    ).length;

    const invitedCount = members.filter(
        (member) => member.status === "Invited",
    ).length;

    useEffect(() => {
        if (
            !inviteOpen &&
            !editingMember &&
            !removingMember
        ) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key !== "Escape") {
                return;
            }

            setInviteOpen(false);
            setEditingMember(null);
            setRemovingMember(null);
        }

        window.addEventListener(
            "keydown",
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown,
            );
        };
    }, [
        inviteOpen,
        editingMember,
        removingMember,
    ]);

    function inviteMember() {
        const name = inviteName.trim();
        const email = inviteEmail.trim();

        const isValidEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || !isValidEmail) {
            return;
        }

        const newMember: TeamMember = {
            id: createMemberId(),
            name,
            email,
            role: inviteRole,
            status: "Invited",
            joinedAt: "Just now",
        };

        const updatedMembers = [
            ...members,
            newMember,
        ];

        saveTeamMembers(updatedMembers);

        setInviteName("");
        setInviteEmail("");
        setInviteRole("Member");
        setInviteOpen(false);
    }

    function startEditRole(member: TeamMember) {
        setOpenMenuId(null);
        setEditingMember(member);
        setEditingRole(member.role);
    }

    function saveRole() {
        if (!editingMember) {
            return;
        }

        const updatedMembers = members.map((member) =>
            member.id === editingMember.id
                ? {
                    ...member,
                    role: editingRole,
                }
                : member,
        );

        saveTeamMembers(updatedMembers);

        setEditingMember(null);
    }

    function resendInvite(member: TeamMember) {
        setOpenMenuId(null);

        const updatedMembers = members.map((item) =>
            item.id === member.id
                ? {
                    ...item,
                    status: "Invited" as const,
                    joinedAt: "Invite resent",
                }
                : item,
        );

        saveTeamMembers(updatedMembers);
    }

    function requestRemoveMember(member: TeamMember) {
        setOpenMenuId(null);
        setRemovingMember(member);
    }

    function removeMember() {
        if (!removingMember) {
            return;
        }

        const updatedMembers = members.filter(
            (member) =>
                member.id !== removingMember.id,
        );

        saveTeamMembers(updatedMembers);

        setRemovingMember(null);
    }
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-[var(--primary)]">
                        Workspace
                    </p>

                    <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                        Team
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                        Manage your workspace members,
                        roles, and access.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setInviteOpen(true)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-hover)]"
                >
                    <Mail size={17} />
                    Invite Member
                </button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] text-[var(--primary)]">
                            <Users size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Total Members
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                                {members.length}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <CheckCircle2 size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Active Members
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                                {activeCount}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <Clock3 size={20} />
                        </div>

                        <div>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Pending Invites
                            </p>

                            <p className="mt-1 text-2xl font-semibold text-[var(--text-primary)]">
                                {invitedCount}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Members */}
            <Card className="overflow-hidden">
                <div className="border-b border-[var(--border)] p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                Members
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                {filteredMembers.length} members
                                shown
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="relative">
                                <Search
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                                />

                                <input
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Search members..."
                                    className="h-10 w-full rounded-xl border border-[var(--border)] bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-[var(--primary)] sm:w-56"
                                />
                            </div>

                            <select
                                value={roleFilter}
                                onChange={(event) =>
                                    setRoleFilter(
                                        event.target.value as
                                        | "all"
                                        | TeamMemberRole,
                                    )
                                }
                                className="h-10 rounded-xl border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--primary)]"
                            >
                                <option value="all">
                                    All roles
                                </option>

                                <option value="Owner">
                                    Owner
                                </option>

                                <option value="Admin">
                                    Admin
                                </option>

                                <option value="Member">
                                    Member
                                </option>

                                <option value="Viewer">
                                    Viewer
                                </option>
                            </select>

                            <select
                                value={statusFilter}
                                onChange={(event) =>
                                    setStatusFilter(
                                        event.target.value as
                                        | "all"
                                        | TeamMemberStatus,
                                    )
                                }
                                className="h-10 rounded-xl border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--primary)]"
                            >
                                <option value="all">
                                    All status
                                </option>

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Invited">
                                    Invited
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left">
                        <thead>
                            <tr className="border-b border-[var(--border)] bg-[var(--surface-secondary)]">
                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    Member
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    Role
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    Status
                                </th>

                                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                                    Joined
                                </th>

                                <th className="w-12 px-5 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {filteredMembers.map(
                                (member) => (
                                    <tr
                                        key={member.id}
                                        className="border-b border-[var(--border)] last:border-0"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    name={
                                                        member.name
                                                    }
                                                />

                                                <div>
                                                    <p className="text-sm font-medium text-[var(--text-primary)]">
                                                        {
                                                            member.name
                                                        }
                                                    </p>

                                                    <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                                                        {
                                                            member.email
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="text-sm text-[var(--text-secondary)]">
                                                {
                                                    member.role
                                                }
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${member.status ===
                                                    "Active"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : member.status ===
                                                        "Invited"
                                                        ? "bg-amber-50 text-amber-700"
                                                        : "bg-slate-100 text-slate-600"
                                                    }`}
                                            >
                                                {
                                                    member.status
                                                }
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-[var(--text-secondary)]">
                                            {
                                                member.joinedAt
                                            }
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenMenuId(
                                                            openMenuId === member.id
                                                                ? null
                                                                : member.id,
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                                    aria-label={`Actions for ${member.name}`}
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>

                                                {openMenuId === member.id && (
                                                    <div className="absolute right-0 top-10 z-20 w-44 rounded-xl border border-[var(--border)] bg-white p-1.5 shadow-lg">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                startEditRole(member)
                                                            }
                                                            className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                                        >
                                                            Edit Role
                                                        </button>

                                                        {member.status === "Invited" && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    resendInvite(member)
                                                                }
                                                                className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)] hover:text-[var(--text-primary)]"
                                                            >
                                                                Resend Invite
                                                            </button>
                                                        )}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                requestRemoveMember(member)
                                                            }
                                                            className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--danger)] transition-colors hover:bg-red-50"
                                                        >
                                                            Remove Member
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredMembers.length === 0 && (
                    <div className="px-6 py-12 text-center">
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                            No members found
                        </p>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Try changing your search or
                            filters.
                        </p>
                    </div>
                )}
            </Card>

            {inviteOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5"
                    onMouseDown={() =>
                        setInviteOpen(false)
                    }
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xl"
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                                Invite team member
                            </h2>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Add a teammate to your NovaLiAi
                                workspace.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                                    Name
                                </label>

                                <input
                                    value={inviteName}
                                    onChange={(event) =>
                                        setInviteName(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Alex Morgan"
                                    className="h-11 w-full rounded-xl border border-[var(--border)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(event) =>
                                        setInviteEmail(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="novaliaiproject@gmail.com"
                                    className="h-11 w-full rounded-xl border border-[var(--border)] px-3 text-sm outline-none transition-colors focus:border-[var(--primary)]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                                    Role
                                </label>

                                <select
                                    value={inviteRole}
                                    onChange={(event) =>
                                        setInviteRole(
                                            event.target.value as TeamMemberRole,
                                        )
                                    }
                                    className="h-11 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--primary)]"
                                >
                                    <option value="Admin">
                                        Admin
                                    </option>

                                    <option value="Member">
                                        Member
                                    </option>

                                    <option value="Viewer">
                                        Viewer
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setInviteOpen(false)
                                }
                                className="h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)]"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={inviteMember}
                                disabled={
                                    !inviteName.trim() ||
                                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                                        inviteEmail.trim(),
                                    )
                                }
                                className="h-10 rounded-xl bg-[var(--primary)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Send Invite
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editingMember && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5"
                    onMouseDown={() =>
                        setEditingMember(null)
                    }
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xl"
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                            Edit member role
                        </h2>

                        <p className="mt-1 text-sm text-[var(--text-secondary)]">
                            Change the role for {editingMember.name}.
                        </p>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                                Role
                            </label>

                            <select
                                value={editingRole}
                                onChange={(event) =>
                                    setEditingRole(
                                        event.target.value as TeamMemberRole,
                                    )
                                }
                                className="h-11 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-sm outline-none focus:border-[var(--primary)]"
                            >
                                <option value="Admin">
                                    Admin
                                </option>

                                <option value="Member">
                                    Member
                                </option>

                                <option value="Viewer">
                                    Viewer
                                </option>
                            </select>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setEditingMember(null)
                                }
                                className="h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={saveRole}
                                className="h-10 rounded-xl bg-[var(--primary)] px-4 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {removingMember && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-5"
                    onMouseDown={() =>
                        setRemovingMember(null)
                    }
                >
                    <div
                        className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xl"
                        onMouseDown={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                            Remove team member?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                            Are you sure you want to remove{" "}
                            <span className="font-medium text-[var(--text-primary)]">
                                {removingMember.name}
                            </span>{" "}
                            from this workspace?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setRemovingMember(null)
                                }
                                className="h-10 rounded-xl border border-[var(--border)] px-4 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={removeMember}
                                className="h-10 rounded-xl bg-[var(--danger)] px-4 text-sm font-medium text-white hover:opacity-90"
                            >
                                Remove Member
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}