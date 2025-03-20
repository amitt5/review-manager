import { Bell, Globe, Mail, MessageSquare, Palette, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-2">Customize your review collection experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[#252525] rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Palette className="h-5 w-5 text-yellow-500" />
              <span>Branding</span>
            </h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="business-logo" className="block text-sm font-medium mb-2">
                  Business Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Logo</span>
                  </div>
                  <button className="px-4 py-2 bg-[#333333] hover:bg-[#444444] transition-colors rounded-md text-sm">
                    Upload New Logo
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="review-message" className="block text-sm font-medium mb-2">
                  Review Request Message
                </label>
                <textarea
                  id="review-message"
                  className="w-full p-3 bg-[#333333] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[100px]"
                  placeholder="We'd love to hear your feedback!"
                  defaultValue="We'd love to hear your feedback! Your opinion helps us improve our service."
                ></textarea>
              </div>

              <div>
                <label htmlFor="theme-color" className="block text-sm font-medium mb-2">
                  Theme Color
                </label>
                <div className="flex gap-3">
                  {["#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"].map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full ${color === "#F59E0B" ? "ring-2 ring-offset-2 ring-offset-[#1a1a1a] ring-yellow-500" : ""}`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#252525] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5 text-yellow-500" />
              <span>Google Review Settings</span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Pre-fill Review Text</h3>
                  <p className="text-sm text-gray-400">Auto-populate review text for 4-5 star ratings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-yellow-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Collect Contact Info</h3>
                  <p className="text-sm text-gray-400">Ask for contact details on private feedback</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-yellow-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto-Post to Google</h3>
                  <p className="text-sm text-gray-400">Automatically post 4-5 star reviews to Google</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-yellow-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#252525] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5 text-yellow-500" />
              <span>Notifications</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>Email Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-yellow-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <span>SMS Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-yellow-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-[#252525] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5 text-yellow-500" />
              <span>Account Security</span>
            </h2>

            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 bg-[#333333] hover:bg-[#444444] transition-colors rounded-md flex items-center justify-between">
                <span>Change Password</span>
                <span className="text-gray-400">→</span>
              </button>

              <button className="w-full text-left px-4 py-3 bg-[#333333] hover:bg-[#444444] transition-colors rounded-md flex items-center justify-between">
                <span>Two-Factor Authentication</span>
                <span className="text-gray-400">→</span>
              </button>

              <button className="w-full text-left px-4 py-3 bg-[#333333] hover:bg-[#444444] transition-colors rounded-md flex items-center justify-between">
                <span>Connected Accounts</span>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-medium px-6 py-2 rounded-md">
          Save All Changes
        </button>
      </div>
    </>
  )
}

