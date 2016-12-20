// @flow
import HttpStatus from 'http-status-codes';
import * as Foo from '../../models/foo';

/**
 * @swagger
 * definitions:
 *  Foo:
 *    type: object
 *    required:
 *      - bar
 *    properties:
 *      bar:
 *        type: string
 */

/**
 * @swagger
 * /v1/foos/{id}:
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       type: string
 *   get:
 *     x-swagger-router-controller: fooService
 *     operationId: getFoo
 *     summary: Get Foo
 *     tags:
 *       - Foos
 *     responses:
 *       '200':
 *         description: ''
 *         schema:
 *           $ref: '#/definitions/Foo'
 */
export async function getFoo(req: Object, res: Object) {
  try {
    const foo = await Foo.findOne(req.swagger.params.id.value);
    res.json(foo);
  } catch (e) {
    res.status(400).json(e.message);
  }
}

/**
 * @swagger
 * /v1/foos:
 *   get:
 *     x-swagger-router-controller: fooService
 *     operationId: listFoos
 *     summary: List Foos
 *     tags:
 *       - Foos
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
 *             $ref: '#/definitions/Foo'
 */
export async function listFoos(req: Object, res: Object) {
  try {
    const foos: [] = await Foo.findAll(
      Number.parseInt(req.swagger.params.skip.value, 10),
      Number.parseInt(req.swagger.params.limit.value, 10)
    );
    res.json(foos);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json(e.message);
  }
}

/**
 * @swagger
 * /v1/foos:
 *   post:
 *     x-swagger-router-controller: fooService
 *     operationId: postFoo
 *     summary: Create Foo
 *     tags:
 *       - Foos
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Foo'
 *     responses:
 *       '201':
 *         description: ''
 *         schema:
 *           $ref: '#/definitions/Foo'
 */
export async function postFoo(req: Object, res: Object) {
  try {
    const foo = await Foo.create(req.swagger.params.body.value);
    res.status(HttpStatus.CREATED).json(foo);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json(e.message);
  }
}

/**
 *  @swagger
 *  /v1/foos/{id}:
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: string
 *    delete:
 *      x-swagger-router-controller: fooService
 *      operationId: deleteFoo
 *      summary: Delete Foo
 *      tags:
 *        - Foos
 *      responses:
 *        '204':
 *          description: ''
 */
export async function deleteFoo(req: Object, res: Object) {
  try {
    const foo = await Foo.remove(req.swagger.params.id.value);
    res.status(HttpStatus.NO_CONTENT).json(foo);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json(e.message);
  }
}

/**
 * @swagger
 * /v1/foos/{id}:
 *   put:
 *      x-swagger-router-controller: fooService
 *      operationId: putFoo
 *      summary: Update Foo
 *      tags:
 *        - Foos
 *      parameters:
 *        - name: body
 *          in: body
 *          schema:
 *            $ref: '#/definitions/Foo'
 *      responses:
 *        '200':
 *          description: ''
 *          schema:
 *            $ref: '#/definitions/Foo'
 */
export async function putFoo(req: Object, res: Object) {
  try {
    const foo = await Foo.update(req.swagger.params.id.value, req.swagger.params.body.value);
    res.json(foo);
  } catch (e) {
    res.status(HttpStatus.BAD_REQUEST).json(e.message);
  }
}
