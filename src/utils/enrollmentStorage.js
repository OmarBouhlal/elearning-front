const STORAGE_KEY = 'enrolledCourses';

export const getEnrolledCourses = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const enrollCourse = (courseId) => {
    const current = getEnrolledCourses();
    if (!current.includes(courseId)) {
        const updated = [...current, courseId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
};

export const unenrollCourse = (courseId) => {
    const current = getEnrolledCourses();
    const updated = current.filter(id => id !== courseId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const isEnrolled = (courseId) => {
    const current = getEnrolledCourses();
    return current.includes(courseId);
};
