// Type definitions converted to JSDoc comments for better IDE support

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'student' | 'instructor' | 'admin'} role
 * @property {string} [avatar]
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Course
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} thumbnail
 * @property {number} price
 * @property {number} [originalPrice]
 * @property {number} rating
 * @property {number} studentsCount
 * @property {string} duration
 * @property {'Beginner' | 'Intermediate' | 'Advanced'} level
 * @property {string} category
 * @property {Object} instructor
 * @property {string} instructor.id
 * @property {string} instructor.name
 * @property {string} [instructor.avatar]
 * @property {Lesson[]} lessons
 * @property {Date} createdAt
 * @property {boolean} isPublished
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} title
 * @property {string} duration
 * @property {string} videoUrl
 * @property {string} [description]
 * @property {Resource[]} [resources]
 * @property {number} order
 */

/**
 * @typedef {Object} Resource
 * @property {string} id
 * @property {string} title
 * @property {'pdf' | 'video' | 'link' | 'quiz'} type
 * @property {string} url
 * @property {string} [size]
 */

/**
 * @typedef {Object} Enrollment
 * @property {string} id
 * @property {string} userId
 * @property {string} courseId
 * @property {number} progress
 * @property {string[]} completedLessons
 * @property {string} [lastWatched]
 * @property {Date} enrolledAt
 */

/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {string} userId
 * @property {string} courseId
 * @property {number} rating
 * @property {string} comment
 * @property {string} userName
 * @property {string} [userAvatar]
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} icon
 * @property {number} courseCount
 */

export {};