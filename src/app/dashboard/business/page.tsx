import { Building2, Link, Star } from "lucide-react"
import ConnectGoogleBusinessButton from "@/app/components/ConnectGoogleBusinessButton"  // Adjust path if needed
// import ConnectGoogleBusinessButton from "../../components/ConnectGoogleBusinessButton"  // Adjust path if needed

export default function BusinessPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Business Setup</h1>
        <p className="text-gray-400 mt-2">Configure your business details and review link</p>
      </div>

      <div className="bg-[#252525] rounded-lg p-6 max-w-3xl">
        <div className="space-y-6">
          <div>
            <label htmlFor="business-name" className="block text-sm font-medium mb-2">
              Business Name
            </label>
            <input
              id="business-name"
              type="text"
              className="w-full p-3 bg-[#333333] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your business name"
            />
          </div>

          <div>
            <label htmlFor="google-link" className="block text-sm font-medium mb-2">
              Google Review Link
            </label>
            <div className="flex">
              <input
                id="google-link"
                type="text"
                className="flex-1 p-3 bg-[#333333] border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Paste your Google review link"
              />
              <button className="bg-[#333333] border border-l-0 border-gray-700 rounded-r-md px-4 flex items-center">
                <Link className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Or connect with Google Business API for automatic setup</p>
          </div>

          {/* <div className="pt-4 border-t border-gray-700">
            <button className="flex items-center gap-2 bg-[#333333] hover:bg-[#444444] transition-colors px-4 py-2 rounded-md">
              <Building2 className="h-4 w-4" />
              <span>Connect with Google Business</span>
            </button>
          </div> */}
           <div className="pt-4 border-t border-gray-700">
                <ConnectGoogleBusinessButton />
            </div>

          <div className="pt-4 border-t border-gray-700">
            <h3 className="text-lg font-medium mb-4">Review Page Preview</h3>
            <div className="bg-[#333333] rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="h-16 w-16 bg-gray-700 rounded-full mx-auto mb-2"></div>
                <h4 className="font-medium">Your Business Name</h4>
              </div>
              <p className="text-gray-400 mb-4">We'd love to hear your feedback!</p>
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-8 w-8 text-yellow-500" />
                ))}
              </div>
              <div className="bg-[#1a1a1a] p-3 rounded-md">
                <p className="text-sm text-gray-400">Review page preview</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-medium px-6 py-2 rounded-md">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

