import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import {
  User,
  Lock,
  Bell,
  Shield,
  Moon,
  Sun,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";



export default function SettingsPage({
  isDarkMode,
  setIsDarkMode,
}) {
  return (
    <div className={`p-8 ${isDarkMode ? "bg-[#1C1E4A]" : ""}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1
            className={
              isDarkMode ? "text-white" : "text-[#1C1E4A]"
            }
          >
            Settings
          </h1>
          <p
            className={
              isDarkMode ? "text-[#8386B0]" : "text-[#4B4E82]"
            }
          >
            Manage your account and preferences
          </p>
        </div>

        {/* Profile Section */}
        <Card
          className={`p-6 rounded-2xl border-[#8386B0]/20 shadow-sm ${isDarkMode ? "bg-[#2A2D5A]" : ""}`}
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(42, 45, 90, 0.95) 0%, rgba(28, 30, 74, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <User
              className={`w-5 h-5 ${isDarkMode ? "text-[#CBA6F7]" : "text-[#3454F5]"}`}
            />
            <h2
              className={
                isDarkMode ? "text-white" : "text-[#1C1E4A]"
              }
            >
              Profile Details
            </h2>
          </div>

          <div className="flex gap-6 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#3454F5] to-[#CBA6F7] flex-shrink-0 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&q=80&auto=format"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Button
                variant="outline"
                className={`rounded-xl ${isDarkMode ? "border-[#4B4E82] text-white hover:bg-[#4B4E82]/20" : "border-[#8386B0]/30 text-[#3454F5] hover:bg-[#CBA6F7]/10"}`}
              >
                Change Photo
              </Button>
              <p
                className={`text-xs ${isDarkMode ? "text-[#8386B0]" : "text-[#4B4E82]"}`}
              >
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="firstName"
                className={
                  isDarkMode
                    ? "text-[#8386B0]"
                    : "text-[#4B4E82]"
                }
              >
                First Name
              </Label>
              <Input
                id="firstName"
                defaultValue="Sarah"
                className={`rounded-xl mt-1 ${isDarkMode ? "bg-[#1C1E4A] border-[#4B4E82] text-white" : "border-[#8386B0]/30"}`}
              />
            </div>
            <div>
              <Label
                htmlFor="lastName"
                className={
                  isDarkMode
                    ? "text-[#8386B0]"
                    : "text-[#4B4E82]"
                }
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                defaultValue="Johnson"
                className={`rounded-xl mt-1 ${isDarkMode ? "bg-[#1C1E4A] border-[#4B4E82] text-white" : "border-[#8386B0]/30"}`}
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className={
                  isDarkMode
                    ? "text-[#8386B0]"
                    : "text-[#4B4E82]"
                }
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="sarah.j@university.edu"
                className={`rounded-xl mt-1 ${isDarkMode ? "bg-[#1C1E4A] border-[#4B4E82] text-white" : "border-[#8386B0]/30"}`}
              />
            </div>
            <div>
              <Label
                htmlFor="phone"
                className={
                  isDarkMode
                    ? "text-[#8386B0]"
                    : "text-[#4B4E82]"
                }
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                defaultValue="+1 (555) 123-4567"
                className={`rounded-xl mt-1 ${isDarkMode ? "bg-[#1C1E4A] border-[#4B4E82] text-white" : "border-[#8386B0]/30"}`}
              />
            </div>
          </div>

          <Button className="mt-6 bg-gradient-to-r from-[#3454F5] to-[#CBA6F7] text-white rounded-xl shadow-lg shadow-[#3454F5]/25 hover:shadow-xl hover:shadow-[#3454F5]/30 transition-all">
            Save Changes
          </Button>
        </Card>

        {/* Privacy Section */}
        <Card
          className={`p-6 rounded-2xl border-[#8386B0]/20 shadow-sm ${isDarkMode ? "bg-[#2A2D5A]" : ""}`}
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(42, 45, 90, 0.95) 0%, rgba(28, 30, 74, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield
              className={`w-5 h-5 ${isDarkMode ? "text-[#CBA6F7]" : "text-[#3454F5]"}`}
            />
            <h2
              className={
                isDarkMode ? "text-white" : "text-[#1C1E4A]"
              }
            >
              Privacy & Data
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={
                    isDarkMode ? "text-white" : "text-[#1C1E4A]"
                  }
                >
                  Share data with counselor
                </p>
                <p
                  className={`text-xs ${isDarkMode ? "text-[#8386B0]" : "text-[#4B4E82]"}`}
                >
                  Allow your counselor to view your journal
                  entries and mood data
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator
              className={
                isDarkMode ? "bg-[#4B4E82]" : "bg-[#8386B0]/20"
              }
            />

            <div className="flex items-center justify-between">
              <div>
                <p
                  className={
                    isDarkMode ? "text-white" : "text-[#1C1E4A]"
                  }
                >
                  Anonymous usage analytics
                </p>
                <p
                  className={`text-xs ${isDarkMode ? "text-[#8386B0]" : "text-[#4B4E82]"}`}
                >
                  Help improve MoodMap with anonymous data
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator
              className={
                isDarkMode ? "bg-[#4B4E82]" : "bg-[#8386B0]/20"
              }
            />

            <div className="flex items-center justify-between">
              <div>
                <p
                  className={
                    isDarkMode ? "text-white" : "text-[#1C1E4A]"
                  }
                >
                  Export my data
                </p>
                <p
                  className={`text-xs ${isDarkMode ? "text-[#8386B0]" : "text-[#4B4E82]"}`}
                >
                  Download all your journal entries and mood
                  data
                </p>
              </div>
              <Button
                variant="outline"
                className={`rounded-xl ${isDarkMode ? "border-[#4B4E82] text-white hover:bg-[#4B4E82]/20" : "border-[#8386B0]/30 text-[#3454F5] hover:bg-[#CBA6F7]/10"}`}
              >
                Export
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications Section */}
        <Card
          className={`p-6 rounded-2xl border-[#8386B0]/20 shadow-sm ${isDarkMode ? "bg-[#2A2D5A]" : ""}`}
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(42, 45, 90, 0.95) 0%, rgba(28, 30, 74, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Bell
              className={`w-5 h-5 ${isDarkMode ? "text-[#CBA6F7]" : "text-[#3454F5]"}`}
            />
            <h2
              className={
                isDarkMode ? "text-white" : "text-[#1C1E4A]"
              }
            >
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={
                    isDarkMode ? "text-white" : "text-[#1C1E4A]"
                  }
                >
                  Daily journal reminders
                </p>
                <p
                  className={`text-xs ${isDarkMode ? "text-[#8386B0]" : "text-[#4B4E82]"}`}
                >
                  Get reminded to write your daily journal entry
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator
              className={
                isDarkMode ? "bg-[#4B4E82]" : "bg-[#8386B0]/20"
              }
            />

            <div className="flex items-center justify-between">
              <div>
                <p
                  className={
                    isDarkMode ? "text-white" : "text-[#1C1E4A]"
                  }
                >
                  Session reminders
                </p>
                <p
                  className={`text-xs ${isDarkMode ? "text-[#8386B0]" : "text-[#4B4E82]"}`}
                >
                  Notifications about upcoming counseling
                  sessions
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator
              className={
                isDarkMode ? "bg-[#4B4E82]" : "bg-[#8386B0]/20"
              }
            />

            <div className="flex items-center justify-between">
              <div>
                <p
                  className={
                    isDarkMode ? "text-white" : "text-[#1C1E4A]"
                  }
                >
                  Weekly insights
                </p>
                <p
                  className={`text-xs ${isDarkMode ? "text-[#8386B0]" : "text-[#4B4E82]"}`}
                >
                  Weekly summary of your emotional wellbeing
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Appearance Section */}
        <Card
          className={`p-6 rounded-2xl border-[#8386B0]/20 shadow-sm ${isDarkMode ? "bg-[#2A2D5A]" : ""}`}
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(42, 45, 90, 0.95) 0%, rgba(28, 30, 74, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-[#CBA6F7]" />
            ) : (
              <Sun className="w-5 h-5 text-[#3454F5]" />
            )}
            <h2
              className={
                isDarkMode ? "text-white" : "text-[#1C1E4A]"
              }
            >
              Appearance
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p
                className={
                  isDarkMode ? "text-white" : "text-[#1C1E4A]"
                }
              >
                Dark Mode
              </p>
              <p
                className={`text-xs ${isDarkMode ? "text-[#8386B0]" : "text-[#4B4E82]"}`}
              >
                Switch between light and dark theme
              </p>
            </div>
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
          </div>
        </Card>

        {/* Security Section */}
        <Card
          className={`p-6 rounded-2xl border-[#8386B0]/20 shadow-sm ${isDarkMode ? "bg-[#2A2D5A]" : ""}`}
          style={{
            background: isDarkMode
              ? "linear-gradient(135deg, rgba(42, 45, 90, 0.95) 0%, rgba(28, 30, 74, 0.95) 100%)"
              : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(203, 166, 247, 0.05) 100%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock
              className={`w-5 h-5 ${isDarkMode ? "text-[#CBA6F7]" : "text-[#3454F5]"}`}
            />
            <h2
              className={
                isDarkMode ? "text-white" : "text-[#1C1E4A]"
              }
            >
              Security
            </h2>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className={`w-full rounded-xl ${isDarkMode ? "border-[#4B4E82] text-white hover:bg-[#4B4E82]/20" : "border-[#8386B0]/30 text-[#3454F5] hover:bg-[#CBA6F7]/10"}`}
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className={`w-full rounded-xl ${isDarkMode ? "border-[#4B4E82] text-white hover:bg-[#4B4E82]/20" : "border-[#8386B0]/30 text-[#3454F5] hover:bg-[#CBA6F7]/10"}`}
            >
              Enable Two-Factor Authentication
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}