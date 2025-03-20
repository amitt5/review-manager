import { Star, TrendingUp } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-400 mt-2">Track your review performance and metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Reviews"
          value="124"
          change="+12%"
          icon={<Star className="h-5 w-5 text-yellow-500" />}
        />
        <MetricCard
          title="Conversion Rate"
          value="68%"
          change="+5%"
          icon={<TrendingUp className="h-5 w-5 text-green-500" />}
        />
        <MetricCard
          title="Average Rating"
          value="4.7"
          change="+0.2"
          icon={<Star className="h-5 w-5 text-yellow-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#252525] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{rating}</span>
                </div>
                <div className="flex-1 bg-[#333333] h-6 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{
                      width: `${rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400 w-12 text-right">
                  {rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#252525] rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
          <div className="h-64 flex items-end gap-2">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-yellow-500 rounded-t-sm"
                  style={{ height: `${20 + (i * 10) + Math.random() * 20}%` }}
                ></div>
                <span className="text-xs text-gray-400">{month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#252525] rounded-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 pb-4 border-b border-gray-700">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">Customer {i}</h4>
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, idx) => (
                          <Star
                            key={idx}
                            className={`h-4 w-4 ${idx < (i % 2 === 0 ? 5 : 4) ? "text-yellow-500" : "text-gray-600"}`}
                            fill={idx < (i % 2 === 0 ? 5 : 4) ? "currentColor" : "none"}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    {i % 2 === 0
                      ? "Great service! Highly recommend this business to everyone."
                      : "Very satisfied with my experience. The staff was friendly and helpful."}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {i} day{i !== 1 ? "s" : ""} ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function MetricCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  const isPositive = change.startsWith("+")

  return (
    <div className="bg-[#252525] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 font-medium">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <div className={`flex items-center mt-2 text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
        <span>{change}</span>
        <span className="text-gray-400 ml-1">vs last month</span>
      </div>
    </div>
  )
}

