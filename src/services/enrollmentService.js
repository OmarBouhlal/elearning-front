import api from './api';

// Re-use enrichment logic or import if shared. 
// For simplicity, defining a basic enrichment for enrollments here or re-use courseService's.
// Since courseService already has logic and we need to return "Courses", lets import it.
// However, circular deps might be an issue if we are not careful.
// Let's duplicate the light enrichment or just move enrichment to a shared util.
// For now, simple duplication to avoid refactoring overhead.

const enrichCourse = (course) => {
    // If course is null/undefined (e.g. backend issue), handle gracefully
    if (!course) return {};

    const hash = (course.id || '0').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
    const majors = ['Software', 'AI', 'Civil', 'Common'];
    const years = [1, 2, 3, 4, 5];
    const mockImage = `https://images.unsplash.com/photo-${1500000000000 + (hash * 10000)}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`;

    return {
        ...course,
        title: course.courseName,
        instructor: course.instructor ? `${course.instructor.firstname} ${course.instructor.lastname}` : 'Unknown Instructor',
        image: mockImage, // specific mock data mapping omitted for brevity
        level: levels[hash % levels.length],
        major: majors[hash % majors.length],
        year: years[hash % years.length],
        hours: 10 + (hash % 100),
    };
};

const enrollmentService = {
    getMyEnrollments: async () => {
        const response = await api.get('/courses/my-enrollments');
        // The endpoint returns EnrollmentResponseDTO which has a 'course' field
        return response.data.map(enrollment => ({
            ...enrollment,
            course: enrichCourse(enrollment.course)
        }));
    }
};

export default enrollmentService;
