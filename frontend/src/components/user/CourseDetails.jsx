import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import "daisyui/dist/full.css";
import { baseUrl } from "../../config/baseUrl";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newTopicName, setNewTopicName] = useState("");

  // Modal state for subtopics
  const [showModal, setShowModal] = useState(false);
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [newSubtopicName, setNewSubtopicName] = useState("");
  const [newSubtopicFile, setNewSubtopicFile] = useState(null);
  const [isAddingSubtopic, setIsAddingSubtopic] = useState(false);

  useEffect(() => {
    const fetchCourseAndTopics = async () => {
      try {
        const response = await axios.get(`${baseUrl}/topic/view/${id}`);
        const { topics, course } = response.data;
        setCourse(course);
        setTopics(topics || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch course and topics details");
        setLoading(false);
      }
    };

    fetchCourseAndTopics();
  }, [id]);

  const handleAddTopic = async () => {
    if (!course) {
      toast.error("Course details are missing");
      return;
    }

    if (newTopicName.trim() === "") {
      toast.error("Topic name cannot be empty");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/topic/add`, {
        title: newTopicName,
        course: course._id,
      });

      const newTopic = {
        _id: response.data.topic._id,
        title: newTopicName,
        subTopics: [],
      };
      setTopics([...topics, newTopic]);
      setNewTopicName("");
      toast.success("New topic added!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add new topic");
    }
  };

  const handleOpenModal = (topicId) => {
    setCurrentTopicId(topicId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewSubtopicName("");
    setNewSubtopicFile(null);
  };

  const handleAddSubtopic = async () => {
    if (newSubtopicName.trim() === "" || !newSubtopicFile) {
      toast.error("Subtopic name and video file are required");
      return;
    }

    setIsAddingSubtopic(true);

    const formData = new FormData();
    formData.append("title", newSubtopicName);
    formData.append("topicId", currentTopicId);
    formData.append("video", newSubtopicFile);

    try {
      const response = await axios.post(
        `${baseUrl}/topic/subtopic/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const subtopicData = {
        _id: response.data.subtopic._id,
        title: response.data.subtopic.title,
        videoUrl: response.data.subtopic.videoUrl,
      };

      setTopics(
        topics.map((topic) =>
          topic._id === currentTopicId
            ? {
              ...topic,
              subTopics: [...(topic.subTopics || []), subtopicData],
            }
            : topic
        )
      );
      toast.success("Subtopic added successfully!");
      handleCloseModal();
    } catch (err) {
      console.log(err);
      toast.error("Failed to add subtopic");
    } finally {
      setIsAddingSubtopic(false);
    }
  };

  const handleFileChange = (event) => {
    setNewSubtopicFile(event.target.files[0]);
  };

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

  return (
    <div className="bg-slate-200 min-h-screen">
    <div className="container  mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Course Details */}
        <div className="space-y-4">
          {course ? (
            <>
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-lg">{course.description}</p>
            </>
          ) : (
            <p>Course details not available</p>
          )}
        </div>

        {/* Right side: Add Topics and Topic List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={newTopicName}
              onChange={(e) => setNewTopicName(e.target.value)}
              placeholder="Enter topic name"
              className="input input-bordered w-full"
            />
            <button
              onClick={handleAddTopic}
              className="btn bg-blue-600 text-white rounded border-none hover:bg-blue-500 w-full sm:w-auto"
            >
              <FaPlus className="mr-2" /> Add Topic
            </button>
          </div>

          {/* Topics List */}
          <div className="space-y-2">
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
                    <button
                      onClick={() => handleOpenModal(topic._id)}
                      className="btn bg-green-600 text-white rounded border-none hover:bg-green-500 w-full mt-2"
                    >
                      <FaPlus className="mr-2" /> Add Subtopic
                    </button>
                    {topic.subTopics && topic.subTopics.length > 0 ? (
                      topic.subTopics.map((subtopic) => (
                        <button 
                          key={subtopic._id}
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

      {/* Modal for Adding Subtopic */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add New Subtopic</h2>
            <input
              type="text"
              value={newSubtopicName}
              onChange={(e) => setNewSubtopicName(e.target.value)}
              placeholder="Enter subtopic name"
              className="input input-bordered w-full mb-4"
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="btn btn-error text-white mr-2"
                disabled={isAddingSubtopic}
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubtopic}
                className={`btn btn-success text-white ${isAddingSubtopic ? 'loading' : ''}`}
                disabled={isAddingSubtopic}
              >
                {isAddingSubtopic ? 'Adding...' : 'Add Subtopic'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}