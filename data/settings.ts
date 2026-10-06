import type { UserSettings } from "@/types/settings";

export const defaultSettings: UserSettings = {
    name: "Alex Morgan",
    email: "novaliaiproject@gmail.com",
    company: "NovaLiAi",
    timezone: "UTC",
    language: "English",

    emailNotifications: true,
    workflowNotifications: true,
    billingNotifications: true,
    marketingEmails: false,

    twoFactorEnabled: false,

    theme: "light",
};