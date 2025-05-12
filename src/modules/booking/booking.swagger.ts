/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API for managing bookings
 *
 * components:
 *   schemas:
 *     CreateBookingDto:
 *       type: object
 *       required:
 *         - event
 *       properties:
 *         event:
 *           type: string
 *           description: Event ID
 *           example: 65fa94a3c7e32a1b23f93a8e
 *
 *     UpdateBookingDto:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [booked, cancelled]
 *           example: cancelled
 *
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 65fb1231fae43a2b9b9ab123
 *         user:
 *           type: string
 *           example: 65f11231bcd43a1f9b8ab321
 *         event:
 *           type: string
 *           example: 65fa94a3c7e32a1b23f93a8e
 *         bookingDate:
 *           type: string
 *           format: date-time
 *           example: 2025-05-09T12:30:00Z
 *         status:
 *           type: string
 *           enum: [booked, cancelled]
 *           example: booked
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *   responses:
 *     NotFoundError:
 *       description: Booking not found
 *       content:
 *         application/json:
 *           example:
 *             status: fail
 *             message: Booking not found
 *
 *     UnauthorizedError:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           example:
 *             status: fail
 *             message: Unauthorized access
 *
 * paths:
 *   /api/v1/bookings/my:
 *     post:
 *       summary: Create a new booking for the authenticated user
 *       tags: [Bookings]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateBookingDto'
 *       responses:
 *         201:
 *           description: Booking created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: success
 *                   data:
 *                     $ref: '#/components/schemas/Booking'
 *
 *     get:
 *       summary: Get all bookings for the authenticated user
 *       tags: [Bookings]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of user bookings
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: success
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Booking'
 *
 *   /api/v1/bookings:
 *     get:
 *       summary: Get all bookings (Admin only)
 *       tags: [Bookings]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *             example: 1
 *           description: Page number
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *             example: 10
 *           description: Number of bookings per page
 *       responses:
 *         200:
 *           description: List of bookings
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: success
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Booking'
 *
 *   /api/v1/bookings/{id}:
 *     get:
 *       summary: Get a booking by ID
 *       tags: [Bookings]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Booking ID
 *       responses:
 *         200:
 *           description: Booking details
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: success
 *                   data:
 *                     $ref: '#/components/schemas/Booking'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *
 *     patch:
 *       summary: Update a booking status
 *       tags: [Bookings]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Booking ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateBookingDto'
 *       responses:
 *         200:
 *           description: Booking updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: success
 *                   data:
 *                     $ref: '#/components/schemas/Booking'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *
 *     delete:
 *       summary: Delete a booking by ID (Admin only)
 *       tags: [Bookings]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Booking ID
 *       responses:
 *         204:
 *           description: Booking deleted successfully
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 */
