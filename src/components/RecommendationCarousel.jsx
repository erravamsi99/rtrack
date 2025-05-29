import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import appService from '../services/appService'; // Adjust if the path differs

export default function RecommendationCarousel({ userId = '1', context = {} }) {
  const scrollRef = useRef();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let res;
        if (context.subTopicId) {
          res = await appService.getRecommendationCarouselsForSubTopic(context.subTopicId, userId);
        } else if (context.topicId) {
          res = await appService.getRecommendationCarouselsForTopic(context.topicId, userId);
        } else if (context.subjectId) {
          res = await appService.getRecommendationCarouselsForSubject(context.subjectId, userId);
        } else {
          res = await appService.getRecommendations(userId);
        }

        setRecommendations(res.data);
      } catch (err) {
        setError('Failed to load recommendations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [context, userId]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (recommendations.length === 0) return <div>No recommendations available.</div>;

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recommended for You</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll('right')} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {recommendations.map((item) => (
          <motion.div
            key={item.id || item.title}
            className="snap-center flex-shrink-0 w-72 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={item.image || 'https://via.placeholder.com/300x150'}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
