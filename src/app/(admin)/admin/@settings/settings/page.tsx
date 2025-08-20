"use client";

import { useState } from "react";
import PageHead from "@/components/layout/common/PageHead";
import PageWrapper from "@/components/layout/common/PageWrapper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";

type Digest = "off" | "daily" | "weekly";

export default function AdminSectionSettingsPage() {
  // Demo state (replace with real form state or react-hook-form later)
  const [displayName, setDisplayName] = useState("Admin");
  const [email, setEmail] = useState("admin@example.com");
  const [twoFA, setTwoFA] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [digest, setDigest] = useState<Digest>("daily");
  const [webhookUrl, setWebhookUrl] = useState(
    "https://hooks.example.com/wpguard"
  );
  const [apiKey, setApiKey] = useState("wpga-XXXX-1234-XXXX");
  const [telemetry, setTelemetry] = useState(false);
  const [retentionDays, setRetentionDays] = useState(90);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<"idle" | "ok" | "err">("idle");

  const resetDefaults = () => {
    setDisplayName("Admin");
    setEmail("admin@example.com");
    setTwoFA(true);
    setEmailAlerts(true);
    setPushAlerts(false);
    setDigest("daily");
    setWebhookUrl("https://hooks.example.com/wpguard");
    setApiKey("wpga-XXXX-1234-XXXX");
    setTelemetry(false);
    setRetentionDays(90);
    setSaved("idle");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved("idle");
    // Demo save delay
    await new Promise((r) => setTimeout(r, 800));
    // Pretend success
    setSaving(false);
    setSaved("ok");
    setTimeout(() => setSaved("idle"), 3000);
  };

  const genDemoKey = () => {
    const part = () => Math.random().toString(36).slice(2, 6).toUpperCase();
    setApiKey(`wpga-${part()}-${part()}-${part()}`);
  };

  return (
    <PageWrapper className="gap-8">
      <PageHead title="App Settings" alignTitle="left" />

      <div className="flex flex-col gap-4">
        <p>
          Configure how WPGuard behaves for your workspace: manage administrator
          preferences, authentication, notifications, and integrations. These
          options apply to all connected WordPress sites unless overridden at
          the site level.
          <br />
          Use the controls below to tailor alerts, enable two‑factor
          authentication, and connect external services such as webhooks. You
          can revisit this page anytime—changes take effect immediately after
          saving.
        </p>
        <p className="text-lg text-red-600 dark:text-red-400 font-bold">
          Demo only: the form below simulates saving and does not persist data.
        </p>
      </div>

      {saved === "ok" && (
        <Alert severity="success" variant="outlined">
          Settings saved successfully.
        </Alert>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-8">
        {/* Account preferences */}
        <section className="flex flex-col gap-4">
          <Typography variant="h6">Account Preferences</Typography>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoComplete="name"
              size="small"
              fullWidth
            />
            <TextField
              label="Administrator email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              size="small"
              fullWidth
            />
          </div>
        </section>

        <Divider />

        {/* Security */}
        <section className="flex flex-col gap-4">
          <Typography variant="h6">Security & Authentication</Typography>
          <div className="flex flex-col gap-2">
            <FormControlLabel
              control={
                <Switch
                  checked={twoFA}
                  onChange={(e) => setTwoFA(e.target.checked)}
                />
              }
              label="Require two‑factor authentication for admin logins"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Adds an extra step at sign‑in to protect privileged access.
            </p>
          </div>
        </section>

        <Divider />

        {/* Notifications */}
        <section className="flex flex-col gap-4">
          <Typography variant="h6">Notifications</Typography>
          <div className="flex flex-col gap-3">
            <FormControlLabel
              control={
                <Switch
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                />
              }
              label="Email alerts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                />
              }
              label="Push notifications"
            />
            <div className="max-w-sm">
              <FormControl fullWidth size="small">
                <InputLabel id="digest-label">Email Digest</InputLabel>
                <Select<Digest>
                  labelId="digest-label"
                  label="Email digest"
                  value={digest}
                  onChange={(e) => setDigest(e.target.value as Digest)}
                >
                  <MenuItem value="off">Off</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </section>

        <Divider />

        {/* Integrations */}
        <section className="flex flex-col gap-4">
          <Typography variant="h6">Integrations</Typography>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Webhook URL"
              placeholder="https://your-service.example.com/hook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              size="small"
              fullWidth
            />
            <div className="flex gap-2">
              <TextField
                label="API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                size="small"
                fullWidth
              />
              <Button
                type="button"
                variant="outlined"
                color="secondary"
                onClick={genDemoKey}
              >
                Generate
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Use webhooks to forward events (e.g., new alerts, scan results) to
            your incident or chat tools. API keys authenticate requests from
            external scripts.
          </p>
        </section>

        <Divider />

        {/* Data & privacy */}
        <section className="flex flex-col gap-4">
          <Typography variant="h6">Data & Privacy</Typography>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormControlLabel
              control={
                <Switch
                  checked={telemetry}
                  onChange={(e) => setTelemetry(e.target.checked)}
                />
              }
              label="Share anonymous telemetry"
            />
            <TextField
              label="Data retention (days)"
              type="number"
              value={retentionDays}
              onChange={(e) =>
                setRetentionDays(
                  Math.max(7, Math.min(365, Number(e.target.value) || 0))
                )
              }
              size="small"
              fullWidth
            />
          </div>
        </section>

        <Divider />

        <div className="flex items-center gap-4 my-6">
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            size="small"
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>

          <Button
            type="button"
            variant="outlined"
            onClick={resetDefaults}
            size="small"
          >
            Reset to defaults
          </Button>

          <span className="text-xs text-red-600 dark:text-red-400 font-bold">
            Demo only — no data is saved.
          </span>
        </div>
      </form>
    </PageWrapper>
  );
}
