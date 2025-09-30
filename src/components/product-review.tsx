import React from 'react';
import { User } from 'lucide-react';

type Review = {
  id: number;
  userName: string;
  comment: string;
  date: string;
};

type ProductReviewProps = {
  reviews: Review[];
};

const ProductReview: React.FC<ProductReviewProps> = ({ 
  reviews 
}) => {
  return (
    <div className="space-y-6">
      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6">
            <div className="flex items-start">
              <div className="bg-gray-200 rounded-full p-2 mr-4">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h5 className="font-medium text-[#002B50]">{review.userName}</h5>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 mt-2">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;