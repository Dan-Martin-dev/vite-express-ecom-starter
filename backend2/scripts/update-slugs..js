// update-slugs.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const slugify = (name) => 
  name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

async function updateSlugs() {
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    await prisma.product.update({
      where: { id: product.id },
      data: { slug: slugify(product.name) }
    });
  }
  
  console.log('All products updated with slugs');
}

updateSlugs()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());