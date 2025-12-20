import api from './api';
import { courses as mockCourses } from '../data/courses'; // Import mock data for enrichment

// Helper to pick random metadata based on course ID to ensure consistency
const enrichCourse = (course) => {
    // fast "hash" to pick consistent random values
    const hash = course.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Pick random values from mock data arrays to make it look realistic
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
    const majors = ['Software', 'AI', 'Civil', 'Common'];
    const years = [1, 2, 3, 4, 5];

    // Attempt to find a matching mock course by similar ID or title keywords if possible,
    // otherwise purely random.
    // For now, pure deterministic random:

    const mockImage = `https://images.unsplash.com/photo-${1500000000000 + (hash * 10000)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`;

    return {
        ...course,
        title: course.courseName, // Map backend 'courseName' to frontend 'title'
        // Handle nested instructor object properly
        instructor: course.instructor ? `${course.instructor.firstname} ${course.instructor.lastname}` : 'Unknown Instructor',

        // Enriched fields
        image: mockCourses[hash % mockCourses.length]?.image || mockImage,
        level: levels[hash % levels.length],
        major: majors[hash % majors.length],
        year: years[hash % years.length],
        hours: 10 + (hash % 100),
        pdfUrl: '/courses/machine-learning.pdf', // Placeholder
        rating: 4.0 + (hash % 10) / 10,
        reviews: 50 + (hash * 2)
    };
};

const courseService = {
    getAllCourses: async () => {
        try {
            const response = await api.get('/courses');
            const courses = response.data.map(enrichCourse);
            return courses;
        } catch (error) {
            console.error("Failed to fetch courses", error);
            // Fallback to mock data if API is down during dev? 
            // Better to throw so we know integration failed.
            throw error;
        }
    },

    createCourse: async (courseData) => {
        // courseData: { courseName, description }
        const response = await api.post('/courses', courseData);
        return response.data;
    },

    enrollInCourse: async (courseId) => {
        const response = await api.post('/courses/enroll', { courseId });
        return response.data;
    },

    getMyCourses: async () => {
        const response = await api.get('/courses/my-courses');
        return response.data.map(enrichCourse);
    }
};

export default courseService;
