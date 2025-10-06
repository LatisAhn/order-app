require('dotenv').config();
const db = require('./database');

const createTables = async () => {
  try {
    console.log('🔨 Creating database tables...');

    // Drop existing tables (개발 환경에서만 사용)
    if (process.env.NODE_ENV === 'development') {
      console.log('Dropping existing tables...');
      await db.query('DROP TABLE IF EXISTS order_item_options CASCADE');
      await db.query('DROP TABLE IF EXISTS order_items CASCADE');
      await db.query('DROP TABLE IF EXISTS orders CASCADE');
      await db.query('DROP TABLE IF EXISTS options CASCADE');
      await db.query('DROP TABLE IF EXISTS menus CASCADE');
    }

    // Create Menus table
    await db.query(`
      CREATE TABLE IF NOT EXISTS menus (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price INTEGER NOT NULL,
        image_url VARCHAR(255),
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Menus table created');

    // Create Options table
    await db.query(`
      CREATE TABLE IF NOT EXISTS options (
        id SERIAL PRIMARY KEY,
        menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
        name VARCHAR(50) NOT NULL,
        price INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Options table created');

    // Create Orders table
    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        total_price INTEGER NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Orders table created');

    // Create OrderItems table
    await db.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        menu_id INTEGER REFERENCES menus(id),
        menu_name VARCHAR(100) NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price INTEGER NOT NULL,
        subtotal INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ OrderItems table created');

    // Create OrderItemOptions table
    await db.query(`
      CREATE TABLE IF NOT EXISTS order_item_options (
        id SERIAL PRIMARY KEY,
        order_item_id INTEGER NOT NULL REFERENCES order_items(id) ON DELETE CASCADE,
        option_id INTEGER REFERENCES options(id),
        option_name VARCHAR(50) NOT NULL,
        option_price INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ OrderItemOptions table created');

    // Create indexes for performance
    await db.query('CREATE INDEX IF NOT EXISTS idx_options_menu_id ON options(menu_id)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_orders_order_time ON orders(order_time)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_order_item_options_order_item_id ON order_item_options(order_item_id)');
    console.log('✅ Indexes created');

    // Insert sample data
    console.log('📝 Inserting sample data...');
    
    // Insert menus
    const menuResult = await db.query(`
      INSERT INTO menus (name, description, price, image_url, stock_quantity) VALUES
      ('아메리카노(ICE)', '시원한 아이스 아메리카노', 4000, '', 10),
      ('아메리카노(HOT)', '따뜻한 아메리카노', 4000, '', 10),
      ('카페라떼', '부드러운 우유와 에스프레소', 5000, '', 10),
      ('카푸치노', '부드러운 우유 거품이 일품', 5000, '', 10),
      ('바닐라 라떼', '달콤한 바닐라 향', 5500, '', 10),
      ('카라멜 마끼아또', '카라멜의 달콤함과 에스프레소의 조화', 6000, '', 10)
      RETURNING id
    `);
    console.log('✅ Sample menus inserted');

    // Insert options (샷 추가, 시럽 추가, 휘핑 추가)
    await db.query(`
      INSERT INTO options (menu_id, name, price) VALUES
      (1, '샷 추가', 500),
      (1, '시럽 추가', 0),
      (2, '샷 추가', 500),
      (2, '시럽 추가', 0),
      (3, '샷 추가', 500),
      (3, '시럽 추가', 0),
      (4, '샷 추가', 500),
      (4, '시럽 추가', 0),
      (5, '샷 추가', 500),
      (5, '휘핑 추가', 500),
      (6, '샷 추가', 500),
      (6, '휘핑 추가', 500)
    `);
    console.log('✅ Sample options inserted');

    // Insert sample order
    const orderResult = await db.query(`
      INSERT INTO orders (order_time, total_price, status)
      VALUES (CURRENT_TIMESTAMP, 4000, 'pending')
      RETURNING id
    `);
    const orderId = orderResult.rows[0].id;

    await db.query(`
      INSERT INTO order_items (order_id, menu_id, menu_name, quantity, unit_price, subtotal)
      VALUES ($1, 1, '아메리카노(ICE)', 1, 4000, 4000)
    `, [orderId]);
    console.log('✅ Sample order inserted');

    console.log('🎉 Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

createTables();

