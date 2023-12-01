const db = require('../../db');
import applicationException from '../service/applicationException';

const Topic = {
  async createOrUpdate(temat, id_promotora, status) {
    const query = `
      INSERT INTO akademia.temat (temat, id_promotora, status)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const values = [temat, id_promotora, status];

    try {
      const { rows } = await db.query(query, values);
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw applicationException.new(applicationException.BAD_REQUEST, 'Error creating or updating Temat');
      }
    } catch (error) {
      throw error;
    }
  },

  async get(id) {
    const query = 'SELECT * FROM akademia.temat WHERE id_tematu = $1;';

    try {
      const { rows } = await db.query(query, [id]);
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw applicationException.new(applicationException.NOT_FOUND, 'Temat not found');
      }
    } catch (error) {
      throw error;
    }
  },

  async remove(id) {
    const query = 'DELETE FROM akademia.temat WHERE id_tematu = $1;';

    try {
      const result = await db.query(query, [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
};

export default Topic;
