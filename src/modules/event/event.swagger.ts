/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEventDto:
 *       type: object
 *       required:
 *         - name
 *         - date
 *         - venue
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the event
 *           example: Tech Conference 2025
 *         description:
 *           type: string
 *           description: Details about the event
 *           example: A large-scale conference on AI, Web3, and more
 *         category:
 *           type: string
 *           description: Event category
 *           example: Technology
 *         date:
 *           type: string
 *           format: date-time
 *           description: Event date and time
 *           example: 2025-06-20T14:00:00Z
 *         venue:
 *           type: string
 *           description: Location of the event
 *           example: Silicon Valley Conference Center
 *         price:
 *           type: number
 *           description: Ticket price
 *           example: 49.99
 *         imageUrl:
 *           type: string
 *           description: Event banner image URL
 *           example: https://example.com/event.jpg
 *         createdBy:
 *           type: string
 *           description: ID of the user who created the event
 *           example: 507f1f77bcf86cd799439011
 *         tags:
 *           type: array
 *           description: List of tags associated with the event
 *           items:
 *             type: string
 *           example: ["ai", "web3", "networking"]

 *     UpdateEventDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         venue:
 *           type: string
 *         price:
 *           type: number
 *         imageUrl:
 *           type: string
 *         createdBy:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string

 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         venue:
 *           type: string
 *         price:
 *           type: number
 *         imageUrl:
 *           type: string
 *         createdBy:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time

 *   responses:
 *     NotFoundError:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           example:
 *             status: fail
 *             message: Event not found
 *     UnauthorizedError:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           example:
 *             status: fail
 *             message: Unauthorized access

 * paths:
 *   /api/v1/events:
 *     post:
 *       summary: Create a new event
 *       tags: [Events]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateEventDto'
 *       responses:
 *         201:
 *           description: Event created successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: success
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *
 *     get:
 *       summary: Get all events
 *       tags: [Events]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *             example: 1
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *             example: 10
 *       responses:
 *         200:
 *           description: List of events
 *           content:
 *             application/json:
 *               example:
 *                 status: success
 *                 data:
 *                   - $ref: '#/components/schemas/Event'

 *   /api/v1/events/{id}:
 *     get:
 *       summary: Get an event by ID
 *       tags: [Events]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: Event ID
 *       responses:
 *         200:
 *           description: Event details
 *           content:
 *             application/json:
 *               example:
 *                 status: success
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'

 *     patch:
 *       summary: Update an event by ID
 *       tags: [Events]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateEventDto'
 *       responses:
 *         200:
 *           description: Event updated successfully
 *           content:
 *             application/json:
 *               example:
 *                 status: success
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'

 *     delete:
 *       summary: Delete an event by ID
 *       tags: [Events]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         204:
 *           description: Event deleted successfully
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 */
