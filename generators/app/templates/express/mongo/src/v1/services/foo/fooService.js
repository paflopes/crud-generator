// @flow
import HttpStatus from 'http-status-codes';
import * as <%= crudUpper %> from '../../models/<%= crud %>';

/**
 * @swagger
 * definitions:
 *  <%= crudUpper %>:
 *    type: object
 *    required:
 *      - bar
 *    properties:
 *      bar:
 *        type: string
 */

/**
 * @swagger
 * /v<%= version %>/<%= crud %>s/{id}:
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: string
 *   get:
 *     x-swagger-router-controller: <%= crud %>Service
 *     operationId: get<%= crudUpper %>
 *     summary: Get <%= crudUpper %>
 *     tags:
 *       - <%= crudUpper %>s
 *     responses:
 *       '200':
 *         description: ''
 *         schema:
 *           $ref: '#/definitions/<%= crudUpper %>'
 */
export async function get<%= crudUpper %>(req: Object, res: Object) {
  try {
    const <%= crud %> = await <%= crudUpper %>.findOne(req.swagger.params.id.value);
    res.json(<%= crud %>);
  } catch (e) {
    res.status(400).json(e.message);
  }
}

/**
 * @swagger
 * /v<%= version %>/<%= crud %>s:
 *   get:
 *     x-swagger-router-controller: <%= crud %>Service
 *     operationId: list<%= crudUpper %>s
 *     summary: List <%= crudUpper %>s
 *     tags:
 *       - <%= crudUpper %>s
 *     parameters:
 *       - name: skip
 *         in: query
 *         type: number
 *       - name: limit
 *         in: query
 *         type: number
 *     responses:
 *       '200':
 *         description: ''
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/<%= crudUpper %>'
 */
export async function list<%= crudUpper %>s(req: Object, res: Object) {
  try {
    const <%= crud %>s: [] = await <%= crudUpper %>.findAll(
      Number.parseInt(req.swagger.params.skip.value, 10),
      Number.parseInt(req.swagger.params.limit.value, 10)
    );
    res.json(<%= crud %>s);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json(e.message);
  }
}

/**
 * @swagger
 * /v<%= version %>/<%= crud %>s:
 *   post:
 *     x-swagger-router-controller: <%= crud %>Service
 *     operationId: post<%= crudUpper %>
 *     summary: Create <%= crudUpper %>
 *     tags:
 *       - <%= crudUpper %>s
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/<%= crudUpper %>'
 *     responses:
 *       '201':
 *         description: ''
 *         schema:
 *           $ref: '#/definitions/<%= crudUpper %>'
 */
export async function post<%= crudUpper %>(req: Object, res: Object) {
  try {
    const <%= crud %> = await <%= crudUpper %>.create(req.swagger.params.body.value);
    res.status(HttpStatus.CREATED).json(<%= crud %>);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json(e.message);
  }
}

/**
 *  @swagger
 *  /v<%= version %>/<%= crud %>s/{id}:
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *    delete:
 *      x-swagger-router-controller: <%= crud %>Service
 *      operationId: delete<%= crudUpper %>
 *      summary: Delete <%= crudUpper %>
 *      tags:
 *        - <%= crudUpper %>s
 *      responses:
 *        '204':
 *          description: ''
 */
export async function delete<%= crudUpper %>(req: Object, res: Object) {
  try {
    const <%= crud %> = await <%= crudUpper %>.remove(req.swagger.params.id.value);
    res.status(HttpStatus.NO_CONTENT).json(<%= crud %>);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json(e.message);
  }
}

/**
 * @swagger
 * /v<%= version %>/<%= crud %>s/{id}:
 *   put:
 *      x-swagger-router-controller: <%= crud %>Service
 *      operationId: put<%= crudUpper %>
 *      summary: Update <%= crudUpper %>
 *      tags:
 *        - <%= crudUpper %>s
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            $ref: '#/definitions/<%= crudUpper %>'
 *      responses:
 *        '200':
 *          description: ''
 *          schema:
 *            $ref: '#/definitions/<%= crudUpper %>'
 */
export async function put<%= crudUpper %>(req: Object, res: Object) {
  try {
    const <%= crud %> = await <%= crudUpper %>.update(req.swagger.params.id.value, req.swagger.params.body.value);
    res.json(<%= crud %>);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json(e.message);
  }
}
