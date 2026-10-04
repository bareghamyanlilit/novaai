export interface UserSettings {
    name: string;
    email: string;
    company: string;
    timezone: string;
    language: string;

    emailNotifications: boolean;
    workflowNotifications: boolean;
    billingNotifications: boolean;
    marketingEmails: boolean;

    twoFactorEnabled: boolean;

    theme: "light" | "system";
}