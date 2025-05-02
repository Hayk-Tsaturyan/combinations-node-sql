const db = require('../db');
const { createItems, createCombinations } = require("../services/combinationService");

class CombinationController {
 async createCombinations(req, res){
  const { items: inputArray, length } = req.body;

  if (!Array.isArray(inputArray) || typeof length !== 'number') {
    return res.status(400).json({ error: 'Invalid input format' });
  }
    const createdItems = createItems(inputArray);
    const combinations = createCombinations(createdItems, length);
  
    const conn = await db.getConnection();
    
    try {
      await conn.beginTransaction();
  
      const [existingRows] = await conn.query('SELECT name FROM items');
      const existingNames = new Set(existingRows.map(row => row.name));
  
      for (const item of createdItems) {
        if (!existingNames.has(item)) {
          await conn.query('INSERT INTO items (name) VALUES (?)', [item]);
        }
      }
  
      const combinationIds = [];
  
      for (const combo of combinations) {
        const [result] = await conn.query(
          'INSERT INTO combinations (items) VALUES (?)',
          [JSON.stringify(combo)]
        );
        combinationIds.push(result.insertId);
      }
  
  
      const [responseResult] = await conn.query(
        'INSERT INTO responses (combination_ids) VALUES (?)',
        [JSON.stringify(combinationIds)]
      );
  
      await conn.commit();
  
      res.status(201).json({
        id: responseResult.insertId,
        combination: combinations
      });
    } catch (err) {
      await conn.rollback();
      console.error('❌ Transaction failed:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      conn.release();
    }
  }
}

exports.combinationController = new CombinationController()