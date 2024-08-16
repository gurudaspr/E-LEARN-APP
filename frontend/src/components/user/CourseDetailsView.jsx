import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import ReactPlayer from "react-player";
import "daisyui/dist/full.css";
import { baseUrl } from "../../config/baseUrl";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // State for video playback

  useEffect(() => {
    const fetchCourseAndTopics = async () => {
      try {
        const response = await axios.get(`${baseUrl}/topic/view/${id}`);
        const { topics, course } = response.data;
        setCourse(course);
        setTopics(topics || []);
        setLoading(false);
        // Automatically set the first video as the selected video if available
        if (topics.length > 0 && topics[0].subTopics.length > 0) {
          setSelectedVideoUrl(topics[0].subTopics[0].videoUrl);
          setIsPlaying(false);
        }
      } catch (err) {
        setError("Failed to fetch course and topics details");
        setLoading(false);
      }
    };

    fetchCourseAndTopics();
  }, [id]);

  const handleSubtopicClick = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsPlaying(true); // Start playing the video
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

  return (
    <div className=" min-h-screen h-full bg-slate-200 py-10">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side: Course Details */}
          <div className="space-y-4">
            {course ? (
              <>
                <h1 className="text-3xl font-bold">{course.title}</h1>
                <p className="text-lg">{course.description}</p>
                {selectedVideoUrl && (
                  <div className="mt-4">
                    <ReactPlayer
                      url={selectedVideoUrl}
                      controls
                      width="100%"
                      height="100%"
                      playing={isPlaying}
                      className="border-2 border-gray-900 bg-black rounded-lg shadow-md 
                        xs:h-[calc(100vw*9/16)] md:h-[600px]"
                      config={{
                        vimeo: {
                          playerVars: {
                            autoplay: 0,
                          },
                        },
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <p>Course details not available</p>
            )}
          </div>

          {/* Right side: Topic List */}
          <div className="space-y-4">
            {topics.length > 0 ? (
              topics.map((topic) => (
                <div
                  key={topic._id}
                  className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-lg font-medium">
                    {topic.title}
                  </div>
                  <div className="collapse-content">
                    {topic.subTopics && topic.subTopics.length > 0 ? (
                      topic.subTopics.map((subtopic) => (
                        <button
                          key={subtopic._id}
                          onClick={() => handleSubtopicClick(subtopic.videoUrl)}
                          className="btn btn-outline w-full mt-2 text-left px-4 py-2 flex justify-start items-center"
                        >
                          <span className="truncate">{subtopic.title}</span>
                        </button>
                      ))
                    ) : (
                      <p className="mt-2 text-center">No subtopics available</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No topics available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
