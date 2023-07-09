// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: null,
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seed'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done)
    }
  }
}




module.exports = {

  development: {
    ...sharedConfig,
    connection: { filename: './data/data.db3' }
  },
  testing: {
    ...sharedConfig,
    connection: { filename: './data/testing.db3' }
  }

};