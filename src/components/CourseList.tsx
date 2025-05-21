import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseProps {
  id: string;
  name: string;
  status: 'continue' | 'start';
}

const Course: React.FC<CourseProps> = ({ id, name, status }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    localStorage.setItem('selectedCourseId', id);
    localStorage.setItem('selectedCourseName', name);
    navigate(`/course/${name.toLowerCase()}/unit/1`);
  };

  const getAssetPath = (courseName: string) => {
    return `/src/assets/${courseName.toLowerCase()}-logo.png`;
  };

  return (
    <div className="flex items-center justify-between mb-6 p-4 rounded-lg hover:bg-[#8b5cf6]/5 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-[#8b5cf6]/20 flex items-center justify-center overflow-hidden">
          <img
            src={getAssetPath(name)}
            alt={name}
            className="w-10 h-10 object-contain"
          />
        </div>
        <span className="text-base font-bold">{name}</span>
      </div>
      <button
        onClick={handleCourseClick}
        className={`w-32 px-6 py-3 rounded-full text-sm font-semibold ${
          status === 'continue'
            ? 'border-2 border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/10'
            : 'bg-gradient-to-r from-[#8b5cf6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] shadow-lg shadow-[#8b5cf6]/20'
        } transition-all duration-300`}
      >
        {status === 'continue' ? 'CONTINUE' : 'START'}
      </button>
    </div>
  );
};

interface CourseType {
  id: string;
  name: string;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const cachedCourses = localStorage.getItem('courseList');

    if (cachedCourses) {
      try {
        const parsed = JSON.parse(cachedCourses);
        if (Array.isArray(parsed)) {
          setCourses(parsed);
          return; // skip API call
        }
      } catch (err) {
        console.error('Invalid cached course list, fetching fresh...');
      }
    }

    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/assessment/fetch_course_list');
        const data = await response.json();
        const modules = data.modules || [];

        setCourses(modules);
        localStorage.setItem('courseList', JSON.stringify(modules));
      } catch (error) {
        console.error('Error fetching course list:', error);
      }
    };

    fetchCourses();
  }, []);

  const getCourseStatus = (courseName: string): 'start' | 'continue' => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return (parsed[`${courseName.toLowerCase()}_button_status`] || 'start').toLowerCase();
      } catch (err) {
        console.error('Invalid userData JSON');
      }
    }
    return 'start';
  };

  return (
    <div>
      {courses.map((course) => (
        <Course
          key={course.id}
          id={course.id}
          name={course.name.toUpperCase()}
          status={getCourseStatus(course.name)}
        />
      ))}
    </div>
  );
};

export default CourseList;
