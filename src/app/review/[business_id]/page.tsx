"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { useParams } from "next/navigation";

export default function ReviewPage() {
  const [rating, setRating] = useState<number | null>(null)
  const [reviewId, setReviewId] = useState<string | null>(null);

  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const params = useParams(); // Use useParams() to get the business_id
  const businessId = params.business_id as string;
  const [business, setBusiness] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    review: "",
  })

  // In a real app, you would fetch the business details based on the business_id
 
  useEffect(() => {
    console.log(`Business ID: ${businessId}`);
    if (businessId) {
      getBusiness();
    }
  }, [businessId]);

  async function getBusiness() {
    try {
        const response = await fetch(`/api/businesses?business_id=${businessId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get business details');
        }

        const data = await response.json();
        setBusiness(data);
        console.log('businessdata111', data, business);
       
    } catch (error) {
        console.error('Error fetching business:', error);
        // alert('Failed to save business details. Please try again.');
    }
}

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating)
    console.log('selectedRating', selectedRating);
    addRating(selectedRating);
  }

  async function addRating(rating: number) {
    try {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                business_id: businessId,
                rating: rating,
            }),
        });
        const data = await response.json(); // Convert response to JSON
        console.log('response data123:', data); // Log the actual response content

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to save business details');
        } else {
            setReviewId(data.id);
            console.log('Review submitted successfully!');
        }   
    } catch (error) {
        console.error('Error saving rating:', error);
    }
}



  const handleMouseEnter = (star: number) => {
    setHoveredRating(star)
  }

  const handleMouseLeave = () => {
    setHoveredRating(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

    const handleSubmitFeedback = (e: React.FormEvent) => {
        e.preventDefault()
        // In a real app, you would submit this data to your backend
        console.log("Submitting feedback:", { rating, ...formData })
        if (reviewId) {
            addFeedback(reviewId);
        }
        alert("Thank you for your feedback!")
        // Reset the form
        setFormData({ name: "", email: "", phone: "", review: "" })
        setRating(null)
    }

    async function addFeedback(review_id: string) {
        try {
            const response = await fetch('/api/reviews', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    review_id: review_id,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    feedback: formData.review, 
                }),
            });

            const data = await response.json();
            console.log('Updated review:', data);
        } catch (error) {
            console.error('Error updating review:', error);
        }
    }

  const handleGoogleReview = () => {
    const link = `https://search.google.com/local/writereview?placeid=${business.google_place_id}`;
    window.open(link, "_blank");
  }


  // Determine which view to show based on the rating
  const renderContent = () => {
    // If no rating selected yet, show the rating selection
    if (rating === null) {
      return (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-medium text-gray-800 mt-8 mb-2 text-center">How was your experience</h1>
          <h2 className="text-3xl font-medium text-gray-800 mb-10 text-center">with {business?.business_name}?</h2>

          <div className="flex space-x-4 mb-16">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={48}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleMouseEnter(star)}
                onMouseLeave={handleMouseLeave}
                fill={
                  (hoveredRating !== null ? star <= hoveredRating : rating !== null && star <= rating)
                    ? "#FFD700"
                    : "none"
                }
                stroke={
                  (hoveredRating !== null ? star <= hoveredRating : rating !== null && star <= rating)
                    ? "#FFD700"
                    : "#71717a"
                }
                className="cursor-pointer transition-colors"
              />
            ))}
          </div>
        </div>
      )
    }

    // For ratings of 1-3, show the feedback form
    else if (rating <= 3) {
      return (
        <div className="flex flex-col items-center">
          <div className="text-center max-w-md mx-auto mb-8">
            <p className="text-gray-700 mb-6">
              We want our customers to be 100% satisfied. Please let us know why you had a bad experience, so we can
              improve our service. Leave your email to be contacted.
            </p>
          </div>

          <form onSubmit={handleSubmitFeedback} className="w-full max-w-md">
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone with area code"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="mb-6">
              <textarea
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                placeholder="Review"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition-colors"
            >
              Send
            </button>

            <div className="text-center mt-4">
              <button type="button" className="text-sm text-gray-500 hover:underline" onClick={() => setRating(null)}>
                Leave a public review
              </button>
            </div>
          </form>
        </div>
      )
    }

    // For ratings of 4-5, show the Google review option
    else {
      return (
        <div className="flex flex-col items-center">
          <div className="text-center max-w-md mx-auto mb-8">
            <p className="text-gray-700">
              Leave us a review, it will help us grow and better serve our customers like you.
            </p>
          </div>

          <div className="w-full max-w-md space-y-4">
            <button
              onClick={handleGoogleReview}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between py-8 px-4">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        {/* Store Icon */}
        <div className="mb-6">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 100V180H150V100" stroke="black" strokeWidth="4" />
            <path d="M30 60V100H170V60" stroke="black" strokeWidth="4" />
            <path d="M30 60C30 60 30 40 50 40C70 40 70 60 70 60" stroke="black" strokeWidth="4" />
            <path d="M70 60C70 60 70 40 90 40C110 40 110 60 110 60" stroke="black" strokeWidth="4" />
            <path d="M110 60C110 60 110 40 130 40C150 40 150 60 150 60" stroke="black" strokeWidth="4" />
            <path d="M150 60C150 60 150 40 170 40C190 40 190 60 190 60" stroke="black" strokeWidth="4" />
            <path d="M90 140L110 140" stroke="black" strokeWidth="2" />
            <path d="M80 130L85 135" stroke="black" strokeWidth="2" />
            <path d="M115 135L120 130" stroke="black" strokeWidth="2" />
          </svg>
        </div>

        {/* Dynamic Content based on rating */}
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 text-center text-gray-500 text-sm">
        Powered by <span className="font-bold">reviewBoost</span>
      </div>
    </div>
  )
}

