"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

interface Settings {
  profileVisibility: boolean;
  courseReminders: boolean;
  certificateAlerts: boolean;
  dailyGoal: number;
  learningStyle: string;
  twoFactorEnabled: boolean;
  email: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    profileVisibility: true,
    courseReminders: true,
    certificateAlerts: true,
    dailyGoal: 30,
    learningStyle: "interactive",
    twoFactorEnabled: false,
    email: "vamsi@example.com",
  });

  const [saved, setSaved] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleToggle = (key: keyof Settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaved(false);
  };

  const handleSelectChange = (key: keyof Settings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = () => {
    setPasswordError("");
    
    if (!passwordForm.currentPassword) {
      setPasswordError("Current password is required");
      return;
    }
    if (!passwordForm.newPassword) {
      setPasswordError("New password is required");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Simulate password change
    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => {
      setPasswordSuccess(false);
      setShowPasswordModal(false);
    }, 2000);
  };

  const ToggleSwitch = ({ checked }: { checked: boolean }) => (
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-cyan-500" : "bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  );

  return (
    <div className="p-6 md:p-8 bg-bg-main min-h-screen">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-display font-700 text-white mb-2">Settings</h1>
          <p className="max-w-2xl text-sm text-gray-400">
            Customize your dashboard experience, learning preferences, and notification settings.
          </p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-2">
            <Check size={16} className="text-emerald-400" />
            <span className="text-sm text-emerald-300">Saved</span>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        <section className="rounded-3xl border border-bg-border bg-bg-card p-6">
          <h2 className="text-lg font-semibold text-white">Account Settings</h2>
          <div className="mt-4 space-y-4 text-sm text-gray-300">
            <div className="rounded-2xl bg-bg-base p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Profile Visibility</p>
                <p className="mt-1 text-xs text-gray-400">Control whether others can see your achievements and certificates.</p>
              </div>
              <button
                onClick={() => handleToggle("profileVisibility")}
                className="ml-4 shrink-0"
              >
                <ToggleSwitch checked={settings.profileVisibility} />
              </button>
            </div>
            <div className="rounded-2xl bg-bg-base p-4">
              <p className="font-medium text-white">Email</p>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleSelectChange("email", e.target.value)}
                className="mt-2 w-full rounded-lg bg-bg-border px-3 py-2 text-white text-sm border border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-bg-border bg-bg-card p-6">
          <h2 className="text-lg font-semibold text-white">Notifications</h2>
          <div className="mt-4 space-y-4 text-sm text-gray-300">
            <div className="rounded-2xl bg-bg-base p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Course Reminders</p>
                <p className="mt-1 text-xs text-gray-400">Receive updates when new lessons are available.</p>
              </div>
              <button
                onClick={() => handleToggle("courseReminders")}
                className="ml-4 shrink-0"
              >
                <ToggleSwitch checked={settings.courseReminders} />
              </button>
            </div>
            <div className="rounded-2xl bg-bg-base p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Certificate Alerts</p>
                <p className="mt-1 text-xs text-gray-400">Get notified when you unlock a new certificate.</p>
              </div>
              <button
                onClick={() => handleToggle("certificateAlerts")}
                className="ml-4 shrink-0"
              >
                <ToggleSwitch checked={settings.certificateAlerts} />
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-bg-border bg-bg-card p-6">
          <h2 className="text-lg font-semibold text-white">Learning Preferences</h2>
          <div className="mt-4 space-y-4 text-sm text-gray-300">
            <div className="rounded-2xl bg-bg-base p-4">
              <label className="font-medium text-white block mb-2">Daily Learning Goal (minutes)</label>
              <input
                type="number"
                min="15"
                max="480"
                value={settings.dailyGoal || ""}
                onChange={(e) => {
                  const value = e.target.value === "" ? 15 : Math.max(15, Math.min(480, parseInt(e.target.value) || 15));
                  handleSelectChange("dailyGoal", value);
                }}
                className="w-full rounded-lg bg-bg-border px-3 py-2 text-white text-sm border border-gray-600 focus:border-cyan-400 focus:outline-none"
              />
              <p className="mt-2 text-xs text-gray-500">Currently set to {settings.dailyGoal} minutes per day</p>
            </div>
            <div className="rounded-2xl bg-bg-base p-4">
              <label className="font-medium text-white block mb-2">Preferred Course Style</label>
              <select
                value={settings.learningStyle}
                onChange={(e) => handleSelectChange("learningStyle", e.target.value)}
                className="w-full rounded-lg bg-bg-border px-3 py-2 text-white text-sm border border-gray-600 focus:border-cyan-400 focus:outline-none"
              >
                <option value="interactive">Interactive challenges and projects</option>
                <option value="video">Video lectures with Q&A</option>
                <option value="reading">Reading materials and docs</option>
                <option value="mixed">Mixed - Everything</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-bg-border bg-bg-card p-6">
          <h2 className="text-lg font-semibold text-white">Security</h2>
          <div className="mt-4 space-y-4 text-sm text-gray-300">
            <div className="rounded-2xl bg-bg-base p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Two-Factor Authentication</p>
                <p className="mt-1 text-xs text-gray-400">Add an extra layer of security to your account.</p>
              </div>
              <button
                onClick={() => handleToggle("twoFactorEnabled")}
                className="ml-4 shrink-0"
              >
                <ToggleSwitch checked={settings.twoFactorEnabled} />
              </button>
            </div>
            <div className="rounded-2xl bg-bg-base p-4">
              <p className="font-medium text-white">Change Password</p>
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="mt-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Update your password
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={handleSave}
          className="rounded-lg bg-cyan-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
        >
          Save Changes
        </button>
        <button className="rounded-lg border border-gray-600 px-6 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white">
          Reset to Default
        </button>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-bg-border bg-bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Change Password</h3>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordError("");
                  setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {passwordSuccess ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-3">
                  <Check size={32} className="text-emerald-400" />
                  <p className="text-sm text-emerald-300">Password updated successfully!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full rounded-lg bg-bg-base px-3 py-2 text-white text-sm border border-gray-600 focus:border-cyan-400 focus:outline-none"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full rounded-lg bg-bg-base px-3 py-2 text-white text-sm border border-gray-600 focus:border-cyan-400 focus:outline-none"
                    placeholder="Enter new password (min. 8 characters)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full rounded-lg bg-bg-base px-3 py-2 text-white text-sm border border-gray-600 focus:border-cyan-400 focus:outline-none"
                    placeholder="Confirm new password"
                  />
                </div>

                {passwordError && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2">
                    <X size={16} className="text-red-400" />
                    <p className="text-xs text-red-300">{passwordError}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handlePasswordChange}
                    className="flex-1 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordError("");
                      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    }}
                    className="flex-1 rounded-lg border border-gray-600 px-4 py-2 text-sm font-semibold text-gray-300 transition hover:border-gray-500 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

