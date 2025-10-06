require('dotenv').config();
const db = require('./database');

const updateMenuImages = async () => {
  try {
    console.log('🖼️  Updating menu images...');

    // 이미지 경로 업데이트
    // public/images 폴더의 이미지는 /images/파일명.jpg 로 접근
    await db.query(`
      UPDATE menus SET image_url = '/images/americano.jpg' 
      WHERE name LIKE '%아메리카노%'
    `);
    console.log('✅ 아메리카노 이미지 업데이트');

    await db.query(`
      UPDATE menus SET image_url = '/images/latte.jpg' 
      WHERE name IN ('카페라떼', '바닐라 라떼')
    `);
    console.log('✅ 라떼 이미지 업데이트');

    await db.query(`
      UPDATE menus SET image_url = '/images/cappuccino.jpg' 
      WHERE name IN ('카푸치노', '카라멜 마끼아또')
    `);
    console.log('✅ 카푸치노/마끼아또 이미지 업데이트');

    // 결과 확인
    const result = await db.query('SELECT name, image_url FROM menus ORDER BY id');
    console.log('\n📋 업데이트된 메뉴 목록:');
    result.rows.forEach(menu => {
      console.log(`  - ${menu.name}: ${menu.image_url}`);
    });

    console.log('\n🎉 이미지 경로 업데이트 완료!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating images:', error);
    process.exit(1);
  }
};

updateMenuImages();

