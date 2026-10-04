"use client";

import {
    Bell,
    Check,
    Globe,
    Lock,
    Palette,
    Save,
    Shield,
    User,
    Zap,
} from "lucide-react";
import {
    useState,
    useSyncExternalStore,
} from "react";
import { Card } from "@/components/ui/Card";
import { defaultSettings } from "@/data/settings";
import {
    getSettingsServerSnapshot,
    getSettingsSnapshot,
    saveSettings,
    subscribeToSettingsStore,
} from "@/lib/settingsStorage";
import type { UserSettings } from "@/types/settings";

type SettingsTab =
    | "profile"
    | "account"
    | "security"
    | "notifications"
    | "appearance"
    | "integrations";

const tabs = [
    {
        id: "profile" as const,
        label: "Profile",
        icon: User,
    },
    {
        id: "account" as const,
        label: "Account",
        icon: Globe,
    },
    {
        id: "security" as const,
        label: "Security",
        icon: Shield,
    },
    {
        id: "notifications" as const,
        label: "Notifications",
        icon: Bell,
    },
    {
        id: "appearance" as const,
        label: "Appearance",
        icon: Palette,
    },
    {
        id: "integrations" as const,
        label: "Integrations",
        icon: Zap,
    },
];

export default function SettingsPage() {
    const settingsSnapshot =
        useSyncExternalStore(
            subscribeToSettingsStore,
            getSettingsSnapshot,
            getSettingsServerSnapshot,
        );

    const settings = settingsSnapshot
        ? JSON.parse(
            settingsSnapshot,
        ) as UserSettings
        : defaultSettings;

    const [activeTab, setActiveTab] =
        useState<SettingsTab>("profile");

    const [saved, setSaved] = useState(false);

    function updateSettings(
        updates: Partial<UserSettings>,
    ) {
        saveSettings({
            ...settings,
            ...updates,
        });

        setSaved(false);
    }

    function handleSave() {
        saveSettings(settings);
        setSaved(true);

        window.setTimeout(() => {
            setSaved(false);
        }, 2000);
    }

    return (
        <div className="space-y-8">
            <div>
                <p className="text-sm font-medium text-[var(--primary)]">
                    Workspace
                </p>

                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
                    Settings
                </h1>

                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    Manage your account, workspace and
                    application preferences.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
                <Card className="h-fit p-2">
                    <nav
                        className="space-y-1"
                        aria-label="Settings sections"
                    >
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const active =
                                activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={active}
                                    onClick={() =>
                                        setActiveTab(
                                            tab.id,
                                        )
                                    }
                                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active
                                        ? "bg-[var(--primary-light)] text-[var(--primary)]"
                                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
                                        }`}
                                >
                                    <Icon size={17} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </Card>

                <div className="min-w-0">
                    <Card className="p-6">
                        {activeTab === "profile" && (
                            <ProfileSettings
                                settings={settings}
                                onChange={
                                    updateSettings
                                }
                            />
                        )}

                        {activeTab === "account" && (
                            <AccountSettings
                                settings={settings}
                                onChange={
                                    updateSettings
                                }
                            />
                        )}

                        {activeTab === "security" && (
                            <SecuritySettings
                                settings={settings}
                                onChange={
                                    updateSettings
                                }
                            />
                        )}

                        {activeTab ===
                            "notifications" && (
                                <NotificationSettings
                                    settings={settings}
                                    onChange={
                                        updateSettings
                                    }
                                />
                            )}

                        {activeTab === "appearance" && (
                            <AppearanceSettings
                                settings={settings}
                                onChange={
                                    updateSettings
                                }
                            />
                        )}

                        {activeTab ===
                            "integrations" && (
                                <IntegrationSettings />
                            )}

                        {activeTab !==
                            "integrations" && (
                                <div className="mt-8 flex items-center justify-end gap-3 border-t border-[var(--border)] pt-5">
                                    {saved && (
                                        <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--success)]">
                                            <Check
                                                size={16}
                                            />
                                            Changes saved
                                        </span>
                                    )}

                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--primary)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-hover)]"
                                    >
                                        <Save size={16} />
                                        Save changes
                                    </button>
                                </div>
                            )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

interface SettingsSectionProps {
    title: string;
    description: string;
}

function SettingsSection({
    title,
    description,
}: SettingsSectionProps) {
    return (
        <div className="border-b border-[var(--border)] pb-5">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                {title}
            </h2>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {description}
            </p>
        </div>
    );
}

interface SettingsComponentProps {
    settings: UserSettings;
    onChange: (
        updates: Partial<UserSettings>,
    ) => void;
}

function ProfileSettings({
    settings,
    onChange,
}: SettingsComponentProps) {
    return (
        <div className="space-y-6">
            <SettingsSection
                title="Profile"
                description="Manage your personal profile information."
            />

            <div className="grid gap-5 sm:grid-cols-2">
                <Field
                    label="Full name"
                    value={settings.name}
                    onChange={(value) =>
                        onChange({ name: value })
                    }
                />

                <Field
                    label="Email"
                    type="email"
                    value={settings.email}
                    onChange={(value) =>
                        onChange({ email: value })
                    }
                />

                <Field
                    label="Company"
                    value={settings.company}
                    onChange={(value) =>
                        onChange({ company: value })
                    }
                />
            </div>
        </div>
    );
}

function AccountSettings({
    settings,
    onChange,
}: SettingsComponentProps) {
    return (
        <div className="space-y-6">
            <SettingsSection
                title="Account"
                description="Configure your workspace preferences."
            />

            <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                    label="Language"
                    value={settings.language}
                    onChange={(value) =>
                        onChange({
                            language: value,
                        })
                    }
                    options={[
                        "English",
                        "Armenian",
                        "Russian",
                    ]}
                />

                <SelectField
                    label="Timezone"
                    value={settings.timezone}
                    onChange={(value) =>
                        onChange({
                            timezone: value,
                        })
                    }
                    options={[
                        "UTC",
                        "UTC+04:00",
                        "UTC-05:00",
                        "UTC+01:00",
                    ]}
                />
            </div>
        </div>
    );
}

function SecuritySettings({
    settings,
    onChange,
}: SettingsComponentProps) {
    return (
        <div className="space-y-6">
            <SettingsSection
                title="Security"
                description="Protect your account and workspace."
            />

            <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-light)] text-[var(--primary)]">
                            <Lock size={17} />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">
                                Two-factor authentication
                            </p>

                            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                Add an extra layer of
                                security to your account.
                            </p>
                        </div>
                    </div>

                    <Toggle
                        checked={
                            settings.twoFactorEnabled
                        }
                        onChange={(checked) =>
                            onChange({
                                twoFactorEnabled:
                                    checked,
                            })
                        }
                    />
                </div>
            </div>
        </div>
    );
}

function NotificationSettings({
    settings,
    onChange,
}: SettingsComponentProps) {
    return (
        <div className="space-y-6">
            <SettingsSection
                title="Notifications"
                description="Choose which notifications you want to receive."
            />

            <div className="space-y-3">
                <ToggleRow
                    title="Email notifications"
                    description="Receive important workspace updates by email."
                    checked={
                        settings.emailNotifications
                    }
                    onChange={(checked) =>
                        onChange({
                            emailNotifications:
                                checked,
                        })
                    }
                />

                <ToggleRow
                    title="Workflow notifications"
                    description="Get notified when workflows complete or fail."
                    checked={
                        settings.workflowNotifications
                    }
                    onChange={(checked) =>
                        onChange({
                            workflowNotifications:
                                checked,
                        })
                    }
                />

                <ToggleRow
                    title="Billing notifications"
                    description="Receive billing and usage alerts."
                    checked={
                        settings.billingNotifications
                    }
                    onChange={(checked) =>
                        onChange({
                            billingNotifications:
                                checked,
                        })
                    }
                />

                <ToggleRow
                    title="Marketing emails"
                    description="Receive product updates and occasional announcements."
                    checked={
                        settings.marketingEmails
                    }
                    onChange={(checked) =>
                        onChange({
                            marketingEmails:
                                checked,
                        })
                    }
                />
            </div>
        </div>
    );
}

function AppearanceSettings({
    settings,
    onChange,
}: SettingsComponentProps) {
    return (
        <div className="space-y-6">
            <SettingsSection
                title="Appearance"
                description="Customize how NovaAI looks on your device."
            />

            <div className="grid gap-4 sm:grid-cols-2">
                <ThemeOption
                    title="Light"
                    description="Use the default light interface."
                    active={
                        settings.theme === "light"
                    }
                    onClick={() =>
                        onChange({
                            theme: "light",
                        })
                    }
                />

                <ThemeOption
                    title="System"
                    description="Follow your device appearance settings."
                    active={
                        settings.theme === "system"
                    }
                    onClick={() =>
                        onChange({
                            theme: "system",
                        })
                    }
                />
            </div>
        </div>
    );
}

function IntegrationSettings() {
    const integrations = [
        {
            name: "OpenAI",
            description:
                "Connect OpenAI models to your agents.",
        },
        {
            name: "Anthropic",
            description:
                "Connect Claude models to your workspace.",
        },
        {
            name: "Slack",
            description:
                "Send workflow notifications to Slack.",
        },
        {
            name: "Google Drive",
            description:
                "Use documents from Google Drive as knowledge sources.",
        },
    ];

    return (
        <div className="space-y-6">
            <SettingsSection
                title="Integrations"
                description="Connect external services to your NovaAI workspace."
            />

            <div className="space-y-3">
                {integrations.map(
                    (integration) => (
                        <div
                            key={integration.name}
                            className="flex flex-col gap-4 rounded-xl border border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                    {
                                        integration.name
                                    }
                                </p>

                                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                    {
                                        integration.description
                                    }
                                </p>
                            </div>

                            <button
                                type="button"
                                className="h-9 shrink-0 rounded-lg border border-[var(--border)] px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-secondary)]"
                            >
                                Connect
                            </button>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    type = "text",
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                {label}
            </span>

            <input
                type={type}
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
            />
        </label>
    );
}

function SelectField({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
}) {
    return (
        <label className="block">
            <span className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
                {label}
            </span>

            <select
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary)]"
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

function Toggle({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 ${checked
                ? "bg-[var(--primary)]"
                : "bg-slate-200"
                }`}
        >
            <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked
                    ? "left-6"
                    : "left-1"
                    }`}
            />
        </button>
    );
}

function ToggleRow({
    title,
    description,
    checked,
    onChange,
}: {
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] p-4">
            <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                    {title}
                </p>

                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {description}
                </p>
            </div>

            <Toggle
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
}

function ThemeOption({
    title,
    description,
    active,
    onClick,
}: {
    title: string;
    description: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 ${active
                ? "border-[var(--primary)] bg-[var(--primary-light)]"
                : "border-[var(--border)] hover:bg-[var(--surface-secondary)]"
                }`}
        >
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {title}
                </p>

                {active && (
                    <Check
                        size={17}
                        className="text-[var(--primary)]"
                    />
                )}
            </div>

            <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {description}
            </p>
        </button>
    );
}